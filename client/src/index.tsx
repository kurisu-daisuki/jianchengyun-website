import React from 'react';
import { createRoot } from "react-dom/client";
import { HashRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { AppContainer } from '@lark-apaas/client-toolkit/components/AppContainer';
import { ErrorRender } from '@lark-apaas/client-toolkit/components/ErrorRender';

import RoutesComponent from "./app.tsx";
import './index.css';

const MainApp = () => {
  return (
    <HashRouter>
      <AppContainer defaultTheme="light">
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorRender error={error as Error} resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <RoutesComponent />
        </ErrorBoundary>
      </AppContainer>
    </HashRouter>
  );
};

createRoot(document.getElementById("root")!).render(<MainApp />);
