import { readdirAsync, statAsync, getFileExtension } from "./fs";
import * as path from "path";

const imageFileTypes = ["cdi", "gdi"];

export const findDiscImagesInFolder = async (
  folder: string
): Promise<string[]> => {
  const filesInFolder = await readdirAsync(folder);
  const discImages: string[] = [];
  filesInFolder.forEach(async (file) => {
    const filePath = path.join(folder, file);
    const fileStats = await statAsync(filePath);
    if (fileStats.isDirectory()) {
      const innerImages = await findDiscImagesInFolder(filePath);
      discImages.push(...innerImages);
      return;
    }

    const fileType = getFileExtension(file);
    if (imageFileTypes.includes(fileType)) {
      discImages.push(filePath);
    }
  });
  return discImages;
};
