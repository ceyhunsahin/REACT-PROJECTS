import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Error() {
    const error = useRouteError()
    console.log("errrrrroooor" , error)
    return (
        <div>
            <h1> Sorry, {error.message}</h1>
            <pre> {error.status} - {error.statusText}</pre>
            
        </div>
    )
}