import { toast } from 'react-toastify'

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../../app/async/asyncReducer'
import { delay } from '../../app/common/util/util'

// constants
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

// "action creators"
export function increment(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart())
    try {
      await delay(1000)
      dispatch({ type: INCREMENT_COUNTER, payload: amount })
      dispatch(asyncActionFinish())
    } catch (error) {
      dispatch(asyncActionError(error))
    }
  }
}

export function decrement(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart())
    try {
      await delay(1000)
      throw 'oops'
    } catch (error) {
      dispatch(asyncActionError(error))
      toast.error(error)
    }
  }
}

// initial state
const initialState = { data: 42 }

// the reducer function
export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, data: state.data + action.payload }
    case DECREMENT_COUNTER:
      return { ...state, data: state.data - action.payload }
    default:
      return state
  }
}
