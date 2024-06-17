import { useState, useEffect, createContext, ReactNode, useContext} from 'react';

interface IAuthContext {
    user: IUser,
    setUser: (user: IUser) => void
}
interface props {   
    children: ReactNode
}
interface IUser {
    userId: string,
    email: string,
    boardId: string
}
export const AuthContext = createContext<IAuthContext | null>(null);
    
export const AuthContextProvider = ({children}: props) => {
    const [user, setUser] = useState<IUser>({
        userId: '',
        email: '',
        boardId: ''
    })
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(context) {
        return context
    } 
    throw new Error("Auth context is not properly used");
}