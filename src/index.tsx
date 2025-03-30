import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./routes";
import { AuthProvider } from "./auth";
import { GlobalStoreProvider } from "./context";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                    <GlobalStoreProvider>
                        <Routes>
                            <Route path="*" element={<App />} />
                        </Routes>
                    </GlobalStoreProvider>
                </AuthProvider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
