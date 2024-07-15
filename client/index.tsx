import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import './styles/main.scss'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

if (!domain || !clientId || !audience) {
  throw new Error('Missing Auth0 environment variables')
}

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: { audience },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
