import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import usePagination from '../hooks/usePagination';
import { getProductList } from '../services';
// import axios from 'axios';



const PaginationPage: NextPage = () => {
  const total = useRef<number>(0);
  const updateTotal = (totalCount: number) => total.current = totalCount;

  return (
    <>
      <Container>
        <ProductList total={total.current} updateTotal={updateTotal} />
        <Pagination total={total.current} />
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
