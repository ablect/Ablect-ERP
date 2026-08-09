import { journalEntryService } from "../services/JournalEntryService";
import { useJournalEntryStore } from "../store/JournalEntryStore";
import type { JournalEntry } from "../types/JournalEntry";

export function usePostJournalEntry() {
  async function post(id: string) {
    const entries = await journalEntryService.getAll();
    const updated: JournalEntry[] = entries.map((entry) =>
      entry.id === id ? { ...entry, status: "Posted" as const } : entry,
    );
    useJournalEntryStore.getState().setEntries(updated);
  }
  return { post };
}
