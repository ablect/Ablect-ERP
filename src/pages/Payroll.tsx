import { Link } from "react-router-dom";

export default function PayrollPage() {
  return (
    <div
      style={{
        padding: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Payroll
          </h1>

          <p
            style={{
              marginTop: 8,
              color: "#64748b",
            }}
          >
            Manage employee salaries, payroll processing and payslips.
          </p>
        </div>

        <Link
          to="/hr"
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            background: "#0f172a",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          HR
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        <div
          style={{
            padding: 24,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
          }}
        >
          <h2>Payroll</h2>
          <p style={{ color: "#64748b" }}>
            Employee salary processing.
          </p>
        </div>

        <div
          style={{
            padding: 24,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
          }}
        >
          <h2>Payslips</h2>
          <p style={{ color: "#64748b" }}>
            Generate and manage employee payslips.
          </p>
        </div>

        <div
          style={{
            padding: 24,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
          }}
        >
          <h2>Payroll History</h2>
          <p style={{ color: "#64748b" }}>
            Review previous payroll transactions.
          </p>
        </div>
      </div>
    </div>
  );
}