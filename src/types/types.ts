
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

export type filterProps = {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export type ChartProps = {
    transactions: Partial<ITransaction>[];
    customerName: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CustomersTableProps = {
    transactions: ITransaction[];
    customers: Map<number, string>;
    filter: string;
    getTransactionHistory: (id: number) => void;
};