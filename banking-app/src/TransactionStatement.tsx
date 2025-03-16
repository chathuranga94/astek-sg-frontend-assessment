import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

type Transaction = {
    time: Date;
    amount: number;
    balance: number;
}

interface ITransactionStatementProps {
    transactions: Transaction[];
}

const columns: GridColDef[] = [
  { 
    field: 'time', 
    headerName: 'Time', 
    width: 200,
    valueGetter: (_, row: Transaction) => new Date(row.time).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 100,
    valueGetter: (_, row: Transaction) => `${row.amount}.00`
  },
  {
    field: 'balance',
    headerName: 'Balance',
    width: 100,
    valueGetter: (_, row: Transaction) => `${row.balance}.00`
  },
];

const TransactionStatement: React.FC<ITransactionStatementProps> = ({ transactions }) => {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => new Date(row.time).valueOf()}
        rows={transactions}
        columns={columns}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 5 }}
      />
    </Paper>
  );
};

export default TransactionStatement;