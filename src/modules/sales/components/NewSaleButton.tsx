import Button from "../../../components/ui/Button";

type Props = {
  onClick: () => void;
};

export default function NewSaleButton({
  onClick,
}: Props) {
  return (
    <Button
      type="button"
      onClick={onClick}
    >
      New Sale
    </Button>
  );
}