const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

let todos = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { todos });
});

app.post("/add", (req, res) => {
    const { text, priority } = req.body;
    if (text.trim() !== "") {
        todos.push({ text, priority });
    }
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    todos.splice(index, 1);
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    const { index, newText } = req.body;
    if (newText.trim() !== "") {
        todos[index].text = newText;
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Todo app running on http://localhost:${port}`);
});