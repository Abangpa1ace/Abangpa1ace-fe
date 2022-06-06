import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Product } from '../types/product';
import ProductItem from './ProductItem';
import usePagination from '../hooks/usePagination';
import { getProductList } from '../services';

type Props = {
  products?: ProductType[];
  total: number;
  updateTotal: (total: number) => void;
}

const ProductList: NextPage<Props> = ({ products, total, updateTotal }) => {
  const { pageInfo: { page } } = usePagination();
  const [productList, setProductList] = useState<ProductType[]>(products || []);

  useEffect(() => {
    fetchProductList()
  }, [page])

  const fetchProductList = async () => {
    const { products, totalCount } = await getProductList({ page })
    setProductList(products)
    if (!total || total !== totalCount) updateTotal(totalCount);
  }

  return (
    <Container>
      {productList.map(product => <ProductItem key={product.id} product={product} />)}
    </Container>
  );
}

export default ProductList;

export async function getServerSideProps() {
  // SSR을 적용해야하나, msw 관련인지 페이지 빌드 실패
  // const res = await axios.get('http://localhost:3000/products?page=1&size=10')
  const res = { data: { products: [], totalCount: 105 } }
  const data = res.data
  
  return { props: { ...data } }
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
