import {
  validateJwt,
  parseAndDecode,
  validateJwtObject,
} from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

const key = env.DJWT_SECRET || "secret-key";
const payload: Payload = {
  iss: "exploringdenoadmin",
  exp: setExpiration(new Date().getTime() + 60000),
};
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  generate(userId: string): string {
    const payload: Payload = {
      uid: userId,
      exp: setExpiration(new Date().getTime() + 60000 * 60),
    };
    return makeJwt({ header, payload, key });
  },
  async validate(token: string) {
    return !!await validateJwt(token, key, { isThrowing: false });
  },
  fetchUserId(token: string) {
    return validateJwtObject(parseAndDecode(token)).payload;
  },
};
