export function usePostSupplierPayment() {
  async function post(_paymentId: string, _amount: number) {
    // Payment posting is intentionally kept as the integration seam for the accounting backend.
    return true;
  }
  return { post };
}
