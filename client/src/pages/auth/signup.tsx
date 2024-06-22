import {useState, useEffect} from 'react'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../components/context/AuthContext';
    export const SignUp = () => {
        const navigate = useNavigate();
        const {isLoggedIn} = useAuthContext();
        const [email, setEmail] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState<string | null>(null);
            useEffect(() => {
                if (isLoggedIn) {
                    navigate('/');
                } 
            }, []);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);
        
            try {
            const response = await axios.post('/signup', {
                name: username,
                email,
                password,
            });
        if(response) {
            const { token, refreshToken } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);

            navigate('/');
        }
            } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Signup failed');
            } else {
                setError('An unknown error occurred');
            }
            }
        };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                required
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-black"
                />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              <Link to="/login" className="text-gray-700 hover:underline" >Log in</Link>

            </div>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-700 focus:outline-none"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    )
}