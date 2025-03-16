import { useState, useCallback } from 'react'
import bankLogo from './assets/bank.png'
import './App.css'
import { Button, Stack, Chip } from '@mui/material';
import { AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import TransactionOperation from './TransactionOperation';
import TransactionStatement from './TransactionStatement';

type Transaction = {
  time: Date;
  amount: number;
  balance: number;
};

type TransactionType = "deposit" | "withdraw";


function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [message, setMessage] = useState('');

  const [selectedStep, setSelectedStep] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { key: 'deposit', label: 'Deposit' },
    { key: 'withdraw', label: 'Withdraw' },
    { key: 'statement', label: 'Print statement' },
    { key: 'quit', label: 'Quit' },
  ];

  const transactionOperation = useCallback((value: number, type: TransactionType) => {
    const amount = type === "withdraw" ? -value : value;
    const transactionTime = new Date();

    setBalance(prevBalance => prevBalance + amount);
    setTransactions(prevTransactions => [
      ...prevTransactions,
      {
        time: transactionTime,
        amount: amount,
        balance: balance + amount,
      }
    ]);
    setIsComplete(true);
    setMessage(
      type === 'deposit' ?
        `Thank you. $${value}.00 has been deposited to your account.` :
        `Thank you. $${value}.00 has been withdrawn from your account.`
    );
    setSelectedStep('');
  }, [balance]);

  /*
  const transactionOperation = (value: number, type: TransactionType) => {
    setBalance(prevBalance => {
      const amount = type === "withdraw" ? -value : value;
      const newBalance = prevBalance + amount;
      setTransactions(prevTransactions => [
        ...prevTransactions,
        {
          time: new Date(),
          amount: amount,
          balance: newBalance,
        }
      ]);
      
      return newBalance;
    });
  }
  */

  return (
    <>
      <div>
        <img src={bankLogo} className="logo react" alt="React logo" />
      </div>
      <h1>AwesomeGIC Bank</h1>
      <h4>{`Your balance is `}<Chip icon={<AttachMoneyIcon style={{ color: 'white' }} />} label={`${balance}.00`} variant="outlined" style={{ color: 'white' }} /></h4>

      <hr />
      {message && (
        <>
          <p style={{ color: 'yellow' }}>{message}</p>
          <hr />
        </>
      )}

      {(
        <>
          <br />
          <p>
            {
              isComplete ?
                `Is there anything else you'd like to do?` :
                `Welcome to AwesomeGIC Bank! What would you like to do?`
            }
          </p>
          <Stack direction="row" spacing={2}>
            {steps?.map(step => (
              <Button
                onClick={() => {
                  if (step.key === 'quit') {
                    setIsComplete(false);
                    setSelectedStep('');
                    setMessage('Thank you for banking with AwesomeGIC Bank. Have a nice day!');
                    return;
                  }
                  setMessage('');
                  setSelectedStep(step.key)
                }}
                variant='contained'
                key={step.key}
              >
                {step.label}
              </Button>
            ))}
          </Stack>
        </>
      )}

      {
        selectedStep === 'deposit' && (
          <TransactionOperation
            type={'deposit'}
            transactionOperation={transactionOperation}
          />
        )
      }
      {
        selectedStep === 'withdraw' && (
          <TransactionOperation
            type={'withdraw'}
            transactionOperation={transactionOperation}
            balance={balance}
          />
        )
      }
      {
        selectedStep === 'statement' && (
          <TransactionStatement transactions={transactions} />
        )
      }
    </>
  )
}

export default App
