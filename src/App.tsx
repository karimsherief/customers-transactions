import { useEffect, useState } from "react";
import axios from "axios";

// Types
import { CustomerProps, ICustomers, ITransaction } from "./types/types";

// Components
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
  const [filter, setFilter] = useState(""); // Filter data based on name or amount
  const [customer, setCustomer] = useState<ICustomers>(); // customer's name and transaction history in bar chart
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [transactions, setTransactions] = useState<ITransaction[]>([]); // Customer's transaction table
  const [customers, setCustomers] = useState<Map<number, string>>(); // Customers list
  const [open, setOpen] = useState(false); // Modal state

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

  useEffect(() => {
    if (!transactions?.length) {
      getCustomers(ENDPOINTS);
    }
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
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
        Customers Transactions
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
    </>
  );
}
