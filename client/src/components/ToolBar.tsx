import React, { ChangeEvent, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { CircleIcon, SquareIcon, TriangleIcon } from './utilities/Shapes'
import { useToolsContext } from './context/ToolsContext'
// import { useTestContext } from './context/TestContext'
import { faHandshake } from '@fortawesome/free-regular-svg-icons'
import { faShapes } from '@fortawesome/free-solid-svg-icons'
const ToolBar:React.FC = () => {
  const { selectedTool, setSelectedTool, isFill, setIsFill, color, setColor } = useToolsContext();
  const [isShapesOpen, setIsShapesOpen] = useState(false);
  const handleSetTool = (tool: string) => {
    setSelectedTool(tool);
  }

  const handleIsfill = () =>  {
    setIsFill(!isFill);
  }

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };


  return (
    <div>
      {isShapesOpen && (
 <div className="shapes-container p-2 grid grid-cols-4 place-items-center border-2 w-fit mb-2 ml-14 rounded-xl">
 <div className={`box ${selectedTool === 'circle' ? 'selected' : ''}`}>
 <CircleIcon  setTool={handleSetTool}/>
 </div>
 <div className={`box ${selectedTool === 'triangle' ? 'selected' : ''}`}>
 <TriangleIcon setTool={handleSetTool}/>
 </div>
 <div id='square-shape-right-border' className={`box ${selectedTool === 'rectangle' ? 'selected' : ''}`}>
 <SquareIcon setTool={handleSetTool} />
 </div>
 <div className={`h-8 w-8 ml-2 border-4 border-black cursor-pointer`} onClick={handleIsfill} style={{ backgroundColor: isFill ? color : '' }}>
      </div>
</div>
    )}
    <div id='toolbar' className=' border-2 w-fit p-2 flex justify-center items-center rounded-xl'>
      <div className='grid grid-cols-5 place-items-center'>
      <div id='select' className={`box ${selectedTool === 'select' ? 'selected' : ''}`}>  
      <FontAwesomeIcon className='icon cursor-pointer' onClick={() => handleSetTool("select")} icon={icon({name: 'arrow-pointer', family: 'classic', style: 'solid'})} />
      </div>
      <div id='brush' className={`box ${selectedTool === 'brush' ? 'selected' : ''}`}>
      <FontAwesomeIcon className='icon cursor-pointer' onClick={() => handleSetTool("brush")} icon={icon({name: 'pen', family: 'classic', style: 'solid'})} />
      </div>
      <div>
      <FontAwesomeIcon onClick={()=> setIsShapesOpen(!isShapesOpen)} className='icon cursor-pointer' icon={faShapes} />
      </div>
      <div className="bg-transparent box">
        <input className='bg-transparent' type="color" onChange={handleColorChange} value={color} name="color" id="color"/>
      </div>
      
      </div>
    </div>
    
   
  </div>
  )
}

export default ToolBar
