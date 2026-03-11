import React from 'react'

const ButtonComponent = ({btn_name, color}) => {
  return (
    <div>
      <button style={{backgroundColor: color, color:"white"}}>{btn_name}</button>
      <br />
      <br />
    </div>
  )
}

export default ButtonComponent
