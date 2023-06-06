import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      clientId="Q9TkD6hAOvS4RDTUjypu2JAwFYH8xmb1"
      domain="harakeke-milo.au.auth0.com"
      authorizationParams={{
        redirect_uri: `${window.location.origin}`,
        audience: 'https://birds/api',
      }}
    >
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Router>
    </Auth0Provider>
  )
})
