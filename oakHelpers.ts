import { Context } from "./deps.ts";
import { bold, blue } from "https://deno.land/std@0.51.0/fmt/colors.ts";
async function $getJson(ctx: Context) {
  try {
    const result = await ctx.request.body({
      contentTypes: {
        text: ["application/javascript"],
      },
    });
    return result.value;
  } catch (e) {
    console.log(e);
  }
}

async function $sendJson(ctx: Context, data: object | Array<any>) {
  ctx.response.body = JSON.stringify(data);
  console.log(
    bold(blue("Sending JSON ->")),
    ctx.request.headers.get("Referer")
  );
}
function $sendErrorIfUndefined(ctx: Context, testdata: any) {
  if (typeof testdata === undefined) {
    $sendStatus(ctx, 400), "Missing key";
  }
}

function $sendStatus(ctx: Context, status: number, error?: any) {
  ctx.response.status = status;
  if (error) {
    ctx.response.body = error;
  }
}

export { $getJson, $sendJson, $sendErrorIfUndefined, $sendStatus };
