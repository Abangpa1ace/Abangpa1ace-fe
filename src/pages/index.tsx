import Link from "next/link";
import type { NextPage } from "next";
import React from "react";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";
import { bounce } from "../styles/keyframes";

const flex = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  border: 2px solid blue;
`;

const mt = (value: number) =>
  css`
    border: 2px solid green;
    margin-top: ${value};
  `;

const mq = [1024, 768, 500].map((bp) => `@media(max-width: ${bp}px)`);

const HomePage: NextPage = () => {
  const theme: object = useTheme();

  return (
    <main
      css={{
        [mq[0]]: {
          backgroundColor: `${theme.color[2]}`,
        },
        [mq[1]]: {
          backgroundColor: "red",
        },
      }}
    >
      {/* 1) Styled Components */}
      <Header dark={!true}>
        <Link href="/">
          {/* 2) css Prop - Object Styles */}
          <span
            css={{
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            HAUS
          </span>
        </Link>
        <Link href="/login">
          {/* 3) css Prop - String Styles */}
          <p
            css={css`
              color: #087c53;
              font-size: 20px;
            `}
          >
            login
          </p>
        </Link>
      </Header>
      {/* 4) Composition */}
      <div css={[flex, mt(40)]}>
        <Link href="/pagination?page=1">
          <StyledLink>pagination</StyledLink>
        </Link>
        <Link href="/infinite-scroll">
          <StyledLink>infinite scroll</StyledLink>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;

// 1) Styled Components
const Header = styled.div<{ dark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  ${({ dark }) =>
    dark
      ? css`
          background-color: #777;
          color: white;
        `
      : css`
          background-color: #eee;
        `};
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;
  // * keyframes
  animation: ${bounce} 1s ease infinite;

  & + & {
    margin-top: 40px;
  }
`;
