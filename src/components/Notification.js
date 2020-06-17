import React, {useEffect } from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }


if (message.endsWith('ed'))
  return (
    <div className="success">
      {message+' on server'}
    </div>
  )

if (message.length)
  return (
    <div className="error">
      {message}
    </div>
  )

return null

}


export default Notification