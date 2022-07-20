import React, { useRef, useState } from "react";
import styled from "styled-components";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Scroll = () => {
  const idx = useRef<number>(0);
  const [list, setList] = useState<object[]>([]);

  const fetchList = async () => {
    const addList = await getList({ offset: idx, limit: 10 });
    await setList([...list, addList]);
  };
  const { isEnd } = useInfiniteScroll({ onScrollEnd: fetchList });
  return <ScScroll></ScScroll>;
};

const ScScroll = styled.div``;

export default Scroll;
