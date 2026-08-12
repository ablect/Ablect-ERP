export function createPayrollRepository(pool) {
  return {
    async calculateRun({ periodStart, periodEnd, userId }) {
      if (!periodStart || !periodEnd) throw new Error("Payroll period start and end are required.");
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        const [employees] = await connection.query(`SELECT id,base_salary,commission_rate FROM employees WHERE is_active=TRUE ORDER BY full_name ASC`);
        const [runResult] = await connection.query(`INSERT INTO payroll_runs (period_start,period_end,status) VALUES (?,?,'CALCULATED')`,[periodStart,periodEnd]);
        let totalGross=0; let totalCommission=0;
        for(const employee of employees){
          const [[sales]] = await connection.query(`SELECT COALESCE(SUM(o.value),0) won_value FROM opportunities o WHERE o.assigned_to=(SELECT user_id FROM employees WHERE id=?) AND o.stage='CLOSED_WON' AND DATE(o.updated_at) BETWEEN ? AND ?`,[employee.id,periodStart,periodEnd]);
          const base=Number(employee.base_salary||0); const commission=Number(sales.won_value||0)*(Number(employee.commission_rate||0)/100); const net=base+commission;
          totalGross+=base; totalCommission+=commission;
          await connection.query(`INSERT INTO payroll_items (payroll_run_id,employee_id,base_salary,commission,deductions,net_pay) VALUES (?,?,?,?,0,?) ON DUPLICATE KEY UPDATE base_salary=VALUES(base_salary),commission=VALUES(commission),net_pay=VALUES(net_pay)`,[runResult.insertId,employee.id,base,commission,net]);
        }
        await connection.query(`UPDATE payroll_runs SET total_gross=?,total_commission=? WHERE id=?`,[totalGross,totalCommission,runResult.insertId]);
        await connection.query(`INSERT INTO audit_logs (user_id,action,entity_type,entity_id,details) VALUES (?,'CALCULATE','PAYROLL_RUN',?,JSON_OBJECT('periodStart',?,'periodEnd',?,'commission',?))`,[userId||null,String(runResult.insertId),periodStart,periodEnd,totalCommission]);
        await connection.commit();
        return {id:String(runResult.insertId),periodStart,periodEnd,totalGross,totalCommission,status:"CALCULATED"};
      } catch(error){ await connection.rollback(); throw error; } finally { connection.release(); }
    },
  };
}
