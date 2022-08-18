import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import BaseInput, {
  UpdateForm,
  UpdateFormValid,
} from "../components/common/BaseInput";
import { getUsersData } from "../services";
import { useLogin } from "../hooks/queries/useFetchLogin";
// import { useRecoilState } from "recoil";
// import { userInfoAtom } from "../recoil";

type LoginValidType = { [K in keyof LoginReqType]: boolean };

const LoginPage: NextPage = () => {
  const router = useRouter();
  // const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [loginForm, setLoginForm] = useState<LoginReqType>({
    id: "",
    password: "",
  });
  const [loginValid, setLoginValid] = useState<LoginValidType>({
    id: false,
    password: false,
  });
  const isComplete = Object.values(loginValid).every((is) => is);

  const { mutate: postLogin } = useLogin();
  // useEffect(() => {
  //   alreadyLogin();
  // }, []);

  // const alreadyLogin = () => {
  //   if (!!userInfo) router.replace("/");
  // };

  const updateForm = ({ name, value }: UpdateForm) => {
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateValid = ({ name, valid }: UpdateFormValid) => {
    setLoginValid((prev) => ({ ...prev, [name]: valid }));
  };

  const submitForm = async () => {
    if (!isComplete) return alert("아이디와 비밀번호를 재확인해주세요!");
    postLogin(loginForm);
    // const userData = await getUsersData(res.user.ID);
    // setUserInfo({ ...res, userData });
    // return router.push("/");
  };

  return (
    <>
      <Form>
        <InputLabel>아이디</InputLabel>
        <BaseInput
          name="id"
          updateValue={updateForm}
          updateValid={updateValid}
        />
        <InputLabel>비밀번호</InputLabel>
        <BaseInput
          name="password"
          updateValue={updateForm}
          updateValid={updateValid}
        />
        <LoginButton disabled={!isComplete} onClick={submitForm}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 40px;
`;

const InputLabel = styled.p`
  margin-top: 16px;
  color: #6c6c7d;
  font-size: 13px;
  font-weight: 700;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #e2e2ea;
    cursor: not-allowed;
  }
`;
