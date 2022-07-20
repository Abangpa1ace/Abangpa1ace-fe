import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'; 

const sessionAtom = () => {
  const { persistAtom } = recoilPersist({
    key: 'session-persist',
    storage: typeof window === 'undefined' ? undefined : sessionStorage
  })

  return persistAtom
}

type UserInfoAtomType = {
  "accessToken": string,
  "user": {
    ID: string,
    NAME: string,
  },
  userData: UserInfoType
} | null

export const userInfoAtom = atom<UserInfoAtomType>({
  key: 'UserInfo',
  default: null,
  effects_UNSTABLE: [sessionAtom()],
})