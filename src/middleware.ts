import { Role} from "./app/api/auth/[...nextauth]/nextauth";
import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { JWT } from "next-auth/jwt";
/**
 * This is a class that represents a route in the application.
 * It has a path, methods, and roles that are allowed to access it.
 * The path is a regular expression that is used to match the URL.
 * The methods are the HTTP methods that are allowed to access the route.
 * The roles are the roles that are allowed to access the route.
 * 
 * It automatically adds the OPTIONS method to the list of methods.
 */
class Route {
  methods: string[];
  path: string;
  roles: Role[];
  constructor(
    path: string,
    methods: string[] = ["GET", "OPTIONS", "POST", "DELETE"],
    roles: Role[] = [Role.admin, Role.employee, Role.student, Role.none]
  ) {
    this.methods = methods; 
    if(!methods.includes("OPTIONS")){
      this.methods.push("OPTIONS");
    }
    this.path = path;
    this.roles = roles;
  }

  hasAccess(role: Role) {
    return this.roles.includes(role);
  }
}

/**
 * This is a list of routes that are restricted to certain roles.
 * The routes are defined as regular expressions that are used to match the URL.
 */
const routeRestrictions: Route[] = [
  //API Routes
  new Route("\/$", ["GET"], [Role.admin, Role.employee, Role.student]),
  new Route("(api)", ["GET", "POST", "DELETE"], [Role.admin]),
  new Route("(api\/employees)", ["GET"], [Role.admin, Role.employee]),
  new Route("(api\/students)", ["GET"], [Role.admin, Role.student]),
  new Route("(api\/employees)", ["POST"], [Role.admin]),
  new Route("(api\/students)", ["POST"], [Role.admin, Role.coordinator]),
  new Route("(api\/employees)", ["DELETE"], [Role.admin]),
  new Route("(api\/students)", ["DELETE"], [Role.admin, Role.coordinator]),

  //PAGE Routes
  new Route("(employees)", ["GET"], [Role.admin, Role.employee]),
  new Route("(students)", ["GET"], [Role.admin, Role.student]),
  new Route("(studyprograms)", ["GET"], [Role.admin, Role.coordinator]),
];

export default withAuth(function middleware(request) {
  const token = request.nextauth.token;

}, {
  callbacks: {
    authorized({ req, token }) {
      return compareIfAccess(req, token);
    },
  },
});
function compareIfAccess(request: NextRequest, token: JWT | null) {
  const url = request.nextUrl.pathname;
  const method = request.method;
  
  const routes = routeRestrictions.filter(
    (route) => RegExp(route.path).exec(url) && route.methods.includes(method)
  );
  
  //If no routes are found, return true
  if (routes.length === 0) {
    return true;
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