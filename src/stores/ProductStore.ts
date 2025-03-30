/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { axiosInstance } from "../resources/api";
import { showErrorToast, showSuccessToast } from "../resources/toast";
import { Product, States } from "../resources/interfaces";
import { ProductSchema } from "../pages/Product/CreateOrEdit";
import moment from "moment";

export default class ProductStore {
    public loader = false;
    public highlight = false;
    public date: Date | null = new Date();
    public image: any | null = null;
    public productList: Product[] = [];
    public product: Product | null = null;
    public productImageUrl = "";
    public search: string | null = null;
    public page = 1;
    public lowestPrice: string | null = null;
    public categoria: string[] = [];

    private get productFilter() {
        return {
            params: {
                page: this.page,
                nome: this.search,
            },
        };
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

    public createOrEditProduct = async (
        data: ProductSchema,
        onSuccess: () => void,
        id?: string
    ) => {
        this.loader = true;
        try {
            if (id) {
                await axiosInstance().put(`/product/${id}`, {
                    ...data,
                    state: data.state as States,
                    imagem_url: this.productImageUrl,
                    date: this.date,
                    highlight: this.highlight,
                });
                showSuccessToast("Produto editado com sucesso!!");
                onSuccess();
            } else {
                await axiosInstance().post("/product", {
                    ...data,
                    date: this.date,
                    state: data.state as States,
                    imagem_url: this.productImageUrl,
                    highlight: this.highlight,
                });
                showSuccessToast("Produto cadastrado com sucesso!");
                onSuccess();
            }
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };

    public getProducts = async () => {
        this.loader = true;
        try {
            const request = await axiosInstance().get<Product[]>(
                "/product",
                this.productFilter
            );
            this.productList = request.data;
        } catch (error: any) {
            showErrorToast(error.response.data.message);
        } finally {
            this.loader = false;
        }
    };

    public getProductById = async (id: string): Promise<Product | void> => {
        this.loader = true;
        try {
            const request = await axiosInstance().get<Product>(
                `/product/${id}`
            );
            this.product = request.data;
            return request.data;
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };

    public deleteProduct = async (id: string, onSuccess: () => void) => {
        this.loader = true;
        try {
            await axiosInstance().delete(`/product/${id}`);
            showSuccessToast(
                "Feito. ✅",
                "O produto foi removido com sucesso."
            );
            onSuccess();
        } catch (error: any) {
            showErrorToast(error.response.data.error.message);
        } finally {
            this.loader = false;
        }
    };

    public setInitialValues = (data: Product) => {
        this.product = data;
    };
}
