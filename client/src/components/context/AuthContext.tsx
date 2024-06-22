import { useState, useEffect, createContext, ReactNode, useContext, FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
interface IAuthContext {
  user: IUser;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
  isLoggedIn: boolean;
}

interface Props {
  children: ReactNode;
}

interface IUser {
  userId: string;
  email: string;
  boardId: string;
}

const initialUser: IUser = {
  userId: '',
  email: '',
  boardId: ''
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>(initialUser);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [fetchCount, setFetchCount] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUser = async (): Promise<void> => {
      try {
        const response = await axios.post('/me',{}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if(response.status === 200) {
          setLoading(false);
        }
        setUser(response.data);  
      } catch (error) { 
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          const newToken = await refreshToken();
          if (newToken) {
            localStorage.setItem('token', newToken);
            setIsLoggedIn(true)
          } else {
            logout(); 
            setIsLoggedIn(false);
            setLoading(false);
            return;
          }
        } else {
          setLoading(false);
          setIsLoggedIn(false);
        }
        setLoading(false);
      }
    };
    fetchUser()
  },[])    

  const login = async (email: string, password: string) => {
    const response = await axios.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(initialUser);
  };

  const refreshToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const response = await axios.post('/refresh-token', { refreshToken });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      return newToken;
    }
    return null;
  };

  const contextValue: IAuthContext = {
    user,
    login,
    logout,
    refreshToken,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context is not properly used");
  }
  return context;
};
