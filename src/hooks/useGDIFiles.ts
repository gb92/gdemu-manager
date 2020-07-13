import { useMemo, useCallback } from "react";
import { useTypedSelector } from "../store";

export const useImageFiles = () => {
  useTypedSelector((state) => state.folders.imageFiles);
};
