import React,{useState, useContext, createContext, ReactNode} from "react";

interface ToolContext {
selectedTool: string,
setSelectedTool: (selectedTool: string) => void;    
isFill: boolean,
setIsFill: (isFill: boolean) => void;
color: string,
setColor: (color: string) => void;
roomId: string,
setRoomId: (roomId: string) => void;
}

interface Props {
    children: ReactNode
}
export const ToolsContext = createContext<ToolContext | null>(null)

export const ToolsContextProvider = ({ children }: Props) => {
    const [selectedTool, setSelectedTool] = useState<string>("circle");
    const [isFill, setIsFill] = useState(false); 
    const [brushSize, setBrushSize] = useState<number>(12);
    const [color, setColor] = useState<string>("black   ");
    const [roomId, setRoomId] = useState<string>('');
    return (
        <ToolsContext.Provider value={{selectedTool, setSelectedTool, isFill, setIsFill, color, setColor, roomId, setRoomId}}> 
        { children }
        </ToolsContext.Provider>
    )
}

export const useToolsContext = () => {
    const context = useContext(ToolsContext);
    if(!context) {
         throw new Error("Tools context is not properly used");
    } else {
        return context;
    }
}