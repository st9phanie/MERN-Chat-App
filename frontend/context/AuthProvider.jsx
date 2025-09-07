import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        if (storedToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
            checkAuth();
        } else {
            delete axios.defaults.headers.common["Authorization"];
            setAuthUser(null);
        }

        return () => {
            if (socket?.connected) {
                socket.disconnect();
                setSocket(null);
            }
        };
    }, []);


    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");

            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const login = async (state, credentials) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}`, credentials);

            if (data.success) {
                setToken(data.token);
                setAuthUser(data.userData);
                localStorage.setItem("token", data.token);
                toast.success(data.message);
                connectSocket(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        if (socket?.connected) {
            socket.disconnect();
        }
        setSocket(null);
        toast.success("Logged out successfully");
    };

    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/update-profile", body);
            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const connectSocket = (userData) => {
        if (!userData || socket?.connected) return;

        const newSocket = io(backendUrl, {
            auth: {
                userId: userData._id,
            },
        });

        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds);
        });

        newSocket.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
            toast.error("Socket connection failed");
        });
    };

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
