import { Grid } from 'semantic-ui-react'
import EventDetailsChat from './EventDetailsChat'
import EventDetailsHeader from './EventDetailsHeader'
import EventDetailsInfo from './EventDetailsInfo'
import EventDetailsSidebar from './EventDetailsSidebar'

export default function EventDetailsPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader />
        <EventDetailsInfo />
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar />
      </Grid.Column>
    </Grid>
  )
}
