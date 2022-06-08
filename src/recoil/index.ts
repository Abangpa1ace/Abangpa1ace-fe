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

type ProductsDataAtomType = {
  page: number,
  productList: ProductType[],
  total: number,
}

export const productsDataAtom = atom<ProductsDataAtomType>({
  key: 'ProductsData',
  default: { page: 0, productList: [], total: 0 },
  effects_UNSTABLE: [sessionAtom()],
})