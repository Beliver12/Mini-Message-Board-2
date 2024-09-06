const path = require("node:path");
const express = require('express');
const app = express();


const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages  = [
    {
     
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
        
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
 
  let message = [];
 

  app.get("/", (req, res) => {
    res.render("index", {title: "Mini Messageboard", messages: messages});
  });

  app.get("/new", (req, res) => {
    res.render("form", {})
  })

  app.get("/message", (req, res) => {
    res.render("message", {messages:messages, message:message})
    
  })


  app.post('/new', (req, res) => {
    messages.push({ text: req.body.message, user: req.body.authorName, added: new Date()});
    console.log(messages)
    res.redirect("/")
  })

  app.get('/message/:i', (req, res) => {
    const id = req.params;
    message.pop();
    message.push(messages[id.i])
  res.render('message', { title: 'Message Details', message: message });
  console.log(messages)
  })

 
  
  const PORT = 3000;
  app.listen(PORT, () => console.log(`listening on port ${PORT}!`));