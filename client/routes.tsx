import { lazy, Suspense } from 'react'
import { createRoutesFromElements, Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

const App = lazy(() => import('./components/App.tsx'))
const LogIn = lazy(() => import('./pages/LogIn.tsx'))
const MyTrips = lazy(() => import('./pages/MyTrips.tsx'))
const NewTrip = lazy(() => import('./pages/NewTrip.tsx'))
const Schedule = lazy(() => import('./pages/Schedule.tsx'))
const ViewDay = lazy(() => import('./pages/ViewDay.tsx'))
const MyProfile = lazy(() => import('./pages/MyProfile.tsx'))
const MyFriends = lazy(() => import('./pages/MyFriends.tsx'))
const SignUp = lazy(() => import('./pages/SignUp.tsx'))

function Loading() {
  return <div>Loading...</div>
}

function ProtectedComponent({ component }: { component: React.ComponentType }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  })
  return <Component />
}

export default createRoutesFromElements(
  <Route
    path="/"
    element={
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    }
  >
    <Route
      index
      element={
        <Suspense fallback={<Loading />}>
          <LogIn />
        </Suspense>
      }
    />
    <Route
      path="/sign-up"
      element={
        <Suspense fallback={<Loading />}>
          <SignUp />
        </Suspense>
      }
    />
    <Route
      path="/my-trips"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={MyTrips} />
        </Suspense>
      }
    />
    <Route
      path="/new-trip"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={NewTrip} />
        </Suspense>
      }
    />
    <Route
      path="/schedule"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={Schedule} />
        </Suspense>
      }
    />
    <Route
      path="/tripId/:id/date/:date"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={ViewDay} />
        </Suspense>
      }
    />
    <Route
      path="/my-profile"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={MyProfile} />
        </Suspense>
      }
    />
    <Route
      path="/my-friends"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={MyFriends} />
        </Suspense>
      }
    />
  </Route>,
)
