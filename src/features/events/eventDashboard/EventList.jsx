import EventListItem from './EventListItem'

export default function EventList({ events, deleteEvent }) {
  return (
    <>
      {events.map((event) => (
        <EventListItem event={event} key={event.id} deleteEvent={deleteEvent} />
      ))}
    </>
  )
}
