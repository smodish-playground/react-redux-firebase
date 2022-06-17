/* global google */
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import { listenToEvents } from '../eventActions'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MySelectInput from '../../../app/common/form/MySelectInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MyDateInput from '../../../app/common/form/MyDateInput'
import { categoryData } from '../../../app/api/categoryOptions'
import MyPlaceInput from '../../../app/common/form/MyPlaceInput'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventOnFirestore,
} from '../../../app/firestore/firestoreService'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Confirm } from 'semantic-ui-react'

export default function EventForm({ match, history }) {
  const dispatch = useDispatch()
  const [loadingCancel, setLoadingCancel] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )

  const { loading, error } = useSelector((state) => state.async)

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: { address: '', latLng: null },
    venue: { address: '', latLng: null },
    date: '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required('You must provide a city'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('You must provide a venue'),
    }),
    date: Yup.string().required(),
  })

  async function handleCancelToggle(event) {
    setConfirmOpen(false)
    setLoadingCancel(true)
    try {
      await cancelEventToggle(event)
      setLoadingCancel(false)
    } catch (error) {
      setLoadingCancel(true)
      toast.error(error.message)
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  })

  if (loading) {
    return <LoadingComponent inverted={true} content="Loading Event ..." />
  }

  if (error) return <Redirect to="/error" />

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventOnFirestore(values)
              : await addEventToFirestore(values)
            setSubmitting(false)
            history.push('/events')
          } catch (error) {
            toast.error(error.message)
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput placeholder="Event title" name="title" />
            <MySelectInput
              placeholder="Category"
              name="category"
              options={categoryData}
            />
            <MyTextArea placeholder="Description" name="description" rows={3} />

            <Header sub color="teal" content="Event Location Details" />
            <MyPlaceInput placeholder="City" name="city" />
            <MyPlaceInput
              disabled={!values.city.latLng}
              placeholder="Venue"
              name="venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment'],
              }}
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? 'green' : 'red'}
                content={
                  selectedEvent.isCancelled
                    ? 'Reactivate event'
                    : 'Cancel event'
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events/"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? 'This will reactivate the event - are you sure?'
            : 'This will cancel the event - are you sure?'
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  )
}
