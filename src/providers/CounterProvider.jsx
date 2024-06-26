import React, { createContext, useState } from 'react'

export const counter = createContext()

export function CounterProvider( { children } ) {
  const [value, setValue]  = useState(0)

  return (
    <counter.Provider value={[value, setValue]}>
        { children }
    </counter.Provider>
  )
}
