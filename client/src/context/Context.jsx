import { children, createContext, useContext, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);

    const verifyUser = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/user/auth", {
                withCredentials: true,
            });
    
            // Check if response contains data and status is 200
            if (res.status === 200 && res.data) {
                setIsAuth(true);
                setUser(res.data); // Set user with data from the response
            } else {
                setIsAuth(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Verification failed:", error.response?.data || error.message);
            setIsAuth(false);
            setUser(null); // Reset user in case of an error
        }
    };

    const logoutUser = async () => {    
        let res = await axios.post("http://localhost:3000/api/user/logout");
        if(res.status === 200){
            setIsAuth(false);
            setUser(null);
        }

    }

    return (
        <AuthContext.Provider value={{isAuth, user, verifyUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}