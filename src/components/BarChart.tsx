// Types
import { ChartProps } from "../types/types";

//Components

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function BarChartComponent({
  transactions,
  customerName,
  open,
  setOpen,
}: ChartProps) {
  if (!transactions) return null;

  const data = transactions.map((transaction) => {
    return { date: transaction.date, amount: transaction.amount };
  });

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "500px",
          background: "#fff",
          textAlign: "center",
          marginInline: "20px",
          outline: "none",
          padding: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBlock: "10px", fontWeight: "bold" }}
        >
          {customerName}
        </Typography>
        <ResponsiveContainer className="chart">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="amount" />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#379777"
              barSize={50}
              activeBar={<Rectangle fill="#F4CE14" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Modal>
  );
}
