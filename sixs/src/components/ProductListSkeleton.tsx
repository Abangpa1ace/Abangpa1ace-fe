import React from "react";
import type { NextPage } from "next";
import styled from "@emotion/styled";

type Props = {
  size?: number;
};

const ProductListSkeleton: NextPage<Props> = ({ size = 10 }) => {
  return (
    <ScProductListSkeleton>
      {new Array(size).fill(null).map((_, i) => (
        <ItemSkeleton key={"skeleton-" + i}>
          <div className="img" />
          <div className="name" />
          <div className="price" />
        </ItemSkeleton>
      ))}
    </ScProductListSkeleton>
  );
};

const ScProductListSkeleton = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;

const ItemSkeleton = styled.div`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  cursor: not-allowed;

  > div {
    background-color: #f3f3f3;

    &.img {
      height: 180px;
    }
    &.name {
      margin-top: 8px;
      height: 19px;
    }
    &.price {
      margin-top: 4px;
      height: 19px;
    }
  }
`;

export default ProductListSkeleton;
