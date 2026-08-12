import ModernSalesPOS from "../components/ModernSalesPOS";

/**
 * The sales route is the high-frequency POS workspace.
 * Keep the route thin so the POS engine owns its state, checkout flow,
 * inventory interaction, and responsive layout in one place.
 */
export default function SalesPage() {
  return <ModernSalesPOS />;
}
