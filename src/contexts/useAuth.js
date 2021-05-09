import React, {
    useContext,
    createContext,
    useEffect,
    useCallback,
    useState,
} from "react";
import axios from "axios";

const TOKEN_NAME = "access-token";
const LIST_API = {
    LOGIN: "",
};

const AuthContext = createContext();

function AuthValue() {
    // const { onPost: loginUser }
    // const [isAuth, setIsAuth] = useState(!!localStorage.getItem(TOKEN_NAME));
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    const login = async (auth) => {
        setIsAuth(true) 
        setCurrentUser(auth.user)
    };

    const getToken = useCallback(() => {
        const token = localStorage.getItem(TOKEN_NAME);
        const result = `Barer ${token}`;
        return result;
    });

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_NAME);
        setIsAuth(false);
        return {
            message: "Goodbye",
        };
    });

    const fetchCurrentUser = useCallback(async () => {
    });

    useEffect(() => {
        fetchCurrentUser();
    }, [isAuth]);

    return {
        isAuth,
        login,
        logout,
        getToken,
        currentUser,
    };
}

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    return (
        <AuthContext.Provider value={AuthValue()}>
            {children}
        </AuthContext.Provider>
    );
}
