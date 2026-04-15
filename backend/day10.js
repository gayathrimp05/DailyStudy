const express = require("express");
const app = express();

app.use(express.json());

app.post("/outfit", (req, res) => {
    console.log(req.body); //
    const weather = req.body.weather;
    const temp = req.body.temperature;

    let outfit = "";

    if (weather === "rainy") {
        outfit = "Raincoat + Waterproof shoes";
    } 
    else if (weather === "cold" || temp < 20) {
        outfit = "Jacket + Hoodie";
    } 
    else if (weather === "hot" || temp > 30) {
        outfit = "T-shirt + Shorts";
    } 
    else {
        outfit = "Casual wear";
    }

    res.json({ outfit });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});