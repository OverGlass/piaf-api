import { Router } from "./deps.ts";
const BASE_URL = "/api/";
const setBaseUrl = (path: string) => BASE_URL + path;
const router = new Router();

import {
  _getPiafs,
  _searchPiafs,
  _getPiafsByCategory,
  _getPiafsNameByCategory,
  _getCategories,
  _searchCategories,
} from "./controllers/mod.ts";

router
  // API Routes
  .get(setBaseUrl("piafs"), _getPiafs)
  .post(setBaseUrl("piafs/search"), _searchPiafs)
  .post(setBaseUrl("piafs/category"), _getPiafsByCategory)
  .post(setBaseUrl("piafs/name/category"), _getPiafsNameByCategory)
  .get(setBaseUrl("categories"), _getCategories)
  .post(setBaseUrl("categories/search"), _searchCategories);

//Page routes

export default router;
