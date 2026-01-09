import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { ErrorFallback } from './components/ErrorFallback.jsx'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error("ERREUR CRITIQUE : L'élément root est introuvable.")
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
            </ErrorBoundary>
        </QueryClientProvider>
    </React.StrictMode>,
)