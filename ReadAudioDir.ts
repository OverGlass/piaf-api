const AUDIO_DIR = "./piafsSounds/";

async function getDirNames(path: string = "") {
  const dirNames = [];
  for await (const dirEntry of Deno.readDir(AUDIO_DIR + path)) {
    if (dirEntry.name !== ".DS_Store") {
      dirNames.push(
        path.length === 0 ? dirEntry.name : path + "/" + dirEntry.name
      );
    }
  }
  return abcFormat(dirNames);
}

async function getCategories(): Promise<string[]> {
  return (await getDirNames())
    .map((dirName) => getCatergoryName(dirName))
    .filter((v, i, array) => array.indexOf(v) === i);
}

async function getFoldersbyCategory(
  catergory: string,
  directories: Promise<string[]> = getDirNames()
) {
  return (await directories).filter(
    (folderName) => getCatergoryName(folderName) === catergory
  );
}
async function getAudioPathsByCategory(category: string) {
  const recusiveLoop = async (
    directories: Promise<string[]> | Array<string>
  ): Promise<string[]> => {
    const dirs = await directories;
    return dirs.length === 0
      ? []
      : [
          ...(await getDirNames(dirs[0])),
          ...(await recusiveLoop(dirs.slice(1))),
        ];
  };
  return recusiveLoop(getFoldersbyCategory(category));
}

function abcFormat(array: Array<string>) {
  return array.sort((a, b) => a.localeCompare(b));
}
function getCatergoryName(dirName: string) {
  return dirName.split("_")[0];
}

export { getAudioPathsByCategory, getCategories };
