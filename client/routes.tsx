import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import { LogIn } from './pages/LogIn.tsx'
import { MyTrips } from './pages/MyTrips.tsx'
import { NewTrip } from './pages/NewTrip.tsx'
import { Schedule } from './pages/Schedule.tsx'
import { ViewDay } from './pages/ViewDay.tsx'
import { MyProfile } from './pages/MyProfile.tsx'
import { MyFriends } from './pages/MyFriends.tsx'
export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* Could refactor ^ this to use Layout */}
    <Route index element={<LogIn />} />
    <Route path="/my-trips" element={<MyTrips />} />
    <Route path="/new-trip" element={<NewTrip />} />
    <Route path="/schedule" element={<Schedule />} />
    <Route path="/view-day/:id" element={<ViewDay />} />
    <Route path="/my-profile" element={<MyProfile />} />
    <Route path="/my-friends" element={<MyFriends />} />
  </Route>,
)
