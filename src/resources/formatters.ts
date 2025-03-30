import moment from "moment";
import { Role } from "./interfaces";

const formatters = {
    cpf: (v: string) => {
        v = v.replace(/\D/g, "");

        if (v.length <= 11) {
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
            v = v.replace(/^(\d{2})(\d)/, "$1.$2");
            v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
            v = v.replace(/(\d{4})(\d)/, "$1-$2");
        }
        return v;
    },
    onlyNumbers: (numero: string) => {
        numero = numero.replace(/\D/g, "");
        return numero;
    },
    formatPhoneNumber: (value: string) => {
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");

        return value;
    },
    cutLongStrings: (description: string, maxCaracter = 12) =>
        description.length > maxCaracter
            ? description.slice(0, maxCaracter) + "..."
            : description,
    currencyForBR: (value: string) => {
        value = value.replace(/\D/g, "");
        value = "R$ " + value;
        value = value.replace(/(\d+)(\d{2})$/, "$1,$2");
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return value;
    },
    date: (date: Date | null | undefined) =>
        `${moment(date).format("DD/MM/YYYY")}`,
    getImageIdFromUrl: (url: string): string | null => {
        const regex = /\/([a-f0-9-]+)\/[^/]+$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    },
    formatDate: (value: string) => {
        let cleaned = value.replace(/\D/g, "");
        if (cleaned.length > 8) {
            cleaned = cleaned.slice(0, 8);
        }

        let formatted = cleaned;
        if (cleaned.length > 2) {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        if (cleaned.length > 4) {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
                2,
                4
            )}/${cleaned.slice(4)}`;
        }

        return formatted;
    },
    translateRoleEnum: (roles: Role[]): string[] => {
        return roles.map((role) => {
            switch (role) {
                case Role.USER:
                    return "Usuário";
                case Role.ADMIN:
                    return "Administrador";
                case Role.TECH:
                    return "Técnico";
                case Role.EMPLOYEE:
                    return "Funcionário";
                default:
                    return "Não definido";
            }
        });
    },
};

export { formatters };
