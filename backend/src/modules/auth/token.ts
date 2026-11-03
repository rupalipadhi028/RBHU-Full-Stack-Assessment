import { createHmac, timingSafeEqual } from "node:crypto";
const secret = () => process.env.JWT_SECRET ?? "local-demo-secret-change-me";
const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
export function createToken(email: string): string {
  const header = encode({ alg: "HS256", typ: "JWT" });
  const payload = encode({ sub: email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 });
  const data = header + "." + payload;
  return data + "." + createHmac("sha256", secret()).update(data).digest("base64url");
}
export function verifyToken(token: string): { email: string } | null {
  try {
    const parts = token.split("."); if (parts.length !== 3) return null;
    const data = parts[0] + "." + parts[1];
    const expected = createHmac("sha256", secret()).update(data).digest();
    const actual = Buffer.from(parts[2], "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    if (typeof payload.exp !== "number" || payload.exp <= Date.now() / 1000) return null;
    return typeof payload.sub === "string" ? { email: payload.sub } : null;
  } catch { return null; }
}
