import { nanoid } from "nanoid"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../components/context/AuthContext";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import axios from "axios";
import { useToolsContext } from "../components/context/ToolsContext";

interface BoardProps {
    socket: Socket;
  }
export const Home:React.FC<BoardProps> = ({socket}) => {

    const {roomId, setRoomId} = useToolsContext();
    const navigate = useNavigate();
    const {user, setUser} = useAuthContext()
    useEffect(() => {
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
    },[])

    useEffect(() => {
            
    },[user])

    const handleButton = ()=> {
        // setRoomId(boardId);
        navigate(user.boardId);
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <button onClick={handleButton} className="px-10 py-4 text-lg bg-[#0000FF] text-white font-medium rounded-md hover:bg-[#77CCFF] hover:text-[#232323] transition-all ">Create Board</button>
        </div>
    )
}
export default Home;