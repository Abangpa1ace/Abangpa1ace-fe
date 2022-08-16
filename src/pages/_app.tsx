import type { AppProps } from "next/app";
import styled from "styled-components";
import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import setupMSW from "../api/setup";
import GlobalStyle from "../styles/GlobalStyle";
import theme from "../styles/theme";

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyle /> */}
        <Global styles={GlobalStyle} />
        <Background />
        <Content>
          <Component {...pageProps} />
        </Content>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
