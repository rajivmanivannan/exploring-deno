import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import router from "./routes.ts";
import notfound from "./404.ts";

const env = config();
const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

const app = new Application();
app.use(router.routes());
app.use(notfound);

await app.listen({ port: PORT });
console.log(`Server is started at ${HOST}:${PORT}`);
