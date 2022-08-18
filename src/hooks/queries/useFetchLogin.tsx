import { AxiosError } from 'axios'
import { useQuery, useMutation} from 'react-query'
import { getUsersData, postLogin } from '../../services'

export const useLogin = () => {
  return useMutation<LoginResType, AxiosError>(postLogin, {
    // onMutate: (variables) => console.log(variables),
    onSuccess: (data) => {
      console.log('login', data)
    },
    onError: (err) => {
      console.error(err)
    }
  })
}

export const useGetUserInfo = (id: string) => {
  return useQuery(['user-info', id], () => getUsersData(id))
}