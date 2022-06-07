import Image from "next/image";
import type { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from "next/router";
import { getProductDetail } from "../../services";

type Props = {
  product: ProductType;
}

const ProductDetailPage: NextPage<Props> = ({ product }) => {
  const { query } = useRouter();
  const [productInfo, setProductInfo] = useState<ProductType | null>(null);

  useEffect(() => {
    (async () => {
      const { product } = await getProductDetail(query.id as string);
      setProductInfo(product);
      console.log(productInfo)
    })();
  }, [])

  return (
    <section>
      <Thumbnail>
        <Image src={productInfo?.thumbnail ? productInfo?.thumbnail : '/defaultThumbnail.jpg'} width={420} height={420} />
      </Thumbnail>
      <ProductInfoWrapper>
        <Name>{productInfo?.name}</Name>
        <Price>{productInfo?.price.toLocaleString()}원</Price>
      </ProductInfoWrapper>
    </section>
  );
};

export default ProductDetailPage;

export async function getServerSideProps(context: NextPageContext) {
  // SSR을 적용해야하나, msw 관련인지 페이지 빌드 실패
  // const res = await axios.get(`/products/${context.params}`)
  // const data = res.data
  
  return { props: { products: {} } }
}

const Thumbnail = styled.div`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
