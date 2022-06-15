/* global google */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import { createEvent, updateEvent } from '../eventActions'
import cuid from 'cuid'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MySelectInput from '../../../app/common/form/MySelectInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MyDateInput from '../../../app/common/form/MyDateInput'
import { categoryData } from '../../../app/api/categoryOptions'
import MyPlaceInput from '../../../app/common/form/MyPlaceInput'

export default function EventForm({ match, history }) {
  const dispatch = useDispatch()

  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )

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

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: 'Bob',
                  attendees: [],
                  hostPhotoURL: '/assets/user.png',
                })
              )
          history.push('/events')
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
    </Segment>
  )
}
