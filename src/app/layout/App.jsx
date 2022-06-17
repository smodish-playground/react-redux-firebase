import { Route, useLocation } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import NavBar from '../../features/nav/NavBar'

import HomePage from '../../features/home/HomePage'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import EventDetailsPage from '../../features/events/eventDetails/EventDetailsPage'
import EventForm from '../../features/events/eventForm/EventForm'
import Sandbox from '../../features/sandbox/Sandbox'
import ErrorComponent from '../common/errors/ErrorComponent'
import ModalManager from '../common/modals/ModalManager'
import { ToastContainer } from 'react-toastify'

function App() {
  const { key } = useLocation()
  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route exact path="/sandbox" component={Sandbox} />
              <Route path="/events/:id" component={EventDetailsPage} />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              <Route path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default App
