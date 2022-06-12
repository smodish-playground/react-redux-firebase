import { useSelector } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import EventDetailsChat from './EventDetailsChat'
import EventDetailsHeader from './EventDetailsHeader'
import EventDetailsInfo from './EventDetailsInfo'
import EventDetailsSidebar from './EventDetailsSidebar'

export default function EventDetailsPage({ match }) {
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  )
}
