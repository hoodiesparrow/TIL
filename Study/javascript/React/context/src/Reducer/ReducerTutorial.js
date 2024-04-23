import { useReducer, useCallback } from 'react'

const initialState = {
  count: 0
}

const counter = (state, action) => {
  switch(action.type) {
    case 'add':
      return {
        count: state.count + 1
      }
    case 'reset':
      return {
        count: 0
      }
    default:
      throw new Error()
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counter, initialState)
  const dispatchHandler = useCallback((type) => {
    dispatch({ type, value: state })
  })

  return [state, dispatchHandler]
  // return [state, dispatch]
}

export default Counter