import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'

import { useSelector } from 'react-redux'

// import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import EventFilters from './EventFilters'
import { getEventsFromFirestore } from '../../../app/firestore/firestoreService'

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event)
  const { loading } = useSelector((state) => state.async)

  useEffect(() => {
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot) => console.log(snapshot.docs.map((doc) => doc.data())),
      error: (error) => console.error(error),
    })
    return unsubscribe
  }, [])

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  )
}
