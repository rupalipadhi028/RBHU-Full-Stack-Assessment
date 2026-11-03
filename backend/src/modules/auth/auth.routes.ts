import { timingSafeEqual } from "node:crypto";
import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import { asyncHandler } from "../../middleware/async-handler";
import { createToken } from "./token";
export const authRoutes = Router();
const loginSchema = z.object({ email: z.email(), password: z.string().min(1) });
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false });
const same = (left: string, right: string) => { const a=Buffer.from(left); const b=Buffer.from(right); return a.length===b.length && timingSafeEqual(a,b); };
authRoutes.post("/login", loginLimit, asyncHandler(async (req,res) => {
  const { email,password }=loginSchema.parse(req.body);
  const expectedEmail=process.env.ADMIN_EMAIL ?? "admin@rbhu.local";
  const expectedPassword=process.env.ADMIN_PASSWORD ?? "Demo@123";
  if (!same(email.toLowerCase(),expectedEmail.toLowerCase()) || !same(password,expectedPassword)) { res.status(401).json({error:"Invalid email or password"}); return; }
  res.json({token:createToken(expectedEmail),user:{email:expectedEmail}});
}));
