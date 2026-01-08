import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import App from './App.jsx'

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
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
            </ErrorBoundary>
    </React.StrictMode>,
)