import { useSelector } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'

import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService'
import { listenToEvents } from '../eventActions'

import EventDetailsChat from './EventDetailsChat'
import EventDetailsHeader from './EventDetailsHeader'
import EventDetailsInfo from './EventDetailsInfo'
import EventDetailsSidebar from './EventDetailsSidebar'
import LoadingComponent from '../../../app/layout/LoadingComponent'

export default function EventDetailsPage({ match }) {
  const dispatch = useDispatch()
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )
  const { loading } = useSelector((state) => state.async)

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  })

  if (loading || !event) {
    return <LoadingComponent inverted={true} content="Loading Event ..." />
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  )
}
