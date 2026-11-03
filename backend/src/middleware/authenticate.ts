import type { RequestHandler } from "express";
import { verifyToken } from "../modules/auth/token";
export const authenticate: RequestHandler = (req,res,next) => {
  const value=req.header("authorization") ?? "";
  const token=value.startsWith("Bearer ") ? value.slice(7) : "";
  if (!verifyToken(token)) { res.status(401).json({error:"A valid bearer token is required"}); return; }
  next();
};
