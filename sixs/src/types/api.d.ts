// Login
type LoginReqType = {
  id: string;
  password: string;
}

interface UserInfoType {
  "user": {
    ID: string,
    NAME: string,
  }
}

interface LoginResType extends UserInfoType {
  "accessToken": string,
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
  nextCursor?: number;
}