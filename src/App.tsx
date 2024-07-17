import axios from "axios";
import { useEffect, useState } from "react";
import { CustomerProps, ICustomers, ITransaction } from "./types/types";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  BarChartComponent,
  Filter,
  Loader,
  CustomersTable,
} from "./components";
import { Typography } from "@mui/material";

const ENDPOINTS = ["/customers", "/transactions"];
export default function App() {
  const [filter, setFilter] = useState("");
  const [customer, setCustomer] = useState<ICustomers>();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [customers, setCustomers] = useState<Map<number, string>>();
  const [open, setOpen] = useState(false);
  async function getCustomers(endpoints: string[]) {
    try {
      const res = await Promise.all(
        endpoints.map((endpoint) =>
          axios.get(`https://ct-server-drab.vercel.app${endpoint}`)
        )
      );

      const [_customers, transactions] = res.map((data) => data.data);

      setCustomers(
        new Map(
          _customers.map((customer: CustomerProps) => [
            customer.id,
            customer.name,
          ])
        )
      );

      setTransactions(transactions);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!transactions?.length) {
      getCustomers(ENDPOINTS);
    }
  }, []);

  function getTransactionHistory(customerId: number) {
    setOpen(true);
    if (customerId === customer?.id) return;

    let customerName = customers?.get(customerId)!;

    let customerTransactions = transactions.filter(
      (trans) => trans.customer_id === customerId
    );

    setCustomer({
      id: customerId,
      name: customerName,
      transactions: customerTransactions,
    });
  }

  if (isLoading) return <Loader />;

  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "20px",
            sm: "30px",
          },
          margin: "20px auto",
          width: "fit-content",
          textShadow: "3px 3px 0 #83B4FF;",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
        }}
      >
        <ReceiptLongIcon />
        Customer Transactions
        <ReceiptLongIcon />
      </Typography>
      <Filter filter={filter} setFilter={setFilter} />
      <CustomersTable
        customers={customers!}
        getTransactionHistory={getTransactionHistory}
        transactions={transactions}
        filter={filter}
      />
      <BarChartComponent
        customerName={customer?.name!}
        transactions={customer?.transactions!}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
