/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { createContext, useContext, ReactNode } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../resources/api";
import { Login, UserToken } from "../resources/interfaces";

interface AuthContextType {
    login: (loginData: Login, onSuccess: () => void) => void;
    logout: () => void;
    user?: UserToken;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useNavigate();

    let user =
        typeof window !== "undefined" &&
        typeof window.localStorage !== "undefined"
            ? JSON.parse(localStorage.getItem("userInfo") as string)
            : "";

    const toast = useToast();

    const login = async (loginData: Login, onSuccess: () => void) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance().post(`/auth/login`, {
                ...loginData,
            });
            if (response.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(response.data));
                onSuccess();
            }
        } catch (error: any) {
            toast({
                title: "Login Falhou",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        router("/login");
        localStorage.removeItem("userInfo");
        user = "";
    };

    return (
        <AuthContext.Provider value={{ login, logout, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
