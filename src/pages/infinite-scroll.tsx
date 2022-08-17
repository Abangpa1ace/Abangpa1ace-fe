import type { NextPage } from "next";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ProductList, {
  Container as ProductListContainer,
} from "../components/ProductList";
import useIntersection from "../hooks/useIntersection";
import { GetNextPageParamFunction } from "react-query";
import useScrollSave from "../hooks/useScrollSave";
import { getStorage, removeStorage, setStorage } from "../utilities/storage";
import useFetchInfiniteProductList from "../hooks/queries/useFetchInfiniteProductList";

const InfiniteScrollPage: GetNextPageParamFunction = () => {
  // const [productList, setProductList] = useState<ProductType[]>([]);
  // const pageRef = useRef<number>(0);
  // const [showLoader, setShowLoader] = useState(false);

  const { initScroll } = useScrollSave();
  const { data, hasNextPage, fetchNextPage } = useFetchInfiniteProductList()

  // useEffect(() => {
  //   init();
  // }, []);

  // useEffect(() => {
  //   console.log('data', data)
  // }, [data])

  // const init = async () => {
  //   const savedPage: number = getStorage("productsPage", false) || 0;
  //   await fetchProductList(savedPage ? savedPage * 16 : 16, true);
  //   if (savedPage) {
  //     pageRef.current = +savedPage;
  //     await initScroll();
  //     removeStorage("productsPage", false);
  //   }
  //   setShowLoader(true);
  // };

  // const fetchProductList = async (size = 16, isInit = false) => {
  //   try {
  //     if (!isInit) return;
  //     pageRef.current++;
  //     const { products, totalCount } = await getProductList(
  //       { page: pageRef.current, size },
  //       true
  //     );
  //     setProductList((prev) => (isInit ? products : [...prev, ...products]));
  //   } catch (e) {
  //     const err = e as AxiosError;
  //     throw err;
  //   }
  // };

  const { setTarget } = useIntersection({ onIntersect: fetchNextPage });

  const beforeRouteItem = () => {
    setStorage("productsPage", data?.pages.pop()?.nextCursor, false);
  };

  return (
    <>
      <Container>
        <ProductList products={(data?.pages.map(page => page.products).flat() || [])} beforeRouteItem={beforeRouteItem} />
        {/* {showLoader && hasNextPage && <FetchLoader ref={setTarget} />} */}
        {hasNextPage && <FetchLoader ref={setTarget} />}
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
`;
