import {
  type DropzoneInputProps,
  type DropzoneRootProps,
} from "react-dropzone";

const Dropzone = ({
  getRootProps,
  getInputProps,
  isDragActive,
}: DropzoneProps) => {
  return (
    <div
      {...getRootProps({
        className:
          " leading-none peer-disabled:cursor-not-allowed rounded peer-disabled:opacity-70 border-4 text-slate-800 dark:text-slate-100 min-h-56 flex items-center justify-center text-sm font-medium   border-dashed border-gray-300 p-4",
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drop file here to be converted</p>
      )}
    </div>
  );
};

interface DropzoneProps {
  getRootProps: (props?: DropzoneRootProps | undefined) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps;
  isDragActive: boolean;
}

export default Dropzone;
