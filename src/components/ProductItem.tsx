import Image from "next/image";
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Product } from '../types/product';

type ProductItemProps = {
  product: Product;
  beforeRoute?: () => void;
};

const ProductItem = ({ product: { id, name, thumbnail, price }, beforeRoute }: ProductItemProps) => {
  const { push } = useRouter();
  const routeDetail = () => {
    if (beforeRoute) beforeRoute();
    push(`/products/${id}`)
  }

  return (
    <Container onClick={routeDetail}>
      <Thumbnail>
        <Image src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} width={180} height={180} placeholder="blur" />
      </Thumbnail>
      <Name>{name}</Name>
      <Price>{price.toLocaleString()}</Price>
    </Container>
  )
}


export default ProductItem;

const Container = styled.div`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
    transition: background .3s ease;

    img {
      transform: scale(1.05);
      transition: transform .3s ease;
    }
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
