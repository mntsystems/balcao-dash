/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { axiosInstance } from "../resources/api";
import { showErrorToast, showSuccessToast } from "../resources/toast";
import {
    AddProduct,
    HomeStatistic,
    Order,
    OrderStatus,
} from "../resources/interfaces";

export default class OrderStore {
    public userId = "";
    public loader = false;
    public orderList: Order[] = [];
    public order: Order | null = null;
    public productImageUrl = "";
    public page = 1;
    public createdAt: Date | null = null;
    public hasNextPage = false;
    public homeData: HomeStatistic | null = null;
    public selectedProducts: AddProduct[] = [];

    // Query
    public search: string | null = null;
    public status: OrderStatus | null = null;
    public date: Date | null = null;

    private get orderFilter() {
        return {
            params: {
                page: this.page,
                nome: this.search,
                date: this.date,
                status: this.status,
            },
        };
    }

    public get headers() {
        return ["Nome", "Email", "Valor Total", "Situação", "Criado em:", ""];
    }

    constructor() {
        makeAutoObservable(this);
    }

    public handlePage = (prev: boolean) => {
        if (prev) {
            this.page = --this.page;
            return;
        }
        this.page = ++this.page;
    };

    public getOrders = async () => {
        this.loader = true;
        try {
            const request = await axiosInstance().get(
                "/order",
                this.orderFilter
            );
            this.orderList = request.data.orders;
            this.hasNextPage = request.data.hasNextPage as boolean;
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public createOrders = async (onSuccess: () => void) => {
        this.loader = true;
        try {
            if (!this.userId) {
                return showErrorToast(
                    "Campo de usuário vazio.",
                    "Houve um erro."
                );
            }
            const productsIdsAndQuantity = this.selectedProducts.map(
                (item) => ({
                    id: item.product.id,
                    quantidade: Number(item.quantidade),
                })
            );
            if (productsIdsAndQuantity.length < 1) {
                return showErrorToast(
                    "Nenhum produto foi selecionado.",
                    "Houve um erro."
                );
            }
            await axiosInstance().post(`/order`, {
                products: productsIdsAndQuantity,
                userId: this.userId,
            });
            showSuccessToast("O pedido foi criado", "Sucesso!");
            onSuccess();
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public updateOrders = async (onSuccess: () => void) => {
        this.loader = true;
        try {
            if (!this.userId) {
                return showErrorToast(
                    "Campo de usuário vazio.",
                    "Houve um erro."
                );
            }
            const productsIdsAndQuantity = this.selectedProducts.map(
                (item) => ({
                    id: item.product.id,
                    quantidade: Number(item.quantidade),
                })
            );
            if (productsIdsAndQuantity.length < 1) {
                return showErrorToast(
                    "Nenhum produto foi selecionado.",
                    "Houve um erro."
                );
            }
            await axiosInstance().put(`/order/${this.order?.id}`, {
                products: productsIdsAndQuantity,
                userId: this.userId,
            });
            showSuccessToast("O pedido foi alterado.", "Sucesso!");
            onSuccess();
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public homeStatistic = async () => {
        this.loader = true;
        try {
            const request = await axiosInstance().get<HomeStatistic>(
                "/order/statistic"
            );
            this.homeData = request.data;
        } catch (error: any) {
            if (error.response) {
                showErrorToast(error.response.data.message);
            } else {
                showErrorToast(
                    "Vish... o serviço não está disponível.",
                    "Houve um erro."
                );
            }
        } finally {
            this.loader = false;
        }
    };

    public finalizeOrCancelOrder = async (
        id: string,
        finishOrCancel: "finish" | "cancel"
    ) => {
        this.loader = true;
        try {
            await axiosInstance().patch(`/order/${finishOrCancel}/${id}`);
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public getOrderById = async (id: string): Promise<Order | void> => {
        this.loader = true;
        try {
            const request = await axiosInstance().get<Order>(`/order/${id}`);
            this.order = request.data;
            return request.data;
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };

    public deleteOrder = async (id: string, onSuccess: () => void) => {
        this.loader = true;
        try {
            await axiosInstance().delete(`/order/${id}`);
            showSuccessToast("Feito. ✅", "O pedido foi removido com sucesso.");
            onSuccess();
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };

    public setInitialValues = (data: Order) => {
        this.order = data;
    };
}
