import Input from "./Input";

type Props = {

  value: string;

  onChange: (value: string) => void;

  placeholder?: string;

};

export default function SearchInput({

  value,

  onChange,

  placeholder = "Search...",

}: Props) {

  return (

    <Input

      placeholder={placeholder}

      value={value}

      onChange={(e) => onChange(e.target.value)}

    />

  );

}