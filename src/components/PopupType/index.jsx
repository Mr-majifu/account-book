


import { useState } from "react"
import Popup from "zarm"



const PopupType = () => {

  const [show ,setShow] = useState(false)


  return (
    <Popup
      visible={show}
    >

    </Popup> 
  )
}