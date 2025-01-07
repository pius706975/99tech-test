export interface Product {
    id?: string;
    user_id?: string;
    name: string;
    price: number;
    condition: string;
    status: string;
    stock: number;
    created_at: string | undefined;
    updated_at: string | undefined;
}
