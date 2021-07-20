import styled from 'styled-components';
import { DropzoneRootProps } from 'react-dropzone';

const getColor = (props: DropzoneRootProps) => {
  if (props.isDragAccept) {
    return '#278cc5';
  }
  if (props.isDragReject) {
    return '#E85545';
  }
  if (props.isDragActive) {
    return '#278cc5';
  }
  return '#bbb';
};

export const StyledDropzone = styled.div<DropzoneRootProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  text-align: center;
  width: 16rem;
  height: 16rem;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fff;
  color: ${(props) => getColor(props)};
  outline: none;
  transition: border 0.24s ease-in-out;

  svg {
    color: ${(props) => getColor(props)};
  }
`;
