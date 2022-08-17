import { useQuery } from "react-query";
import { getProductList } from "../../services";

type Options = {
  page: number;
  initialData?: ProductListResType;
};

const useFetchPaginatedProductList = ({ page, initialData }: Options) => {
  return useQuery(["paginated-products", page], () => getProductList({ page }), {
    initialData,
    enabled: page > 0,
  });
};

export default useFetchPaginatedProductList;
