// Login
type LoginReqType = {
  id: string;
  password: string;
}

type LoginResType = {
  "accessToken": string,
  "user": {
    ID: string,
    NAME: string,
  }
}


// Pagination
type ProductListReqType = {
  page?: number;
  size?: number;
}

type ProductType = {
  id: string;
  name: string;
  thumbnail: string | null;
  price: number;
}

type ProductListResType = {
  products: ProductType[];
  totalCount: number;
}