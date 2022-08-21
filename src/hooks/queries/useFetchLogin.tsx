import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { getUsersData, postLogin } from "../../services";

export const useLogin = () => {
  return useMutation<LoginResType, AxiosError>(postLogin, {
    // onMutate: (variables) => console.log(variables),
    onSuccess: (data) => {},
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useGetUserInfo = (id: string, enabled = true) => {
  return useQuery(["user-info", id], () => getUsersData(id), { enabled });
};
