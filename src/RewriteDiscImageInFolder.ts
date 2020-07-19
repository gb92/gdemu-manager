import * as fs from "fs";
import * as path from "path";

const NEW_GDI_NAME = "disc.gdi";

export const rewriteDiscImageInFolder = async (
    inputFolderPath: string,
    outputFolderPath: string,
) => {
    await ensureFolderExists(outputFolderPath);

    const dirContents = fs.readdirSync(inputFolderPath);
    const gdiFileName = dirContents.find(file => file.includes(".gdi"));
    const otherFiles = dirContents.filter(file => !file.includes(".gdi"));
    const trackFileNameMap = new Map<string, string>();
    const gdFilePath = path.join(inputFolderPath, gdiFileName);
    const gdiContents = fs.readFileSync(gdFilePath, {
        encoding: "ascii",
    });
    const gdiLines = gdiContents.split("\r\n");
    const newGDILines: String[] = [];
    gdiLines.forEach((line, index) => {
        const { newLine, oldTrackName, newTrackName } = convertTrackLine(
            line,
            index,
        );
        newGDILines.push(newLine);
        if (oldTrackName && newTrackName) {
            trackFileNameMap.set(oldTrackName, newTrackName);
        }
    });

    otherFiles.forEach(fileName => {
        if (trackFileNameMap.has(fileName)) {
            console.log(
                `Rename ${fileName} to ${trackFileNameMap.get(fileName)}`,
            );
            const newFileName = trackFileNameMap.get(fileName);
            const oldFilePath = path.join(inputFolderPath, fileName);
            const newFilePath = path.join(outputFolderPath, newFileName);
            fs.copyFileSync(oldFilePath, newFilePath);
        }
    });

    const newGDIContents = newGDILines.join("\r\n");
    const newGDIFilePath = path.join(outputFolderPath, NEW_GDI_NAME);

    fs.writeFileSync(newGDIFilePath, newGDIContents, {
        encoding: "ascii",
    });
};

function convertTrackLine(line: string, index: number) {
    if (index === 0 || line === "") {
        return { newLine: line };
    }

    const lineParts = line.split(/\s+/);
    const trackNum = ("00" + lineParts[0]).slice(-2);

    // So getting the file name is... fun.
    // Basically, we know that there are 4 numbers before the file name,
    // and 1 number after it. So join all the parts of the line between those
    // numbers and you should have the actual filename.
    // this Handles cases where the track name is like "My really cool game (Track 1).bin"
    const currentTrackName = lineParts
        .slice(4, lineParts.length - 1)
        .join(" ")
        .replace(/"/g, "");
    const fileExtension = getFileExtension(currentTrackName);
    console.log(fileExtension);
    const newTrackName = `Track${trackNum}.${fileExtension}`;
    console.log(newTrackName);
    console.log(`Track #: ${trackNum}`);
    console.log(`Track Name: ${currentTrackName}`);

    return {
        newLine: line.replace(currentTrackName, newTrackName),
        oldTrackName: currentTrackName,
        newTrackName: newTrackName,
    };
}

function getFileExtension(filename: string) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

function ensureFolderExists(folder: string) {
    return new Promise((resolve, reject) => {
        fs.mkdir(folder, { recursive: true }, error => {
            if (error) {
                if (error.code === "EEXIST") {
                    resolve();
                    return;
                }
                reject(error);
            }
            resolve();
        });
    });
}
