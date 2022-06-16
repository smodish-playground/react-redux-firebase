import { Icon, Segment } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'

function Marker() {
  return <Icon name="marker" size="big" color="red" />
}

export default function EventDetailsMap({ latLng }) {
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: 300, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyARHansJBAxkfISxuzYzzTVpQ7OYjU0l6w' }}
          center={latLng}
          zoom={14}
        >
          <Marker lat={latLng.lat} lng={latLng.lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  )
}
