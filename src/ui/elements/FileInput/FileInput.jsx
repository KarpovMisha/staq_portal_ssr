'use client';
import { string, number, oneOfType, bool, func, array, object, node } from 'prop-types';
import { useDropzone } from 'react-dropzone';
import './FileInput.scss';

/** @param {{ accept?: string | string[] | Record<string, string[]>, children: import('react').ReactNode, disabled?: boolean, noDrag?: boolean, onDrop?: (files: File[]) => void, maxSize?: number }} props */
const FileInput = ({
  accept = undefined,
  children,
  disabled = false,
  noDrag,
  onDrop = (_files) => {},
  maxSize = 20 * 1e6,
  ...props
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    noDrag,
    disabled,
    onDrop: (acceptedFiles) => {
      if (!!acceptedFiles.length && maxSize) {
        const files = acceptedFiles.filter((c) => !(c && c.size > maxSize));
        onDrop(files);
      }
    },
  });

  return (
    <div
      {...getRootProps({
        className: 'FileInput',
      })}
      {...props}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

FileInput.propTypes = {
  accept: oneOfType([string, array, object]),
  children: node.isRequired,
  disabled: bool,
  noDrag: bool,
  onDrop: func,
  maxSize: oneOfType([string, number]),
};

export default FileInput;
