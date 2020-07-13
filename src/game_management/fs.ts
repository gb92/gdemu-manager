import * as fs from "fs";

export const readdirAsync = (
  path: fs.PathLike,
  options?:
    | { encoding: BufferEncoding | null; withFileTypes?: false }
    | BufferEncoding
) => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, options, (error, files) => {
      if (error) {
        reject(error);
      }
      resolve(files);
    });
  });
};

export const readFileAsync = (
  path: fs.PathLike,
  options?:
    | string
    | {
        encoding?: string | null | undefined;
        flag?: string | undefined;
      }
) => {
  return new Promise<string | Buffer>((resolve, reject) => {
    fs.readFile(path, options, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export const statAsync = (path: fs.PathLike) => {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(path, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export const getFileExtension = (filename: string) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};
