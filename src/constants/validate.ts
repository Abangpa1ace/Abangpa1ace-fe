export type InputType = 'text' | 'password' | 'number';

type ValidateData = {
  name: string,
  regex: RegExp,
  maxLength: number,
  type: InputType,
}

const validate: Objects<ValidateData> = {
  id: {
    name: '아이디',
    regex: /^[0-9A-Za-z]{5,30}$/,
    maxLength: 30,
    type: 'text',
  },
  password: {
    name: '비밀번호',
    regex: /^[0-9A-Za-z]{8,30}$/,
    maxLength: 30,
    type: 'password',
  },
}

export default validate