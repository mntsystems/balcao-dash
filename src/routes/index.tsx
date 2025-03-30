import React from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../pages/Loading";
import Login from "../pages/Login";
import Authenticated from "./Authenticated";

const App: React.FC = () => {
    return (
        <Routes>
            <Route index element={<Loading />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Authenticated />} />
        </Routes>
    );
};

export default App;
