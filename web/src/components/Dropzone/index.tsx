import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdFileUpload } from 'react-icons/md';

import { StyledDropzone } from './styles';

interface Props {
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  selectedFiles: File[];
}

const Dropzone: React.FC<Props> = ({ setSelectedFiles, selectedFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
    [selectedFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  return (
    <StyledDropzone
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <input {...getInputProps()} />
      <div>
        <MdFileUpload size={32} />
        <p>Arraste os arquivos aqui, ou clique para selecionar</p>
      </div>
    </StyledDropzone>
  );
};

export default Dropzone;
