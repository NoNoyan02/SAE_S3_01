import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import des styles globaux
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {

            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        },
    },
})

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error("ERREUR CRITIQUE : L'élément <div id='root'> est introuvable dans index.html.")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
)
