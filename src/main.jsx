import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ErrorBoundary } from 'react-error-boundary'

import App from './App.jsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
        },
    },
})

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div style={{ padding: '20px', color: 'red' }}>
            <h2>Une erreur est survenue</h2>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Réessayer</button>
        </div>
    )
}

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error("ERREUR CRITIQUE : L'élément root est introuvable.")
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>

            </QueryClientProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)