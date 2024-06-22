import React from 'react'
  const Buttons:React.FC = (props: {undo?: (stack: ImageData[], data: ImageData) => void}) => {
  return (
    <div id='buttons'>
      <button id='undo'>Undo</button>
      <span>/</span>
      <button id='redo'>Redo</button>
    </div>
  )
}

export default Buttons
