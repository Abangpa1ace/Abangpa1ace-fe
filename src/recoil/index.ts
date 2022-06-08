import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'; 

const sessionAtom = () => {
  const { persistAtom } = recoilPersist({
    key: 'session-persist',
    storage: typeof window === 'undefined' ? undefined : sessionStorage
  })

  return persistAtom
}

export const userInfoAtom = atom<LoginResType | null>({
  key: 'UserInfo',
  default: null,
  effects_UNSTABLE: [sessionAtom()],
})