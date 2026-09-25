import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import SiteLayout from "./components/site/SiteLayout";
import NotFoundPage from "./pages/NotFoundPage";

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./pages/HomePage"), "default"),
});

const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/features",
  component: lazyRouteComponent(
    () => import("./pages/FeaturesPage"),
    "default",
  ),
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: lazyRouteComponent(() => import("./pages/PricingPage"), "default"),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: lazyRouteComponent(() => import("./pages/ContactPage"), "default"),
});

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: lazyRouteComponent(() => import("./pages/DemoPage"), "default"),
});

const monthlyPricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/monthly-pricing",
  component: lazyRouteComponent(
    () => import("./pages/MonthlyPricingPage"),
    "default",
  ),
});

const payRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay/$tier",
  component: lazyRouteComponent(
    () => import("./pages/SecurePaymentPage"),
    "default",
  ),
});

const toolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools",
  component: lazyRouteComponent(
    () => import("./pages/FreeToolsPage"),
    "default",
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  featuresRoute,
  pricingRoute,
  contactRoute,
  demoRoute,
  monthlyPricingRoute,
  payRoute,
  toolsRoute,
]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
