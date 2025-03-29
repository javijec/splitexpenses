import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  Box,
  Fade,
  Avatar,
} from "@mui/material";
import { Receipt as ReceiptIcon } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import ExpensesTable from "./ExpensesTable";

const ExpensesList = ({ expenses = [] }) => {
  if (!Array.isArray(expenses)) {
    console.error("Invalid expenses prop: expected an array.");
    return null;
  }

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
        },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: (theme) => `${theme.palette.success.main}`,
        },
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                color: "success.main",
                width: 40,
                height: 40,
                mr: 1.5,
              }}
            >
              <ReceiptIcon />
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              Gastos del Grupo
            </Typography>
          </Box>
        }
        sx={{
          bgcolor: "background.paper",
          pb: 2,
          pt: 3,
          px: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      />
      <Divider />
      <CardContent sx={{ p: 0, height: "calc(100% - 70px)" }}>
        {expenses.length > 0 ? (
          <Fade in={expenses.length > 0} timeout={500}>
            <Box>
              <ExpensesTable expenses={expenses} />
            </Box>
          </Fade>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 2 }}
          >
            No hay gastos para mostrar.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
