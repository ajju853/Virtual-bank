import React, { useState } from 'react';
import './App.css';

function App() {
    const [balance, setBalance] = useState(1000);
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [transactionType, setTransactionType] = useState('');

    const handleTransaction = (type) => {
        if (amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (type === 'Withdraw' && amount > balance) {
            alert("Insufficient funds");
            return;
        }

        setShowModal(true);
        setTransactionType(type);
    };

    const confirmTransaction = () => {
        if (transactionType === 'Deposit') {
            setBalance(balance + Number(amount));
            setTransactions([...transactions, { type: 'Deposit', amount: Number(amount), time: new Date().toLocaleString() }]);
        } else if (transactionType === 'Withdraw') {
            setBalance(balance - Number(amount));
            setTransactions([...transactions, { type: 'Withdraw', amount: Number(amount), time: new Date().toLocaleString() }]);
        }
        setAmount('');
        setShowModal(false);
    };

    const handleLogin = () => {
        if (username) {
            setIsLoggedIn(true);
        } else {
            alert("Please enter a username");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setBalance(1000);
        setTransactions([]);
        setUsername('');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const filteredTransactions = transactions.filter(transaction => 
        filter === 'All' || transaction.type === filter
    );

    return (
        <div className={`App ${darkMode ? 'dark' : ''}`}>
            <h1>Virtual Bank</h1>
            <button className="toggle-button" onClick={toggleDarkMode}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            {isLoggedIn ? (
                <>
                    <h2>Welcome, {username}!</h2>
                    <h2>Balance: ${balance}</h2>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Enter amount" 
                    />
                    <button onClick={() => handleTransaction('Deposit')}>Deposit</button>
                    <button onClick={() => handleTransaction('Withdraw')}>Withdraw</button>
                    <button onClick={handleLogout}>Logout</button>
                    <h3>Transaction History</h3>
                    <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value="All">All</option>
                        <option value="Deposit">Deposits</option>
                        <option value="Withdraw">Withdrawals</option>
                    </select>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.type}</td>
                                    <td>${transaction.amount}</td>
                                    <td>{transaction.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="login-container">
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter username" 
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm {transactionType}</h3>
                        <p>Are you sure you want to {transactionType} ${amount}?</p>
                        <button onClick={confirmTransaction}>Confirm</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

