import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ITransactionOperationProps {
    transactionOperation: (value: number, type: "deposit" | "withdraw") => void;
    type: "deposit" | "withdraw";
    balance?: number;
}

const OperationPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: 200,
    paddingTop: 10,
    marginTop: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

const TransactionOperation: React.FC<ITransactionOperationProps> = ({ transactionOperation, type, balance }) => {
    const [amount, setAmount] = useState('');

    const performTransaction = () => {
        transactionOperation(Number(amount), type);
    }

    const isDisabled = () => {
        if (!amount) return true;
        if (type === 'withdraw' && balance !== undefined) {
            return Number(amount) > balance;
        }
        return false;
    }

    return (
        <OperationPaper variant="elevation">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2">
                    {type === 'deposit' ? 'Please enter the amount to deposit:' : 'Please enter the amount to withdraw:'}
                </Typography>
                <TextField
                    type='number'
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value); }}
                    variant="outlined"
                    label="Enter amount"
                    sx={{ width: '200px' }}
                />
                <Button
                    onClick={performTransaction}
                    disabled={isDisabled()}
                    variant="contained"
                    color={type === 'deposit' ? 'primary' : 'secondary'}
                >
                    {type === 'deposit' ? 'Deposit' : 'Withdraw'}
                </Button>
                {
                    (type === 'withdraw' && balance !== undefined && Number(amount) > balance) && (
                        <Typography variant="caption">{'* Enter valid amount to withdraw'}</Typography>
                    )
                }
                {
                    (type === 'deposit' && Number(amount) === 0) && (
                        <Typography variant="caption">{'* Enter valid amount to deposit'}</Typography>
                    )
                }
            </Box>
        </OperationPaper>

    );
};

export default TransactionOperation;