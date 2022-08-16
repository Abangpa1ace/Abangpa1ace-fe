import React from "react";
import styled from "@emotion/styled";
import usePagination from "../hooks/usePagination";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { NextPage } from "next";

type Props = {
  totalCount: number;
};

const Pagination: NextPage<Props> = ({ totalCount }) => {
  const { pageInfo, routePage, goPrevGroup, goNextGroup } = usePagination({
    totalCount,
  });
  const { page, pageList, noPrevGroup, noNextGroup } = pageInfo;

  return (
    <Container>
      <Button disabled={noPrevGroup} onClick={() => goPrevGroup()}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pageList.map((pageItem) => (
          <Page
            key={pageItem}
            selected={page === pageItem}
            disabled={page === pageItem}
            onClick={() => routePage(pageItem)}
          >
            {pageItem}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={noNextGroup} onClick={() => goNextGroup()}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-left: -20px;
`;

const Button = styled.button`
  padding: 8px 4px;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: #c6c6c6;
    cursor: pointer;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? "#000" : "transparent")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:hover:not(:disabled) {
    background-color: #c6c6c6;
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
  }
`;
