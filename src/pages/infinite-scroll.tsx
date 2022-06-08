import type { NextPage } from 'next';
import React, { useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import ProductList, { Container as ProductListContainer} from '../components/ProductList';
import { getProductList } from '../services';
import useIntersection from '../hooks/useIntersection';
import { GetNextPageParamFunction } from 'react-query';
import useScrollSave from '../hooks/useScrollSave';
import { getStorage, removeStorage, setStorage } from '../utilities/storage';
import { AxiosError } from 'axios';

const InfiniteScrollPage: GetNextPageParamFunction = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const pageRef = useRef<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState(false);

  const { initScroll } = useScrollSave();
  
  useEffect(() => {
    init();
  }, [])

  const init = async () => {    
    const savedPage: number = getStorage('productsPage', false) || 0;
    await fetchProductList(savedPage ? savedPage * 16 : 16, true)
    if (savedPage) {
      pageRef.current = +savedPage;
      await initScroll()
      removeStorage('productsPage', false)
    }
    setShowLoader(true);
  }

  const fetchProductList = async (size = 16, isInit = false) => {
    try {
      if (!isInit && loaded) return;
      pageRef.current++
      const { products, totalCount } = await getProductList({ page: pageRef.current, size }, true)
      setProductList(prev => isInit ? products : [...prev, ...products]);
      if (productList.length >= totalCount) setLoaded(true);
    }
    catch(e) {
      const err = e as AxiosError;
      if (err.code === 'ERR_BAD_REQUEST') return setLoaded(true);
      throw err;
    }
  }

  const { setTarget } = useIntersection({ onIntersect: fetchProductList })

  const beforeRouteItem = () => {
    setStorage('productsPage', pageRef.current, false);
  }

  return (
    <>
      <Container>
        <ProductList products={productList} beforeRouteItem={beforeRouteItem} />
        {(showLoader && !loaded) && <FetchLoader ref={setTarget} />}
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const FetchLoader = styled.div`
  width: 100%;
`
