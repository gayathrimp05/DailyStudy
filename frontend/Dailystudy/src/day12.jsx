import { useState } from "react";

function Day11() {
const [text, setText] = useState("");
const [amount, setAmount] = useState("");
const [list, setList] = useState([]);

function addTransaction() {
if (!text || !amount) return;

const newItem = {
text,
amount: Number(amount),
};

setList([...list, newItem]);
setText("");
setAmount("");
}

function deleteItem(index) {
const newList = list.filter((_, i) => i !== index);
setList(newList);
}

const balance = list.reduce((acc, item) => acc + item.amount, 0);

return (
<div style={styles.container}>
<div style={styles.card}>
<h2>-- Expense Tracker ---</h2>

<h3 style={{ color: balance >= 0 ? "green" : "red" }}>
Balance: ₹{balance}
</h3>

{/* Inputs */}
<div style={styles.inputRow}>
<input
placeholder="Description"
value={text}
onChange={(e) => setText(e.target.value)}
style={styles.input}
/>

<input
placeholder="Amount (+/-)"
value={amount}
onChange={(e) => setAmount(e.target.value)}
style={styles.input}
/>
</div>

<button onClick={addTransaction} style={styles.button}>
Add
</button>

{/* List */}
<div style={{ marginTop: "20px" }}>
{list.map((item, i) => (
<div
key={i}
style={{
...styles.item,
borderLeft:
item.amount > 0
? "5px solid green"
: "5px solid red",
}}
>
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
},
button: {
marginTop: "10px",
padding: "10px",
width: "100%",
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
background: "#f9f9f9",
},
deleteBtn: {
marginLeft: "10px",
border: "none",
background: "transparent",
cursor: "pointer",
},
};

export default Day11;