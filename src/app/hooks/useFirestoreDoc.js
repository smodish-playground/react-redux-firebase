import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { dataFromSnapshot } from '../firestore/firestoreService'
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from '../async/asyncReducer'

export default function useFirestoreCollection({ query, data, deps }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncActionStart())
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: 'not-found',
              message: 'Could not find document',
            })
          )
          return
        }
        data(dataFromSnapshot(snapshot))
        dispatch(asyncActionFinish())
      },
      (error) => dispatch(asyncActionError(error))
    )

    return () => unsubscribe

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
