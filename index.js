const express = require('express')
const app = express()
const PORT = process.env.PORT || 4030
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require ('body-parser')
const Clients = require('./model/Clients')
// const simpleBlogrouter = require('./routes/simpleBlogrouter')




const dotenv = require('dotenv')
 const dotenvb = require('dotenv').config()

 app.use(express.json())
app.use(express.urlencoded({extended: false}))

 app.use(express.static(path.join(__dirname, "public")));
 
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

// const exphbs  = require('express-handlebars');

// app.engine('hbs', exphbs({
//     extname: '.hbs', // extension of the files
//     defaultLayout: 'main', // default layout template
//     layoutsDir: path.join(__dirname, 'views/layouts'), // directory for layout templates
//     partialsDir: path.join(__dirname, 'views/partials') // directory for partial templates
// }));

// app.set('view engine', 'hbs');

mongoose.set("strictQuery", false);

 const uri = "mongodb+srv://adigun:hakeem@cluster0.ncmalbd.mongodb.net/Portfolio?retryWrites=true&w=majority";


const connectionParams = {
    useNewUrlParser: true,
    //  useCreateIndex: false,
    useUnifiedTopology: true,
  };
  
  mongoose
    .connect(uri, connectionParams)
    .then((data) => {
      console.log("DATABASE CONNECTION SET");
    })
    .catch((err) => {
      console.log(err);
    });


    app.use(cors())

// app.use('/api', Clients)


app.get("/", (req, res) =>{
    res.render("datas/index", {
        styles: "styles.css",
        main: "main.js"
    })
})

//sample
app.get("/sample", (req, res) =>{
  res.render("datas/sample", {
      styles: "styles.css",
      main: "main.js"
  })
})

app.post("/", async  (req, res)=>{

          
    try {
        const portfolio = await Clients.create({
         name: req.body.name,
          email: req.body.email,
          message: req.body.message,
        });
        await portfolio.save();
        res.redirect("/");
      } catch (e) {
        res.status(400).json({
        status : 400,
         message: 'data failed request ',
         data: e.message
         })
        console.log(e.message);
      }
    })
    
    

app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
  });
