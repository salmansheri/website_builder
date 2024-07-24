import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"; 
import { before } from "node:test";


const isPublicRoutes= createRouteMatcher([
    "/agency/sign-in(.*)", 
    "/agency/sign-up(.*)", 
    "/site", 
    "/api/uploadthing"
])


export default clerkMiddleware((auth, req) => {
  if(!isPublicRoutes(req)) {
    auth().protect(); 
  }
  
   
}, { debug: true });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)","/",  "/(api|trpc)(.*)"],
};