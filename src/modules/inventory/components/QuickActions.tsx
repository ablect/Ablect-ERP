import Button from "../../../components/ui/Button";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-4">

      <Button>
        Import Excel
      </Button>

      <Button>
        Export Excel
      </Button>

      <Button>
        Print Barcode
      </Button>

      <Button>
        Generate QR Code
      </Button>

      <Button>
        Add Product
      </Button>

    </div>
  );
}