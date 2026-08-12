import { createJournalEntry } from "../../accounting/utils/createJournalEntry";
import { journalService } from "../../accounting/services/JournalService";

export async function postBankTransaction(description: string, amount: number, reference: string) {
  void amount;
  await journalService.create(
    createJournalEntry(reference, "Bank", description),
  );
}
