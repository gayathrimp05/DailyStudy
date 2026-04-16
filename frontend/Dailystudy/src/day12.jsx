import { useState } from "react";

function Day12() {
const [initial, setInitial] = useState("");
const [balance, setBalance] = useState(0);

const [text, setText] = useState("");
const [amount, setAmount] = useState("");
const [list, setList] = useState([]);

function setInitialBalance() {
if (!initial) return;
setBalance(Number(initial));
setInitial("");
}

function addExpense() {
if (!text || !amount) return;

const expense = Number(amount);

if (expense > balance) {
alert("Not enough balance!");
return;
}

const newItem = { text, amount: expense };

setList([...list, newItem]);
setBalance(balance - expense);

setText("");
setAmount("");
}

function deleteItem(index) {
const item = list[index];

const newList = list.filter((_, i) => i !== index);
setList(newList);

// restore balance
setBalance(balance + item.amount);
}

return (
<div style={styles.container}>
<div style={styles.card}>
<h2>-- Expense Tracker --</h2>

{/* Initial Balance */}
<div style={{ marginBottom: "10px" }}>
<input
placeholder="Enter total money"
value={initial}
onChange={(e) => setInitial(e.target.value)}
style={styles.input}
/>
<button onClick={setInitialBalance} style={styles.button}>
Set
</button>
</div>

<h3 style={{ color: balance >= 0 ? "green" : "red" }}>
Balance: ₹{balance}
</h3>

{/* Add Expense */}
<div style={styles.inputRow}>
<input
placeholder="Description"
value={text}
onChange={(e) => setText(e.target.value)}
style={styles.input}
/>

<input
placeholder="Amount"
value={amount}
onChange={(e) => setAmount(e.target.value)}
style={styles.input}
/>
</div>

<button onClick={addExpense} style={styles.button}>
Add Expense
</button>

{/* List */}
<div style={{ marginTop: "20px" }}>
{list.map((item, i) => (
<div key={i} style={styles.item}>
<span>{item.text}</span>
<span>
₹{item.amount}
<button
onClick={() => deleteItem(i)}
style={styles.deleteBtn}
>
X
</button>
</span>
</div>
))}
</div>
</div>
</div>
);
}

const styles = {
container: {
display: "flex",
justifyContent: "center",
marginTop: "50px",
fontFamily: "Arial",
},
card: {
width: "400px",
padding: "20px",
borderRadius: "10px",
boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
textAlign: "center",
},
inputRow: {
display: "flex",
gap: "10px",
marginTop: "10px",
},
input: {
flex: 1,
padding: "8px",
borderRadius: "8px",
border: "1px solid #ccc",
marginRight: "5px",
},
button: {
marginTop: "10px",
padding: "8px 12px",
borderRadius: "8px",
border: "none",
background: "#007bff",
color: "white",
cursor: "pointer",
},
item: {
display: "flex",
justifyContent: "space-between",
padding: "10px",
margin: "5px 0",
borderRadius: "8px",
background: "#f8d7da",
color: "black",
},
deleteBtn: {
marginLeft: "10px",
border: "none",
background: "transparent",
cursor: "pointer",
},
};

export default Day12;
