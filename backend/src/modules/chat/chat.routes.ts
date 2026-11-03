import { randomUUID } from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../middleware/async-handler";
export const chatRoutes=Router();
const schema=z.object({conversationId:z.string().optional(),message:z.string().trim().min(1).max(2000)});
type Message={role:"user"|"assistant";content:string};
const conversations=new Map<string,Message[]>();
async function askOllama(messages:Message[]){
 const response=await fetch((process.env.OLLAMA_URL??"http://127.0.0.1:11434")+"/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OLLAMA_MODEL??"llama3.2",stream:false,options:{num_predict:96,temperature:0.4},messages:[{role:"system",content:"You are a helpful assistant for a shipment operations demo. Give short, practical answers. You do not have access to live customer or shipment records, so do not claim to know their current data or invent records."},...messages]}),signal:AbortSignal.timeout(90000)});
 if(!response.ok)throw new Error("Local Ollama service returned "+response.status);
 const data=await response.json() as {message?:{content?:string}};
 if(!data.message?.content)throw new Error("AI returned an empty response"); return data.message.content;
}
async function askAzureOpenAI(messages:Message[]){
 const endpoint=process.env.AZURE_OPENAI_ENDPOINT;const key=process.env.AZURE_OPENAI_API_KEY;const deployment=process.env.AZURE_OPENAI_DEPLOYMENT;
 if(!endpoint||!key||!deployment)throw new Error("Azure OpenAI endpoint, key, and deployment are not configured");
 const version=process.env.AZURE_OPENAI_API_VERSION??"2024-10-21";
 const url=endpoint.replace(/\/$/,"")+"/openai/deployments/"+encodeURIComponent(deployment)+"/chat/completions?api-version="+encodeURIComponent(version);
 const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json","api-key":key},body:JSON.stringify({messages:[{role:"system",content:"You are a concise internal shipment operations assistant. Do not invent shipment records."},...messages]}),signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error("Azure OpenAI returned "+response.status);
 const data=await response.json() as {choices?:Array<{message?:{content?:string}}>};const answer=data.choices?.[0]?.message?.content;
 if(!answer)throw new Error("Azure OpenAI returned an empty response");return answer;
}async function askOpenAI(messages:Message[]){
 const key=process.env.OPENAI_API_KEY;if(!key)throw new Error("OPENAI_API_KEY is not configured");
 const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+key},body:JSON.stringify({model:process.env.OPENAI_MODEL??"gpt-4o-mini",messages:[{role:"system",content:"You are a concise internal shipment operations assistant. Do not invent shipment records."},...messages]}),signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error("AI service returned "+response.status);
 const data=await response.json() as {choices?:Array<{message?:{content?:string}}>};const answer=data.choices?.[0]?.message?.content;
 if(!answer)throw new Error("AI returned an empty response");return answer;
}
chatRoutes.post("/",asyncHandler(async(req,res)=>{
 const input=schema.parse(req.body);const conversationId=input.conversationId??randomUUID();
 const history=conversations.get(conversationId)??[];const messages:Message[]=[...history,{role:"user" as const,content:input.message}].slice(-10);
 try{const provider=(process.env.AI_PROVIDER??"ollama").toLowerCase();const reply=provider==="openai"?await askOpenAI(messages):provider==="azure-openai"?await askAzureOpenAI(messages):await askOllama(messages);
  conversations.set(conversationId,[...messages,{role:"assistant" as const,content:reply}].slice(-10));res.json({conversationId,reply});
 }catch(error){console.error("Chat provider error:",error);res.status(503).json({error:"AI service unavailable. Check the configured provider and its settings."});}
}));




