import { toAudioJsUrl } from "./utils.ts";
import { bold, blue, green } from "https://deno.land/std@0.51.0/fmt/colors.ts";

interface piafObj {
  name: string;
  href: string;
}

export async function scrapAudio(piafObj: piafObj) {
  const tmpJSpath = `${Deno.cwd()}/tmp/tmp.js`;
  const jsfile = toAudioJsUrl(piafObj.href);
  console.log(bold(blue("Scrapping...")), piafObj.name);
  const req = await fetch(jsfile);
  const blob = await req.blob();
  // @ts-ignore
  await Deno.writeFile(tmpJSpath, await blob.arrayBuffer());
  const encoder = new TextEncoder();
  const data = encoder.encode("export { On_mp3, On_oga }");
  Deno.writeFileSync(tmpJSpath, data, { append: true });
  const audioUrl = await import(tmpJSpath);
  Deno.removeSync(tmpJSpath);
  console.log(bold(green("Done ->")), piafObj.name);
  return audioUrl;
}
