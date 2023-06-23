import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback';

const element = document.getElementById('root');
const root = createRoot(element);

root.render(
    <React.StrictMode>
        <ErrorBoundary
            // error object and onReset function are passed automatically as props to whatever our fallback component is
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.replace('/')}
        >
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);
