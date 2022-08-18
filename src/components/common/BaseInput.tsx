import React, { useEffect } from "react";
import styled from "@emotion/styled";
import useInput from "../../hooks/useInput";
import validate from "../../constants/validate";

type Props = {
  name: string;
  updateValue: ({ name, value }: UpdateForm) => void;
  updateValid: ({ name, valid }: UpdateFormValid) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export type UpdateForm = {
  name: string;
  value: string;
};

export type UpdateFormValid = {
  name: string;
  valid: boolean;
};

const BaseInput: React.FC<Props> = (
  { updateValue, updateValid, name, placeholder, disabled, className },
  ref
) => {
  const { value, onChange, valid, showValid, setShowValid } = useInput({
    name,
  });
  const validateInfo = validate[name as string] ?? {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    updateValue({ name, value: e.target.value });
    if (valid) setShowValid(false);
  };

  useEffect(() => {
    updateValid({ name, valid });
  }, [valid]);

  const handleBlur = () => {
    if (!showValid) setShowValid(true);
  };

  return (
    <ScBaseInput
      className={`${className} ${disabled ? "disabled" : ""} ${
        valid ? "valid" : ""
      }`}
    >
      <input
        value={value}
        name={name}
        type={validateInfo.type}
        maxLength={validateInfo.maxLength}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        onBlur={handleBlur}
        className={showValid && !valid ? "error" : ""}
      />
      {showValid && !valid && (
        <p className="validation-text">{`올바른 ${validateInfo.name} 형식으로 입력해주세요.`}</p>
      )}
    </ScBaseInput>
  );
};

const ScBaseInput = styled.div`
  &.error {
    border: 2px solid blue;
  }
  input {
    width: 100%;
    margin-top: 8px;
    padding: 16px;
    background-color: #f7f7fa;
    border-radius: 12px;

    &.error {
      background-color: #fdedee;
    }
  }

  p.validation-text {
    margin-top: 8px;
    font-size: 13px;
    font-weight: 400;
    color: #ed4e5c;
  }
`;

export default BaseInput;
