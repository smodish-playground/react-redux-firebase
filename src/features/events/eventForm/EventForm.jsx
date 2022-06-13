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

export default function EventForm({ match, history }) {
  const dispatch = useDispatch()

  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
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
          <MyTextInput placeholder="City" name="city" />
          <MyTextInput placeholder="Venue" name="venue" />
          <MyDateInput
            placeholderText="Date"
            name="date"
            timeFormat="HH:mm"
            showTimeSelect
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm a"
          />

          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            as={Link}
            to="/events/"
            type="submit"
            floated="right"
            content="Cancel"
          />
        </Form>
      </Formik>
    </Segment>
  )
}
