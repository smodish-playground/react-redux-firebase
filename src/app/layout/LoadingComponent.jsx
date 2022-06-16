import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'

export default function LoadingComponent({
  inverted = true,
  content = 'Loading...',
}) {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content} />
    </Dimmer>
  )
}
