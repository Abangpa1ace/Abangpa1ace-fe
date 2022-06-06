import React from 'react'
import styled from 'styled-components'
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../recoil';
import { useResetRecoilState } from "recoil";

const Header = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  const clearUserInfo = useResetRecoilState(userInfoAtom);
  const logout = () => clearUserInfo()

  return (
    <ScHeader>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      <LoginController>{!!userInfo
        ? <div className='info'>
            <p>{userInfo?.user.NAME}</p>
            <p className='pointer' onClick={() => logout()}>logout</p>
          </div>
        : <Link href='/login'>
            <p className='pointer'>login</p>
          </Link>
      }</LoginController>
    </ScHeader>
  )
}

const ScHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const LoginController = styled.div`
  p {
    text-align: right;
    
    &.pointer { cursor: pointer; }
    & + p {  
      margin-top: 8px;
    }
  }
`;

export default Header