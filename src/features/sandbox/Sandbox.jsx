import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { increment, decrement } from './testReducer'
import { openModal } from '../../app/common/modals/modalReducer'
import TestPlaceInput from './TestPlaceInput'
import TestMap from './TestMap'

const initialValues = {
  center: {
    lat: 26.5881,
    lng: -80.1044,
  },
  zoom: 11,
}

export default function Sandbox() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.test.data)
  const [location, setLocation] = useState(initialValues)

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: latLng })
  }

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button
        content="Increment"
        color="green"
        onClick={() => dispatch(increment(20))}
      />
      <Button
        content="Decrement"
        color="red"
        onClick={() => dispatch(decrement(15))}
      />
      <Button
        content="Open Modal"
        color="teal"
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </>
  )
}
