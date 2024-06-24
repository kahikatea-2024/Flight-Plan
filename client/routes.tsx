import { lazy, Suspense } from 'react'
import { createRoutesFromElements, Route } from 'react-router-dom'

const App = lazy(() => import('./components/App.tsx'))
const LogIn = lazy(() => import('./pages/LogIn.tsx'))
const MyTrips = lazy(() => import('./pages/MyTrips.tsx'))
const NewTrip = lazy(() => import('./pages/NewTrip.tsx'))
const Schedule = lazy(() => import('./pages/Schedule.tsx'))
const ViewDay = lazy(() => import('./pages/ViewDay.tsx'))
const MyProfile = lazy(() => import('./pages/MyProfile.tsx'))
const MyFriends = lazy(() => import('./pages/MyFriends.tsx'))
const SignUp = lazy(() => import('./pages/SignUp.tsx'))

export default createRoutesFromElements(
  <Route
    path="/"
    element={
      <Suspense>
        <App />
      </Suspense>
    }
  >
    {/* Could refactor ^ this to use Layout */}
    <Route
      index
      element={
        <Suspense>
          <LogIn />
        </Suspense>
      }
    />
    <Route
      path="/sign-up"
      element={
        <Suspense>
          <SignUp />
        </Suspense>
      }
    />

    <Route
      path="/my-trips"
      element={
        <Suspense>
          <MyTrips />
        </Suspense>
      }
    />
    <Route
      path="/new-trip"
      element={
        <Suspense>
          <NewTrip />
        </Suspense>
      }
    />
    <Route
      path="/schedule"
      element={
        <Suspense>
          <Schedule />
        </Suspense>
      }
    />
    <Route
      path="/date/:date"
      element={
        <Suspense>
          <ViewDay />
        </Suspense>
      }
    />
    <Route
      path="/my-profile"
      element={
        <Suspense>
          <MyProfile />
        </Suspense>
      }
    />
    <Route
      path="/my-friends"
      element={
        <Suspense>
          <MyFriends />
        </Suspense>
      }
    />
  </Route>,
)
