import { Text } from "../Text/Text.styles";
import { ImageStyled } from "../Image/Image.styles";
import { CardBody } from "../Card/Card.styles";


interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <CardBody $hasData={false}>
      <ImageStyled src="./city.svg" alt="not found" />
      <Text size="small" color="secondary" $textAlign="center">
        {message}
      </Text>
    </CardBody>
  );
}