import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const authObject = await auth();
    // Přesměrování na přihlášení, pokud není uživatel autentizovaný
    if (!authObject.userId) {
      return authObject.redirectToSignIn();
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
