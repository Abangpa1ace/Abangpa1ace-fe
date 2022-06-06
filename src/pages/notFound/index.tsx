import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Container>
        <p>존재하지 않는 페이지입니다.</p>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NotFoundPage