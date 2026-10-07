import 'server-only';
export type Review={id:number;name:string;email:string;city:string;service:string;rating:number;body:string;approved:number;consent:number;created_at:number};
export function reviewsConfigured(){return !!(process.env.SUPABASE_URL&&process.env.SUPABASE_SECRET_KEY)}
export async function reviewRequest(path:string,init:RequestInit={}){const base=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SECRET_KEY;if(!base||!key)throw Error('Review storage is not configured.');const r=await fetch(base.replace(/\/$/,'')+'/rest/v1/reviews'+path,{...init,headers:{apikey:key,'Content-Type':'application/json',...(init.headers||{})},cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error('Review storage request failed.');return r}
export function publicReview(r:Review){return {id:r.id,name:r.name,city:r.city,service:r.service,rating:r.rating,body:r.body,createdAt:r.created_at}}
