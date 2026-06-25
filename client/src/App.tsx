/*
Design reminder: Dark Editorial Institutionalism. Routes: portal (/), Door I (/sbs-io), Door II (/sbs-ai), Door III The Frontier Syndicate (/frontier-co). No Silla references anywhere. No dashboard chrome.
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
      <Route path="/checkout/vault">{() => <Home page="checkout-vault" />}</Route>
      <Route path="/checkout/playbook">{() => <Home page="checkout-playbook" />}</Route>
      <Route path="/checkout/templates">{() => <Home page="checkout-templates" />}</Route>
      <Route path="/qualify">{() => <Home page="qualify" />}</Route>
      <Route path="/not-a-fit">{() => <Home page="not-a-fit" />}</Route>
      <Route path="/qualified">{() => <Home page="qualified" />}</Route>
      <Route path="/booking-confirmation">{() => <Home page="booking-confirmation" />}</Route>
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
