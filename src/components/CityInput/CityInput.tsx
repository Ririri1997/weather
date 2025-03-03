import { ChangeEvent } from "react";
import Input from "./Input.styles";
import Button from "../Button/Button.styles";
import { CardHeader } from "../Card/Card.styles";

interface CityInputProps {
  city: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: (e: React.FormEvent) => void;
}

export default function CityInput({
  city,
  onChange,
  onSubmit,
  onReset,
}: CityInputProps) {
  return (
      <CardHeader onSubmit={onSubmit} onReset={onReset}>
        <Input
          value={city}
          placeholder="Город"
          onChange={onChange}
          type="text"
        />
        <Button type="reset">
          <img src="./trash-icon.svg" alt="button delete" />
        </Button>
      </CardHeader>
  );
}
