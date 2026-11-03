import { Router } from "express";
import { prisma } from "../../lib/prisma";
export const dashboardRoutes=Router();
dashboardRoutes.get("/summary",async(_req,res,next)=>{
 try{
  const [totalCustomers,totalShipments,groups]=await Promise.all([
   prisma.customer.count({where:{deletedAt:null}}),prisma.shipment.count(),prisma.shipment.groupBy({by:["status"],_count:{_all:true}})
  ]);
  res.json({totalCustomers,totalShipments,shipmentsByStatus:Object.fromEntries(groups.map((g)=>[g.status,g._count._all]))});
 }catch(error){next(error);}
});
