const PAGE_URL = "https://www.oiseaux.net/oiseaux/";
const JS_AUDIO_URL = "https://www.oiseaux.net/front/js/espece/";

export function toPageUrl(dotString: string) {
  return PAGE_URL + dotString + ".html";
}

export function toAudioJsUrl(dotString: string) {
  return JS_AUDIO_URL + dotString + ".js";
}

interface piafObj {
  name: string;
  href: string;
}
export function getCategory(piafObj: piafObj) {
  return piafObj.name.split(" ")[0];
}

export function getCategories(piafs: Array<piafObj>) {
  return piafs
    .map((piaf) => getCategory(piaf))
    .filter((v, i, array) => array.indexOf(v) === i);
}
interface Piaf {
  name: string;
  href: string;
  audios: {
    On_mp3: [];
    On_ogg: [];
  };
}
export async function getPiafs(): Promise<Piaf[]> {
  const data = await Deno.readTextFile("piafDB.json");
  return JSON.parse(data);
}

export function searchPiaf(array: Array<Piaf>, query: string) {
  const reg = new RegExp(`${query.toUpperCase()}`);
  return array.filter((el) => reg.test(el.name.toUpperCase()));
}

export function searchCategory(array: Array<string>, query: string) {
  const reg = new RegExp(`${query.toUpperCase()}`);
  return array.filter((el) => reg.test(el.toUpperCase()));
}

export function getPiafsByCategory(array: Array<Piaf>, category: string) {
  return array.filter(
    (el) => getCategory(el).toUpperCase() === category.toUpperCase()
  );
}
export function getPiafsNameByCategory(array: Array<Piaf>, category: string) {
  return getPiafsByCategory(array, category).map((el) => el.name);
}
