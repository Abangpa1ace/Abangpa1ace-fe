import qs from 'qs';

export const setQueryPath = (path: string, query: { [K in string]: number | string }) => {
  if (path[0] !== '/') path = '/' + path
  return `${path}?${qs.stringify(query)}`;
}

export interface PageInfoType {
  page: number;
  pageList: number[];
  noPrevGroup: boolean;
  noNextGroup: boolean;
}

export const getPageInfo = (page: number, totalCount: number, size = 10, groupSize = 5): PageInfoType => {
  const pageCount = Math.ceil(totalCount / size);

  const group = Math.ceil(page / groupSize);
  const groupCount = Math.ceil(pageCount / groupSize);

  return {
    page,
    pageList: Array.from({ length: groupSize }, (_, i) => groupSize * (group - 1) + i + 1).filter(p => p <= pageCount),
    noPrevGroup: group === 1,
    noNextGroup: group === groupCount,
  }
}