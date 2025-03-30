import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../../pages/Home";
import { useAuth } from "../../auth";
import { observer } from "mobx-react";
import { Product } from "../../pages/Product";
import { User } from "../../pages/User";

const Authenticated: React.FC = observer(() => {
    const { user } = useAuth();
    const router = useNavigate();

    React.useEffect(() => {
        if (!user) {
            router("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route index path="/inicio" element={<Home />} />
            {/* Produtos */}
            <Route path="produto/detalhes/:id" element={<Product.Details />} />
            <Route path="/produtos" element={<Product.TableView />} />
            <Route
                path="/produto/editar/:id"
                element={<Product.CreateOrEdit />}
            />
            <Route path="/produto/criar" element={<Product.CreateOrEdit />} />
            {/* Usuário */}
            <Route path="/usuario/criar" element={<User.CreateOrEdit />} />
            <Route path="/usuario/editar/:id" element={<User.CreateOrEdit />} />
            <Route path="/usuario/detalhes/:id" element={<User.Details />} />
            <Route path="/usuario" element={<User.TableView />} />
        </Routes>
    );
});

export default Authenticated;
