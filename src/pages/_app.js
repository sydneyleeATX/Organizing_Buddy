// this file is used to initialize all pages in the app and wrap in universal layout (if using one)
// must be notated as _app because Next.js looks for notation to initialize app

import { DoneStepsProvider } from '../components/DoneStepsContext';

function _app({ Component, pageProps }) {
  return (
    <DoneStepsProvider>
      <Component {...pageProps} />
    </DoneStepsProvider>
  );
}

export default _app;