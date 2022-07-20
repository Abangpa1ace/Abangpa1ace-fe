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
            <p className='name'>{userInfo?.user.NAME}</p>
            <p className='pointer' onClick={() => logout()}>logout</p>
          </div>
        : <Link href='/login'>
            <p className='pointer'>login</p>
          </Link>
      }</LoginController>
    </ScHeader>
  )
}

const ScHeader = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: #f4f4fe;
`;

const Title = styled.a`
  font-size: 48px;
`;

const LoginController = styled.div`
  p {
    text-align: right;
    & + p {  
      margin-top: 8px;
    }

    &.name {
      font-weight: bold;
      text-decoration: underline;
    }
    &.pointer { cursor: pointer; }
  }
`;

export default Header