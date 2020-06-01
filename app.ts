import { Application, Context } from "./deps.ts";
import { bold, green } from "https://deno.land/std@0.51.0/fmt/colors.ts";
import router from "./router.ts";

const app = new Application();

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
