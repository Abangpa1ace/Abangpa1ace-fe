import { Axios, AxiosError } from "axios";
import { useQuery, useMutation, QueryClient } from "react-query";
import { getUsersData, postLogin } from "../../services";

const queryClient = new QueryClient();

export const usePostLogin = () => {
  return useMutation<LoginResType, AxiosError, LoginReqType>(postLogin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-info", data.user.ID]);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useGetUserInfo = (id: string, enabled = true) => {
  return useQuery<UserInfoType, AxiosError>(
    ["user-info", id],
    () => getUsersData(id),
    {
      enabled,
    }
  );
};
