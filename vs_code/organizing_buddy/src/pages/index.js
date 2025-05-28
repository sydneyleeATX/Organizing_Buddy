// In Next.js, the routing is handled via the /pages directory
// Each component (e.g., Categorize, Clean, etc.) becomes a separate file in /pages
// No need for react-router-dom or manual <Routes>, <Route> definitions

// Example folder structure in /src/pages:
// - index.js                --> Home page
// - app.js                  --> AppPage
// - categorize.js           --> Categorize
// - clean.js                --> Clean
// - complete.js             --> Complete
// - declutter.js            --> Declutter
// - empty.js                --> Empty
// - menu.js                 --> Menu
// - return.js               --> Return
// - zone.js                 --> Zone
// - _app.js                 --> For global Layout
// - 404.js                  --> NoPage (fallback route)

// ---- src/pages/_app.js ----
import Layout from "../components/Layout"; // Move Layout into /components if not already
import "../styles/globals.css"; // Optional global styles

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// ---- src/pages/index.js ----
import Home from "../components/Home"; // If Home was a component

export default function HomePage() {
  return <Home />;
}

// ---- src/pages/app.js ----
import AppPage from "../components/AppPage";

export default function AppRoute() {
  return <AppPage />;
}

// ---- src/pages/categorize.js ----
import Categorize from "../components/Categorize";

export default function CategorizePage() {
  return <Categorize />;
}

// Repeat this pattern for clean.js, complete.js, etc.

// ---- src/pages/404.js ----
import NoPage from "../components/NoPage";

export default function Custom404() {
  return <NoPage />;
}