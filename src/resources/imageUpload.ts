/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const uploadImage = async (formData: FormData) => {
    try {
        const response = await axios.post<string>("/image/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkM2M1ODI1ZS02YWFkLTQ3YTAtYTA1Mi1mNWI3N2I2MzdkNjUiLCJ1c2VybmFtZSI6ImZpc2giLCJpYXQiOjE3MTUyNzgzNTMsImV4cCI6MTcxNTM2NDc1M30.OV52zjNF0xbcgi2TO3MHvpjAACm5coasOaLH7lWXkyE",
            },
        });

        return response.data; // Retorna a URL da imagem
    } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        throw error;
    }
};
