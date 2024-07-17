
export type CustomerProps = {
    id: number,
    name: string;
}
export type ICustomers = CustomerProps & {
    transactions: Partial<ITransaction>[];
}

export interface ITransaction {
    id: number;
    customer_id: number;
    amount: number;
    date: string;
}
