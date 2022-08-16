import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import styled from "@emotion/styled";

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Container>
        <p>존재하지 않는 페이지입니다.</p>
        <Link href="/">홈으로</Link>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    margin-bottom: 20px;
  }
`;

export default NotFoundPage;
