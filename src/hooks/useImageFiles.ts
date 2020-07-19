import { useTypedSelector } from "../store";

const useImageFiles = () => {
  useTypedSelector((state) => state.folders.imageFiles);
};

export default useImageFiles;
