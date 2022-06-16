import { Grid } from 'semantic-ui-react'
import EventList from './EventList'

import { useSelector } from 'react-redux'

import LoadingComponent from '../../../app/layout/LoadingComponent'

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event)
  const { loading } = useSelector((state) => state.async)

  if (loading) return <LoadingComponent />

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>Event Filters</h3>
      </Grid.Column>
    </Grid>
  )
}
