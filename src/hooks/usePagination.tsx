import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { getPageInfo, PageInfoType } from "../utilities/pagination";

type OptionType = {
  totalCount: number;
};

type ReturyType = {
  pageInfo: PageInfoType;
  routePage: (page: number) => void;
  goPrevGroup: () => void;
  goNextGroup: () => void;
};

const usePagination = (option?: OptionType): ReturyType => {
  const router = useRouter();
  const qPage = router.query.page;
  const [pageValue, setPageValue] = useState<number>(1);

  useEffect(() => {
    if (qPage) setPageValue(+qPage);
  }, [qPage]);

  const pageInfo = useMemo(() => {
    return getPageInfo(pageValue, option?.totalCount as number);
  }, [pageValue, option?.totalCount]);

  const routePage = (page: number) => {
    if (page === pageValue) return;

    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  const goPrevGroup = () => {
    if (pageInfo.noPrevGroup) return;
    routePage(pageInfo.pageList[0] - 1);
  };

  const goNextGroup = () => {
    if (pageInfo.noNextGroup) return;
    routePage(pageInfo.pageList[pageInfo.pageList.length - 1] + 1);
  };

  return {
    pageInfo,
    routePage,
    goPrevGroup,
    goNextGroup,
  };
};

export default usePagination;
