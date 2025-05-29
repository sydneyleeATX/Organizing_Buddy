// this file is used to initialize all pages in the app and wrap in universal layout (if using one)
// must be notated as _app because Next.js looks for notation to initialize app

function _app({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default _app;