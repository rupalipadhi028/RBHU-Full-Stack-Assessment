import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "node:http";
import { verifyToken } from "../modules/auth/token";
const authenticatedClients=new Set<WebSocket>();
let sockets: WebSocketServer | undefined;
export function attachWebSocket(server:Server) {
  sockets=new WebSocketServer({noServer:true,maxPayload:1024});
  server.on("upgrade",(request,socket,head)=>{
    if(request.url!=="/ws"){socket.destroy();return;}
    sockets?.handleUpgrade(request,socket,head,(client)=>sockets?.emit("connection",client,request));
  });
  sockets.on("connection",(client)=>{
    client.send(JSON.stringify({event:"connected",message:"Authenticate to receive shipment updates."}));
    const timer=setTimeout(()=>{if(!authenticatedClients.has(client)) client.close(4401,"Authentication required");},5000);
    client.on("message",(raw)=>{
      try { const message=JSON.parse(raw.toString());
        if(message.type==="authenticate" && typeof message.token==="string" && verifyToken(message.token)){
          authenticatedClients.add(client); clearTimeout(timer); client.send(JSON.stringify({event:"authenticated"}));
        }
      } catch { client.close(4400,"Invalid message"); }
    });
    client.on("close",()=>{clearTimeout(timer);authenticatedClients.delete(client);});
  });
}
export function publishShipmentStatusChanged(shipmentId:string,status:string){
  const event=JSON.stringify({event:"shipment_status_changed",shipmentId,status});
  for(const client of authenticatedClients) if(client.readyState===WebSocket.OPEN) client.send(event);
}
