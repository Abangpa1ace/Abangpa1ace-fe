import { useState, useCallback, useEffect } from 'react';
import validate from '../constants/validate';

type OptionType = {
  name: string;
  initValue?: string;
}

type ReturnType = {
  value: string;
  setValue: (value: string) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  valid: boolean;
  showValid: boolean;
  setShowValid: (value: boolean) => void;
}

const useInput = (option?: OptionType): ReturnType => {
  const [value, setValue] = useState<string>(option?.initValue || '');
  const [valid, setValid] = useState<boolean>(false);
  const [showValid, setShowValid] = useState<boolean>(false);

  const validateInfo = validate[option?.name as string] ?? {}

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValid(validateInfo.regex.test(value));
  }, [value])

  return { 
    value, 
    setValue, 
    onChange, 
    valid, 
    showValid, 
    setShowValid,
  };
};

export default useInput;