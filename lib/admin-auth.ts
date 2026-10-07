import 'server-only';
import {cookies} from 'next/headers';
import {createHmac,createHash,timingSafeEqual} from 'node:crypto';
export const sessionCookie='socal_review_admin';
function sign(body:string){return createHmac('sha256',process.env.REVIEW_ADMIN_PASSWORD||'').update(body).digest('base64url')}
export function adminConfigured(){return (process.env.REVIEW_ADMIN_PASSWORD||'').length>=24}
export function passwordMatches(input:string){if(!adminConfigured())return false;return timingSafeEqual(createHash('sha256').update(input).digest(),createHash('sha256').update(process.env.REVIEW_ADMIN_PASSWORD!).digest())}
export function newSession(){const body=Buffer.from(JSON.stringify({scope:'reviews',exp:Date.now()+8*3600000})).toString('base64url');return body+'.'+sign(body)}
export async function isAdmin(){if(!adminConfigured())return false;const token=(await cookies()).get(sessionCookie)?.value;if(!token)return false;const parts=token.split('.');if(parts.length!==2)return false;const expected=Buffer.from(sign(parts[0]));const actual=Buffer.from(parts[1]);if(actual.length!==expected.length||!timingSafeEqual(actual,expected))return false;try{const data=JSON.parse(Buffer.from(parts[0],'base64url').toString());return data.scope==='reviews'&&data.exp>Date.now()}catch{return false}}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin}
