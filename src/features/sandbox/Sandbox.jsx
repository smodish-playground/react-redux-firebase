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
  const [target, setTarget] = useState(null)
  const data = useSelector((state) => state.test.data)
  const { loading } = useSelector((state) => state.async)
  const [location, setLocation] = useState(initialValues)

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: latLng })
  }

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button
        name="increment"
        loading={loading && target === 'increment'}
        content="Increment"
        color="green"
        onClick={(e) => {
          dispatch(increment(20))
          setTarget(e.target.name)
        }}
      />
      <Button
        name="decrement"
        loading={loading && target === 'decrement'}
        content="Decrement"
        color="red"
        onClick={(e) => {
          dispatch(decrement(15))
          setTarget(e.target.name)
        }}
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
