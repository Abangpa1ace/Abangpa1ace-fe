import { useQuery } from "react-query";
import { getProductList } from "../../services";

type Options = {
  page: number;
  initialData?: ProductListResType;
};

const useFetchPaginatedProductList = ({ page, initialData }: Options) => {
  console.log("fetch");
  return useQuery(["products"], () => getProductList({ page }), {
    initialData,
  });
};

export default useFetchPaginatedProductList;
