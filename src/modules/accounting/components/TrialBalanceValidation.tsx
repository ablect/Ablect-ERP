import { useTrialBalanceValidation } from "../hooks/useTrialbalanceValidation";

export default function TrialBalanceValidation() {
  const { balanced, difference } = useTrialBalanceValidation();
  return (
    <div>
      <p>{balanced ? "Trial Balance Balanced" : "Trial Balance Out of Balance"}</p>
      <p>Difference: ₦{difference.toLocaleString()}</p>
    </div>
  );
}
