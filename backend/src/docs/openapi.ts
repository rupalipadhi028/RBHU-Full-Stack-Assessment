export const openApiDocument={
 openapi:"3.0.3",info:{title:"RBHU Operations Demo API",version:"1.0.0",description:"Assessment demo API. Use login credentials from backend/.env."},servers:[{url:"http://localhost:3000"}],
 components:{securitySchemes:{bearerAuth:{type:"http",scheme:"bearer",bearerFormat:"JWT"}}},security:[{bearerAuth:[]}],
 paths:{
  "/health":{get:{security:[],summary:"Check API status",responses:{"200":{description:"API is running"}}}},
  "/api/auth/login":{post:{security:[],summary:"Mock login, returns JWT",responses:{"200":{description:"JWT and user"},"401":{description:"Invalid credentials"}}}},
  "/api/customers":{get:{summary:"List active customers",responses:{"200":{description:"Customer list"}}},post:{summary:"Create customer",responses:{"201":{description:"Created customer"},"400":{description:"Invalid input"}}}},
  "/api/customers/{id}":{put:{summary:"Update customer",parameters:[{in:"path",name:"id",required:true,schema:{type:"string"}}],responses:{"200":{description:"Updated customer"},"404":{description:"Not found"}}},delete:{summary:"Soft-delete customer",parameters:[{in:"path",name:"id",required:true,schema:{type:"string"}}],responses:{"204":{description:"Deleted"}}}},
  "/api/shipments":{get:{summary:"List shipments",responses:{"200":{description:"Shipment list"}}},post:{summary:"Create shipment",responses:{"201":{description:"Created shipment"}}}},
  "/api/shipments/{id}":{get:{summary:"Get shipment details",parameters:[{in:"path",name:"id",required:true,schema:{type:"string"}}],responses:{"200":{description:"Shipment and customer"},"404":{description:"Not found"}}}},
  "/api/shipments/{id}/status":{patch:{summary:"Update status and broadcast WebSocket event",parameters:[{in:"path",name:"id",required:true,schema:{type:"string"}}],responses:{"200":{description:"Updated shipment"}}}},
  "/api/dashboard/summary":{get:{summary:"Dashboard counts and status distribution",responses:{"200":{description:"Dashboard summary"}}}},
  "/api/chat":{post:{summary:"Ask AI assistant",responses:{"200":{description:"Assistant answer"},"503":{description:"AI provider unavailable"}}}},
  "/api/announcements":{get:{summary:"Mock intranet announcements, SharePoint bonus proof of concept",responses:{"200":{description:"Mock announcements"}}}}
 }
};
