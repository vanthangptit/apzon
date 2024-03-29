import React, { useState } from 'react';
import { Input } from '@components/atoms/Imput';
import { MessageError } from '@components/atoms/MessageError';
import { FormState, RegisterOptions, UseFormRegister } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { LabelField } from '@components/atoms/Label';

export type NameField = 'voucherDate' | 'userCode' | 'userName' | 'totalInVoice';

export type TypeField = 'email' | 'password' | 'text';

const FormControl = ({
  register,
  formState,
  textEr,
  typeField,
  nameField,
  placeholder,
  disabled,
  isRequired= true,
  $with,
  $height,
  $minLength,
  $maxLength,
  $pattern,
  $validate,
  label,
  errors,
  autofocus,
  $isHorizontal,
  $withLabel,
  $heightLabel
}: {
  register: UseFormRegister<any>
  formState: FormState<any>
  textEr: string
  typeField: TypeField
  nameField: NameField
  label?: string
  placeholder?: string
  disabled?: boolean
  isRequired?: boolean
  autofocus?: boolean
  $isHorizontal?: boolean
  $with: string
  $height: string
  $withLabel?: string
  $heightLabel?: string
  $minLength?: number
  $maxLength?: number
  $pattern?: any
  $validate?: any
  errors?: {
    required?: string
    pattern?: string
    length?: string
    validate?: string
  }
}) => {
  const [ isHiddenPassword, setHiddenPassword ] = useState<boolean>(true);
  const handleHiddenPassword = () => setHiddenPassword(!isHiddenPassword);
  const options: RegisterOptions = {
    required: isRequired
  };

  if ($minLength) {
    options['minLength'] = $minLength;
  }

  if ($maxLength) {
    options['maxLength'] = $maxLength;
  }

  if ($pattern) {
    options['pattern'] = $pattern;
  }

  if ($validate) {
    options['validate'] = $validate.validate;
  }

  return (
    <>
      <DivBox $isError={!!formState.errors[nameField]} $isHorizontal={!!$isHorizontal}>
        {label && <LabelField $with={$withLabel} $height={$heightLabel}>{label}</LabelField>}
        <Input
          {...register(nameField, options)}
          type={typeField === 'password' ? (isHiddenPassword ? 'password' : 'text') : typeField}
          placeholder={placeholder}
          $with={$with}
          $height={$height}
          autoFocus={!!autofocus}
          disabled={!!disabled}
        />

        {typeField === 'password' && (
          <FormIcons onClick={handleHiddenPassword}>
            {isHiddenPassword ? <BsEyeSlash size={16} /> : <BsEye size={18} />}
          </FormIcons>
        )}
      </DivBox>
      {!errors && formState.errors[nameField] && <MessageError>{textEr}</MessageError>}

      {
        isRequired && formState.errors[nameField]?.type === 'required' && errors?.required ? (
          <MessageError>{errors?.required}</MessageError>
        ) : ($minLength || $maxLength) &&
          (formState.errors[nameField]?.type === 'minLength' || formState.errors[nameField]?.type === 'maxLength') &&
          errors?.length ? (
            <MessageError>{errors?.length}</MessageError>
          ) : $pattern && formState.errors[nameField]?.type === 'pattern' && errors?.pattern ? (
            <MessageError>{errors?.pattern}</MessageError>
          ) : $validate && formState.errors[nameField]?.type === 'validate' && errors?.validate ? (
            <MessageError>{errors?.validate}</MessageError>
          ): <></>
      }
    </>
  );
};

export default FormControl;

const DivBox = styled.div<{ $isError: boolean; $isHorizontal: boolean }>`
  position: relative;
  margin-bottom: ${({ $isError }) => $isError ? '5px' : '25px'};

  ${({ $isHorizontal }) =>
    $isHorizontal &&
    css`
      display: flex;
      gap: 7px;
      align-items: center;
      
      label {
        margin-bottom: 0;
        border-bottom: 1px dashed ${({ theme }) => theme.text3};
      }
  `}
`;

const FormIcons = styled.span`
  cursor: pointer;
  position: absolute;
  right: 10px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  color: ${({ theme }) => theme.text2};
  top: 50%;
  transform: translateY(-50%);
`;
