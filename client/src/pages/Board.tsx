import React,{useRef, useEffect, useState} from 'react'
import { nanoid } from 'nanoid';
import { undo } from '../components/utilities/UndoRedo'
import { drawCircle, drawTriangle, drawLine, drawRect } from '../components/functions/DrawShapes'
import ToolBar from '../components/ToolBar';
import { Socket  } from 'socket.io-client';
import { mouseDown,mouseMove,eMouseUp } from '../components/functions/Functions';
import { useToolsContext } from '../components/context/ToolsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../components/context/AuthContext';
import axios from 'axios';
interface BoardProps {
  socket: Socket;
}

const Board:React.FC<BoardProps> = ({ socket }) => {
  const {boardId} = useParams();
  const {roomId, setRoomId} = useToolsContext();
  const {user, setUser} = useAuthContext();
  const navigate = useNavigate()
  const hello = "hello"
  if(socket) {
    socket.emit('hello', hello)
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas = canvasRef.current
  const context = canvas?.getContext('2d')
  let stack: ImageData[] = [];
  let data: ImageData | undefined;
  const { selectedTool, setSelectedTool, color, isFill } = useToolsContext();
  const [nanoUrl, setNanoUrl] = useState<string>('');
  const [temp, setTemp] = useState(true)
  // const [selectedTool, setSelectedTool] = useState<string>('circle')
  const [shapes, setShapes] = useState<IShape[] >([]);
  const [isDrawing, setIsDrawing] = useState(false)
  const [snapping, setSnapping] = useState<ImageData | undefined>(undefined);
  const [stateStack, setStateStack] = useState<ImageData[]>([])
  const [index, setIndex] = useState<number>(-1);
  const [currCords, setCurrCords] = useState<{ x: number; y: number}>({
    x: 0,
    y: 0,
  });
  const [prevCords, setPrevCords] = useState<{ x: number; y: number}>({
    x: 0,
    y: 0,
  });
  let prevX:number, prevY: number;
    function handleMove(e: React.MouseEvent) {
      // console.log(e.nativeEvent.offsetX);
      if(isDrawing){
      drawing(e)
      }
    }


    function handleDrawing (e: React.MouseEvent) {
      setIsDrawing(true)
      // prevX = e.nativeEvent.offsetX;
      // prevY = e.nativeEvent.offsetY;
      const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    setPrevCords({ x, y });
      console.log("saet", prevCords)
      const context = canvas?.getContext('2d')
      context?.beginPath();      
      const width = canvas?.width ?? 0;
      const height = canvas?.height ?? 0;
      setSnapping(context?.getImageData(0, 0, width, height))
      // undo function
    const data = context?.getImageData(0, 0, width, height);
    if(selectedTool != 'select'){
      if(data){
        setStateStack(prevState => [...prevState, data]);
       }
      }
      if(selectedTool === 'select'){
       mouseDown(e, shapes)
    }
    }
useEffect(()=> {
  console.log(stateStack)
  
  setIndex(prevIndex => prevIndex + 1);
  if(canvas){
    socket.emit('draw', canvas.toDataURL());
    }
},[stateStack])
useEffect(() => {
  setNanoUrl(nanoid())
},[])
// useEffect(() => {
//   if(canvas){
//   socket.emit('draw', canvas.toDataURL());
//   }
// }, [index])
    function handleUndo() {
      // yet to improve as currently its not handling condition where its empty
      if(stateStack.length === 1 && canvas && context) {
        context.fillStyle = '#fff'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
      } else {
        let num = stateStack[stateStack.length -1]
        context?.putImageData(num, 0, 0);
        setStateStack(prevState => {
          // Create a new array excluding the last element
          const newState = [...prevState.slice(0, -1)];
          return newState;
        });
        
      }
    }

    // will pass function as depedency in the useEffect and will remove the initial useEffect as that is not working properly guess what I need to learn more about hooks
    function handleCanvaSize () { 
      const canvas = canvasRef.current
      if(canvas) {
      canvas.width = canvas?.offsetWidth
      canvas.height = canvas?.offsetHeight
      console.log("dekh", canvas?.offsetWidth )
      }
    }
    // to give canvas a default white color
    useEffect(()=> {
      const context = canvas?.getContext('2d')
      if(context){
        context.fillStyle = '#fff'
        context?.fillRect(0, 0, context.canvas.width, context.canvas.height)  
        console.log(context.canvas.width)
        console.log("Yyes")
      }
    },[context])
    function drawing (e: React.MouseEvent) {
      const context = canvas?.getContext('2d')
      if(snapping){
      context?.putImageData(snapping, 0, 0);
      }
      // let selectedTool = 'rectangle';
      if(context) {
        if(selectedTool === 'brush'){
        context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        context.strokeStyle = color;
        context.stroke();
        } else if(selectedTool === 'rectangle'){
          drawRect(e,prevCords,context, isFill, color);
        } else if(selectedTool === 'circle'){
          drawCircle(e, prevCords,context,isFill ,color)
        } else if(selectedTool === 'triangle'){
          drawTriangle(e, prevCords, context, isFill, color)
        } else if(selectedTool === 'line'){
          drawLine(e, prevCords, context, color)
        } else {
          console.log("unvalid entry")
        }
      }
    }

   
    // canvas resize
    window.addEventListener('resize', handleCanvaSize);
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if(context){
        context.fillStyle = '#fff'
        context?.fillRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = '#272727'
        context.fillRect(10, 10, 100, 50)
        console.log(context.canvas.width)
        console.log("yes")
      }
      console.log("no")
    }, [])
    useEffect(()=> {
      const token = localStorage.getItem('token');
        axios.get('/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
              },
        })
        .then((res) => {

            setUser({userId: res.data._id, email: res.data.email, boardId: res.data.boardId})
            console.log('res', res.data)
            socket.emit('room-joined', {userId: res.data._id, roomId: res.data.boardId})
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
          });
      handleCanvaSize()
    },[])
    function handleMouseUp (e: React.MouseEvent) {
      const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
      setCurrCords({x , y})
      if(canvas){
        socket.emit('draw', {data:canvas.toDataURL(), boardId: boardId, userId: user.userId});
      }
      setIsDrawing(false)
      if(selectedTool !== 'select'){
      setTemp(!temp)
      }
    }
    socket.on('draw', (dataUrl) => {
      if(canvasRef.current){
      const image = new Image();
      image.src = dataUrl;
      image.onload = () => {
        context?.drawImage(image, 0, 0);
      };
      }
    });
    useEffect(()=> {
      const shape = {
        x: prevCords.x,
        y: prevCords.y,
        width: currCords.x - prevCords.x,
        height: currCords.y - prevCords.y,
        color: 'black'
      }
      setShapes(prevShapes => [...prevShapes, shape]);
    },[temp])  
    useEffect(()=> {
      console.log("shapes", shapes)
    },[shapes])

    // donot remove this useEffect as without it the shape is being set twice as an empty object
    useEffect(()=> {
      setShapes([])
    },[])
  return (
    <>
    <div className='test relative'>
    <div id='board'>
        <canvas
        onMouseDown={handleDrawing}
        onMouseUp={selectedTool === 'select' ? eMouseUp : handleMouseUp} 
        onMouseMove={selectedTool === 'select' && context && canvas ? (e)=> mouseMove(context, canvas,e,shapes) : handleMove} ref={canvasRef} width="100%" height="100%"  />
    </div>
    
    {/* // onMouseMove={(e)=> handleMove(e)} ref={canvasRef} width="100%" height="100%"/> */}
    {/* <div id='buttons'>
    <button onClick={handleUndo} id='undo'>Undo</button>
    <span>/</span>
    <button id='redo'>Redo</button>
  </div>
  <div className="input">
    <input type="color" name="color" id="color"/>
  </div> */}
  <div className='absolute bottom-10 left-1/2 translate-x-[-50%]'>
  <ToolBar />
  </div>
  </div>

    {/* <div>
      <button onClick={()=> setSelectedTool('select')}>selected tool</button>
    </div> */}

  </>
  )
}

export default Board
