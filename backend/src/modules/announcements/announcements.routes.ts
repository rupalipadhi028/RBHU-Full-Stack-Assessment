import { Router } from "express";
export const announcementRoutes=Router();
announcementRoutes.get("/",(_req,res)=>res.json([
 {id:"1",title:"Quarterly town hall",summary:"Join the company update on Friday.",date:"2026-11-06"},
 {id:"2",title:"Shipment operations update",summary:"The operations team will share the revised dispatch process.",date:"2026-11-09"}
]));
