import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import { getProductList } from "../services";
import useFetchPaginatedProductList from "../hooks/queries/useFetchPaginatedProductList";

type Props = {
  productList: ProductListResType;
};

const PaginationPage: NextPage<Props> = (props) => {
  const total = useRef<number>(105);
  const {
    pageInfo: { page },
  } = usePagination();

  const { data } = useFetchPaginatedProductList({
    page,
    initialData: props.productList,
  });

  return (
    <>
      <Container>
        <ProductList products={data?.products || []} />
        <Pagination totalCount={data?.totalCount || 0} />
      </Container>
    </>
  );
};

export default PaginationPage;

// export async function getServerSideProps() {
//   const productList = await getProductList({ page: 1 });
//   return { props: { productList } };
// }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
  padding: 0 20px 40px;
`;
