import { ITransaction } from "../types/types";
import { formatCurrency } from "../utils/FormatCurrency";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
type CustomersTableProps = {
  transactions: ITransaction[];
  customers: Map<number, string>;
  filter: string;
  getTransactionHistory: (id: number) => void;
};

export default function CustomersTable({
  transactions,
  filter,

  customers,
  getTransactionHistory,
}: CustomersTableProps) {
  function handleSort(a: ITransaction, b: ITransaction) {
    let aDate = new Date(a.date);
    let bDate = new Date(b.date);

    return +aDate - +bDate;
  }
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "2px 2px 5px #333",
        background: "#F5F7F8",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            background: "#102C57",
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: {
                  xs: "12px",
                  md: "18px",
                },
              }}
            >
              #
            </TableCell>
            <TableCell
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: {
                  xs: "12px",
                  md: "18px",
                },
              }}
              align="left"
            >
              Customer Name
            </TableCell>
            <TableCell
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: {
                  xs: "12px",
                  md: "18px",
                },
              }}
              align="left"
            >
              Transaction Amount
            </TableCell>
            <TableCell
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: {
                  xs: "12px",
                  md: "18px",
                },
              }}
              align="left"
            >
              Transaction Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions
            .sort(handleSort)
            .filter((trans) => {
              if (!filter) return trans;

              if (isNaN(+filter)) {
                return customers
                  .get(trans.customer_id)
                  ?.toLowerCase()
                  .includes(filter);
              }

              return trans.amount.toString().includes(filter);
            })
            .map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => getTransactionHistory(transaction.customer_id)}
                hover
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontSize: {
                      xs: "12px",
                      md: "18px",
                    },
                  }}
                >
                  {transaction.id}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: {
                      xs: "12px",
                      md: "18px",
                    },
                  }}
                >
                  {customers.get(transaction.customer_id)}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: {
                      xs: "12px",
                      md: "18px",
                    },
                  }}
                >
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: {
                      xs: "12px",
                      md: "18px",
                    },
                  }}
                >
                  {transaction.date}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
