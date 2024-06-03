import { Role } from "./app/api/auth/[...nextauth]/nextauth";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { JWT } from "next-auth/jwt";
import Negotiator from "negotiator";

/**
 * This is a class that represents a route in the application.
 * It has a path, methods, and roles that are allowed to access it.
 */
class Route {
  methods: string[];
  pathregex: RegExp;
  roles: Role[];
  /**
   * Constructs a new Route object.
   * Automatically adds OPTIONS and HEAD methods to the methods array if not taken into account.
   * @param path A regular expression that is used to match the URL.
   * @param methods The HTTP methods that are allowed to access the route.
   * @param roles  The roles that are allowed to access the route.
   */
  constructor(
    path: RegExp,
    methods: METHODS[] = ["GET", "OPTIONS", "POST", "DELETE"],
    roles: Role[] = [
      Role.admin,
      Role.employee,
      Role.student,
      Role.coordinator,
      Role.none,
    ],
  ) {
    this.methods = methods;
    if (!methods.includes("OPTIONS")) {
      this.methods.push("OPTIONS");
    }
    if (!methods.includes("HEAD")) {
      this.methods.push("HEAD");
    }
    this.pathregex = path;
    this.roles = roles;
  }

  hasAccess(role: Role) {
    return this.roles.includes(role);
  }
}

/**
 * The HTTP methods that are allowed in the application.
 */
type METHODS = "GET" | "POST" | "DELETE" | "OPTIONS" | "HEAD";

/**
 * This is a list of routes that are restricted to certain roles.
 * The routes are defined as regular expressions that are used to match the URL.
 */
const routeRestrictions: Route[] = [
  //API Routes
  new Route(/(api\/employees)/, ["GET"], [Role.admin, Role.employee]),
  new Route(/(api\/students)/, ["GET"], [Role.admin, Role.student]),
  new Route(/(api\/employees)/, ["POST"], [Role.admin]),
  new Route(/(api\/students)/, ["POST"], [Role.admin, Role.coordinator]),
  new Route(/(api\/employees)/, ["DELETE"], [Role.admin]),
  new Route(/(api\/students)/, ["DELETE"], [Role.admin, Role.coordinator]),

  //PAGE Routes
  //A route that matches the root URL + language code
  new Route(
    /^(\/(\w{2}|\w{2}-\w{2}|))$/,
    ["GET", "POST"],
    [Role.admin, Role.employee, Role.student, Role.coordinator],
  ),
  new Route(/(colors)/, ["GET"]),
  new Route(/(login)/, ["GET", "POST"]),
  new Route(/(colors)/, ["GET"]),
  new Route(/(studyprograms)/, ["GET", "POST"], [Role.admin, Role.coordinator]),
  new Route(/(departments)/, ["GET", "POST"], [Role.admin, Role.employee]),
  new Route(/(sections)/, ["GET", "POST"], [Role.admin]),
  new Route(/(sections\/\d+)/, ["GET", "POST"], [Role.employee]),
  new Route(/(internships)/, ["GET", "POST"], [Role.admin, Role.coordinator]),
  new Route(
    /(internshipOrders)/,
    ["GET", "POST"],
    [Role.admin, Role.coordinator],
  ),
  new Route(/(bulkImport)/, ["GET", "POST"], [Role.admin]),
  new Route(/(users)/, ["GET", "POST"], [Role.admin]),
  new Route(/(users\/students)/, ["GET", "POST"], [Role.coordinator]),
  new Route(
    /(internshipAgreements)/,
    ["GET", "POST"],
    [Role.admin, Role.coordinator],
  ),
  new Route(
    /(educationInstitutions)/,
    ["GET", "POST"],
    [Role.admin, Role.coordinator],
  ),
  new Route(
    /(profile)/,
    ["GET", "POST"],
    [Role.admin, Role.employee, Role.student, Role.coordinator],
  ),
  new Route(
    /(login)/,
    ["GET", "POST"],
    [Role.none, Role.admin, Role.employee, Role.student, Role.coordinator],
  ),
];

const locales = ["en-US", "nb-NO"];

export default withAuth(
  function middleware(request) {
    // Gotten from https://nextjs.org/docs/app/building-your-application/routing/internationalization#routing-overview
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some((locale) =>
      pathname.startsWith(`/${locale}`),
    );
    if (!pathnameHasLocale && !pathname.startsWith("/api")) {
      const locale = getLocale(request);
      // The new URL is now /en-US/products
      const newUrl = `/${locale}${pathname}`;
      const url = request.nextUrl.clone();
      url.pathname = newUrl;
      return NextResponse.redirect(url);
    }
    if (
      request.nextUrl.pathname.includes("login") &&
      /GET/.exec(request.method) &&
      request.nextauth.token?.role
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    if (!compareIfAccess(request, request.nextauth.token)) {
      return NextResponse.error();
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        return !!token?.role || req.nextUrl.pathname.includes("login");
      },
    },
  },
);

/**
 * Negotiates the locale based on the Accept-Language header
 * @param request The request to get the locale from
 * @returns The locale
 */
function getLocale(request: NextRequest) {
  const headers = { "accept-language": request.headers.get("accept-language") };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "en-US";
  const locale = languages.find((l) => locales.includes(l)) || defaultLocale;
  return locale;
}

/**
 * Compares the access of a request to the by the global list {@link routeRestrictions}. Defaults to false if no routes are found.
 * @param request  The request to compare
 * @param token The token to compare
 * @returns True if the user has access, false otherwise
 */
function compareIfAccess(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.pathname;
  const method = request.method;
  const routes = routeRestrictions.filter(
    (route) => route.pathregex.exec(url) && route.methods.includes(method),
  );

  //If no routes are found, refuse access
  if (routes.length === 0) {
    return false;
  }

  const role = token ? token?.role || Role.none : Role.none;
  //If any routes are found, check if the user has access to any of them
  for (const route of routes) {
    if (route.hasAccess(role)) {
      return true;
    }
  }
  return false;
}

/**
 * This is the configuration for the middleware.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
