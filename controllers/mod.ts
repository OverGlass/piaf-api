import { Context } from "../deps.ts";
import {
  $getJson,
  $sendJson,
  $sendErrorIfUndefined,
  $sendStatus,
} from "../oakHelpers.ts";
import {
  getPiafs,
  searchPiaf,
  searchCategory,
  getCategories,
  getPiafsByCategory,
  getPiafsNameByCategory,
} from "../models/mod.ts";

const PiafDB = await getPiafs();
const categories = getCategories(PiafDB);

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

export {
  _getPiafs,
  _searchPiafs,
  _getPiafsByCategory,
  _getPiafsNameByCategory,
  _getCategories,
  _searchCategories,
};
