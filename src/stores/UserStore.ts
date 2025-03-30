/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { axiosInstance } from "../resources/api";
import { showErrorToast, showSuccessToast } from "../resources/toast";
import { User } from "../resources/interfaces";
import { userSchema } from "../pages/User/CreateOrEdit";

export default class UserStore {
    public loader = false;
    public image: any | null = null;
    public userList: User[] = [];
    public user: User | null = null;
    public search: string | null = null;
    public page = 1;
    public hasNextPage = false;

    public get headers() {
        return ["Nome", "Email", "Cargo", "Criado em:", ""];
    }

    private get userFilter() {
        return {
            params: {
                page: this.page,
                name: this.search,
            },
        };
    }

    constructor() {
        makeAutoObservable(this);
    }

    public createOrEditUser = async (
        data: userSchema,
        onSuccess: () => void,
        id?: string
    ) => {
        this.loader = true;
        try {
            if (id) {
                await axiosInstance().put(`/user/${id}`, {
                    name: data.nome,
                    email: data.email,
                });
                showSuccessToast("Usuário editado com sucesso!!");
                onSuccess();
            } else {
                await axiosInstance().post("/user", {
                    name: data.nome,
                    email: data.email,
                    password: data.password,
                    roles: [data.roles],
                });
                showSuccessToast("Usuário cadastrado com sucesso!");
                onSuccess();
            }
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public handlePage = (prev: boolean) => {
        if (prev) {
            this.page = --this.page;
            return;
        }
        this.page = ++this.page;
    };

    public getUsers = async () => {
        this.loader = true;
        try {
            const request = await axiosInstance().get("/user", this.userFilter);
            this.userList = (await request.data.users) as User[];
            this.hasNextPage = request.data.hasNextPage as boolean;
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public getUserById = async (id: string): Promise<User | void> => {
        this.loader = true;
        try {
            const request = await axiosInstance().get<User>(`/user/${id}`);
            this.user = request.data;
            return request.data;
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };

    public deleteUser = async (id: string, onSuccess: () => void) => {
        this.loader = true;
        try {
            if (this.user?.id === id) {
                return showErrorToast(
                    "Você não pode a pagar a própia conta.",
                    "Ops... Algo deu errado. 😥"
                );
            }
            await axiosInstance().delete(`/user/${id}`);
            onSuccess();
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };
}
