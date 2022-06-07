import type { NextPage } from 'next';
import React, { useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import { getProductList } from '../services';
import useIntersection from '../hooks/useIntersection';
import { GetNextPageParamFunction } from 'react-query';
import ProductListSkeleton from '../components/ProductListSkeleton';
import useScrollSave from '../hooks/useScrollSave';
import { getStorage, setStorage } from '../utilities/storage';
import { useRecoilState } from 'recoil';
import { productListAtom } from '../recoil';
import { AxiosError } from 'axios';

const InfiniteScrollPage: GetNextPageParamFunction = () => {
  const page = useRef<number>(1);
  const [productList, setProductList] = useRecoilState(productListAtom);
  const [loaded, setLoaded] = useState<boolean>(false);

  useScrollSave();
  
  useEffect(() => {
    if (!productList.length) fetchProductList();
  }, [])

  const fetchProductList = async () => {
    try {
      if (loaded) return;
      const { products, totalCount } = await getProductList({ page: page.current, size: 16 }, false)
      if (productList.length >= totalCount) {
        setLoaded(true);
        return;
      }
      await page.current++;
      setProductList(prev => page.current === 1 || !prev.length ? products : [...prev, ...products]);
      if (productList.length >= totalCount) setLoaded(true);
    }
    catch(e) {
      const err = e as AxiosError;
      if (err.code === 'ERR_BAD_REQUEST') {
        setLoaded(true);
        return;
      }
      throw err;
    }
  }

  const { setTarget } = useIntersection({ onIntersect: fetchProductList })

  return (
    <>
      <Container>
        <ProductList products={productList} />
        {!loaded && <FetchLoader ref={setTarget} />}
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 20px;
`;

const FetchLoader = styled.div`
  width: 100%;
  margin-bottom: 20px;
`
