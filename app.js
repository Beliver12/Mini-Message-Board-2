const path = require("node:path");
const express = require('express');
const app = express();
const pool = require("./db")

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


 
  let message = [];
 

  app.get("/", async (req, res) => {
    const messagess = await pool.query("SELECT * FROM mesages")
    console.log(messagess)
    res.render("index", {title: "Mini Messageboard", messagess: messagess});
  });

  app.get("/new", (req, res) => {
    res.render("form", {})
  })

  app.get("/message", (req, res) => {
    res.render("message", {messages:message, message:message})
    
  })


  app.post('/new',async (req, res) => {
    const {rows} = await pool.query("INSERT INTO mesages (text, name , date) VALUES ($1, $2, $3)", [req.body.message, req.body.authorName, new Date()])
    messages.push({ text: req.body.message, user: req.body.authorName, added: new Date()});
    console.log(rows)
    res.redirect("/")
  })

  app.get('/message/:i', async(req, res) => {
    const id = req.params;
    const messages = await pool.query("SELECT * FROM mesages")
    message.pop();
    console.log(messages.rows[id.i])
    message.push(messages.rows[id.i])
    console.log(message)
  res.render('message', { title: 'Message Details', message: message });
  console.log(message)
  })

 
  
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`listening on port ${PORT}!`));