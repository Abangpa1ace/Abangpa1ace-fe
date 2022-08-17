import { useInfiniteQuery, useQueryClient } from "react-query";
import { getProductList } from "../../services";

const useFetchInfiniteProductList = () => {
  const queryClient = useQueryClient();
  const initialData = queryClient.getQueryState('infinite-products')?.data;
  console.log('init', initialData)

  return useInfiniteQuery(['infinite-products'], ({ pageParam = 1 }) => getProductList({ page: pageParam, size: 16 }), {
    staleTime: 30000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextCursor
    }
  })
}

export default useFetchInfiniteProductList