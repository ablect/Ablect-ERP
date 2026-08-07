import Select from "../../../components/ui/Select";

export default function ProductFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <Select>
        <option>All Categories</option>
      </Select>

      <Select>
        <option>All Brands</option>
      </Select>

      <Select>
        <option>All Stock Status</option>
      </Select>

    </div>
  );
}