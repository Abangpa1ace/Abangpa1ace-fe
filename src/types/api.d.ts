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