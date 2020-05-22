import { Application, Router, Context, oakCors } from "./deps.ts";
import { bold, green } from "https://deno.land/std@0.51.0/fmt/colors.ts";
import {
  $getJson,
  $sendJson,
  $sendErrorIfUndefined,
  $sendStatus,
} from "./oakHelpers.ts";
import {
  getPiafs,
  searchPiaf,
  searchCategory,
  getCategories,
  getPiafsByCategory,
  getPiafsNameByCategory,
} from "./utils.ts";
const PiafDB = await getPiafs();
const categories = getCategories(PiafDB);

const app = new Application();
const router = new Router();
const BASE_URL = "/api/";
const setBaseUrl = (path: string) => BASE_URL + path;

function _getPiafs(ctx: Context) {
  try {
    $sendJson(ctx, PiafDB);
  } catch (e) {
    $sendStatus(ctx, 400, e);
  }
}

async function _searchPiafs(ctx: Context) {
  try {
    const data = await $getJson(ctx);
    $sendErrorIfUndefined(ctx, data.query);
    $sendJson(ctx, searchPiaf(PiafDB, data.query));
  } catch (e) {
    $sendStatus(ctx, 400, e);
  }
}
async function _getPiafsByCategory(ctx: Context) {
  try {
    const data = await $getJson(ctx);
    $sendErrorIfUndefined(ctx, data.category);
    $sendJson(ctx, getPiafsByCategory(PiafDB, data.category));
    $sendStatus(ctx, 200);
  } catch (e) {
    $sendStatus(ctx, 400, e);
  }
}
async function _getPiafsNameByCategory(ctx: Context) {
  try {
    const data = await $getJson(ctx);
    $sendErrorIfUndefined(ctx, data.category);
    $sendJson(ctx, getPiafsNameByCategory(PiafDB, data.category));
    $sendStatus(ctx, 200);
  } catch (e) {
    $sendStatus(ctx, 400, e);
  }
}

function _getCategories(ctx: Context) {
  try {
    $sendJson(ctx, categories);
    $sendStatus(ctx, 200);
  } catch (e) {
    $sendStatus(ctx, 400, e);
  }
}

async function _searchCategories(ctx: Context) {
  try {
    const data = await $getJson(ctx);
    $sendErrorIfUndefined(ctx, data.query);
    $sendJson(ctx, searchCategory(categories, data.query));
    $sendStatus(ctx, 200);
  } catch (e) {
    console.log(e);
    $sendStatus(ctx, 400, e);
  }
}

router
  .get(setBaseUrl("piafs"), _getPiafs)
  .post(setBaseUrl("piafs/search"), _searchPiafs)
  .post(setBaseUrl("piafs/category"), _getPiafsByCategory)
  .post(setBaseUrl("piafs/name/category"), _getPiafsNameByCategory)
  .get(setBaseUrl("categories"), _getCategories)
  .post(setBaseUrl("categories/search"), _searchCategories);

// CORS
app.use(async (ctx, next) => {
  await next();
  ctx.response.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
});
app.use(router.routes());
app.use(router.allowedMethods());

console.log(bold(green("Server listening ->")), "http://localhost:8000");
await app.listen({ port: 8000 });
