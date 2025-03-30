/* eslint-disable no-use-before-define */
export interface Login {
    email: string;
    password: string;
}
export enum Role {
    USER = "user",
    EMPLOYEE = "funcionario",
    ADMIN = "admin",
    TECH = "tech",
}
export interface UserToken {
    id: string;
    userName: string;
    access_token: string;
    roles: Role[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    roles: Role[];
    orders?: Order[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateProduct {
    lote: string;
    nome: string;
    marca: string;
    descricao: string;
    preco: number;
    categoria: string[];
    imagem_url: string;
    quantidade: string;
    subcategoria: string[];
    precocomdesconto: number;
}

export interface HomeStatistic {
    today: number;
    last15days: number;
    last30days: number;
    total: number;
}
export interface Product {
    id: string;
    name: string;
    link: string;
    state: States;
    date: Date;
    highlight: boolean;
    imagem_url: string;
    createdAt: Date;
}

export interface AddProduct {
    product: Product;
    quantidade: number;
}
export interface ProductFilters {
    page: number;
    lowestOrBiggestprice: boolean | null;
    nome?: string;
}

export interface Order {
    id: string;
    customer: User;
    status: OrderStatus;
    products: Product[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export enum OrderStatus {
    PENDING = "Pendente",
    FINISHED = "Finalizado",
    CANCELLED = "Cancelado",
}
export interface Sales {
    id: string;
    products: Product[];
    userName: string;
    userId: string;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type CreateSales = AddProduct;

export enum States {
    AC = "Acre",
    AL = "Alagoas",
    AP = "Amapá",
    AM = "Amazonas",
    BA = "Bahia",
    CE = "Ceará",
    DF = "Distrito Federal",
    ES = "Espírito Santo",
    GO = "Goiás",
    MA = "Maranhão",
    MT = "Mato Grosso",
    MS = "Mato Grosso do Sul",
    MG = "Minas Gerais",
    PA = "Pará",
    PB = "Paraíba",
    PR = "Paraná",
    PE = "Pernambuco",
    PI = "Piauí",
    RJ = "Rio de Janeiro",
    RN = "Rio Grande do Norte",
    RS = "Rio Grande do Sul",
    RO = "Rondônia",
    RR = "Roraima",
    SC = "Santa Catarina",
    SP = "São Paulo",
    SE = "Sergipe",
    TO = "Tocantins",
}
