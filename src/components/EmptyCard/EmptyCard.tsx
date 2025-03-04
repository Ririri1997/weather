import { CardBody } from "../Card/Card.styles";
import { ImageStyled } from "../Image/Image.styles";
import Text from "../Text/Text.styles";



export default function EmptyCard() {

 return (
   <CardBody $hasData={false}>
    <ImageStyled src="./cloud-sun.svg" alt="Cloud" />
    <Text size="small" color="secondary" $textAlign="center">
     Напиши название города,
     <br />
     чтобы увидеть погоду
    </Text>
   </CardBody>
 );
}
