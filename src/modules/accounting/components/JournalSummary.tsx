import Card from "../../../components/ui/Card";
import { useJournal } from "../hooks/useJournal";

export default function JournalSummary() {
  const { entries } = useJournal();
  const postedEntries = entries.filter((entry) => entry.status === "Posted").length;

  return (
    <Card>
      <h2 className="text-lg font-semibold">Journal Summary</h2>
      <p>Entries: {entries.length}</p>
      <p>Posted: {postedEntries}</p>
    </Card>
  );
}
