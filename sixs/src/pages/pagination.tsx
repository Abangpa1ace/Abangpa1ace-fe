import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import products from "../api/data/products.json";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import { getProductList } from "../services";
// import axios from 'axios';

type Props = {
  products: ProductType[];
  totalCount: number;
};

const PaginationPage: NextPage<Props> = ({ products, totalCount }) => {
  const total = useRef<number>(totalCount);
  const {
    pageInfo: { page },
  } = usePagination();
  const [productList, setProductList] = useState<ProductType[]>(products);

  useEffect(() => {
    fetchProductList();
  }, [page]);

  const fetchProductList = async () => {
    const { products, totalCount } = await getProductList({ page });
    setProductList(products);
    if (!productList.length || total.current !== totalCount)
      total.current = totalCount;
  };

  return (
    <>
      <Container>
        <ProductList products={productList} />
        <Pagination totalCount={total.current} />
      </Container>
    </>
  );
};

export default PaginationPage;

export async function getServerSideProps() {
  // SSR을 적용해야하나, msw 관련인지 페이지 빌드 실패
  // const res = await axios.get('http://localhost:3000/products?page=1&size=10')
  const res = { data: { products: [], totalCount: 105 } };
  const data = res.data;

  return { props: { ...data } };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
  padding: 0 20px 40px;
`;
