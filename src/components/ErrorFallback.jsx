
import React from 'react';

export function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div style={{ padding: '20px', color: 'red' }}>
            <h2>Une erreur est survenue</h2>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Réessayer</button>
        </div>
    )
}
