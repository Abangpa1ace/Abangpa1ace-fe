import React from 'react';
import styled from 'styled-components';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => (
  <Container>
    {products?.map((product, idx) => (
      <ProductItem key={`${product.id}-${product.name}-${idx}`} product={product} />
    ))}
  </Container>
);

function compareProps(prev: ProductListProps, next: ProductListProps) {
  return prev.products.length === next.products.length
}

export default React.memo(ProductList, compareProps)

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  min-height: 100vh;
  margin-left: -20px;
`;
