/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { axiosInstance } from "../resources/api";
import { showErrorToast, showSuccessToast } from "../resources/toast";
import {
    AddProduct,
    HomeStatistic,
    Order,
    OrderStatus,
    Sales,
} from "../resources/interfaces";

export default class SalesStore {
    public userId = "";
    public loader = false;
    public salesList: Sales[] = [];
    public sale: Sales | null = null;
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
        return ["Valor Total", "Feita por:", "Criado em:", ""];
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

    public getSales = async () => {
        this.loader = true;
        try {
            const request = await axiosInstance().get(
                "/sales",
                this.orderFilter
            );
            this.salesList = request.data;
            this.hasNextPage = request.data.hasNextPage as boolean;
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public createSales = async (onSuccess: () => void) => {
        this.loader = true;
        try {
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
            await axiosInstance().post(`/sales`, {
                products: productsIdsAndQuantity,
            });
            showSuccessToast("O pedido foi criado", "Sucesso!");
            onSuccess();
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public updateSales = async (onSuccess: () => void) => {
        this.loader = true;
        try {
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
            await axiosInstance().put(`/sales/${this.sale?.id}`, {
                products: productsIdsAndQuantity,
            });
            showSuccessToast("A venda foi alterada.", "Sucesso!");
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

    public getSaleById = async (id: string): Promise<Order | void> => {
        this.loader = true;
        try {
            const request = await axiosInstance().get<Sales>(`/sales/${id}`);
            this.sale = request.data;
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };

    public deleteSale = async (id: string, onSuccess: () => void) => {
        this.loader = true;
        try {
            await axiosInstance().delete(`/sales/${id}`);
            showSuccessToast("Feito. ✅", "O venda foi removida com sucesso.");
            onSuccess();
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };

    public setInitialValues = (data: Sales) => {
        this.sale = data;
    };
}
