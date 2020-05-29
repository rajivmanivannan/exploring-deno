import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
  bcrypt(stringToHash: string): Promise<string> {
    const hash = bcrypt.hash(stringToHash);
    return hash;
  },
  verify(plaintext: string, hash: string): Promise<boolean> {
    const result = bcrypt.compare(plaintext, hash);
    return result;
  },
};
