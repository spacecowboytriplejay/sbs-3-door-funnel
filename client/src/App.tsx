/*
Design reminder: Dark Editorial Institutionalism. The application shell must keep the route structure quiet and direct: portal, Door I, Door II, Door III, with no dashboard or generic app chrome.
*/
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/">{() => <Home page="portal" />}</Route>
      <Route path="/sbs-io">{() => <Home page="self" />}</Route>
      <Route path="/sbs-ai">{() => <Home page="dfy" />}</Route>
      <Route path="/frontier-co">{() => <Home page="community" />}</Route>
      <Route>{() => <Home page="not-found" />}</Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
