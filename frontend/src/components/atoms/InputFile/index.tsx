import React from 'react';

interface IFValidateInputFile {
  maxSize?: number // megabyte(s)
  accept?: string // file extension by separate commas. Ex: ".docs, .html, ..."
}

interface IFProps {
  validate?: IFValidateInputFile
  className?: string
  isHidden?: boolean
  isFileChange: boolean
  setIsFileChange: (newState: boolean) => void
  setValidated: (newState: string) => void
  setFile: (file: string) => void
}

const InputFile = ({
  setFile,
  setIsFileChange,
  setValidated,
  className,
  isHidden = true,
  validate
}: IFProps) => {
  const handleOnchange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }

    const file = event.target.files[0];

    if (validate?.maxSize) {
      const fileSize = file.size / (1024 * 1000);
      if (fileSize > validate.maxSize) {
        setValidated('File too big. Maximum file size is 5MB.');
        return;
      }
    }

    if (validate?.accept) {
      const fileExtension = file?.name && file.name.length > 0
        ? '.' + file.name.split('.').pop()
        : '';
      if (!validate.accept.split(',').find(type => type.trim() === fileExtension)) {
        setValidated('This file type is not supported.');
        return;
      }
    }

    setValidated('');
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async () => {
      setFile(String(reader.result));
      setIsFileChange(true);
    };
  };

  return (
    <input
      className={className ?? ''}
      type={'file'}
      accept={validate?.accept ? validate.accept : '*.*'}
      hidden={isHidden}
      onChange={ async (event: React.ChangeEvent<HTMLInputElement>) => {
        await handleOnchange(event);
      }}
    />
  );
};

export default InputFile;