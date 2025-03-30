import { Role, UserToken } from "./interfaces";
import { showErrorToast } from "./toast";

const checkIfIsAdmin: () => boolean = () => {
    const userJSON = localStorage.getItem("userInfo");
    if (!userJSON) {
        return false;
    }
    try {
        const user: UserToken = JSON.parse(userJSON);
        return user.roles.some((item) => item === Role.ADMIN);
    } catch (error) {
        showErrorToast("Você não tem permissão.", "Acesso Negado");
        return false;
    }
};

export { checkIfIsAdmin };
