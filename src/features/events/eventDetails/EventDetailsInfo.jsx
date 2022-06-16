import { useState } from 'react'
import { Grid, Segment, Icon, Button } from 'semantic-ui-react'
import format from 'date-fns/format'
import EventDetailsMap from './EventDetailsMap'

export default function EventDetailsInfo({ event }) {
  const [mapOpen, setMapOpen] = useState(false)

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(event.date, 'MMMM d, yyyy h:mm a')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              color="teal"
              size="tiny"
              content={mapOpen ? 'Hide Map' : 'Show Map'}
              onClick={() => setMapOpen(!mapOpen)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {mapOpen && <EventDetailsMap latLng={event.venue.latLng} />}
    </Segment.Group>
  )
}
