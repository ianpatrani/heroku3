const methodOverride = require("method-override");
const cors = require("cors");
const express = require("express");
const app = express();
const log = console.log;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

let port = process.env.PORT || 3000;

let users = [{
        email: "primermail@mail.com",
        name: "nombreuno",
        pass: "miclave1"
    },
    {
        email: "segundomail@mail.com",
        name: "nombredos",
        pass: "miclave2"
    },
    {
        email: "tercermail@mail.com",
        name: "nombretres",
        pass: "miclave3"
    }
];

app.use(cors());
app.use(methodOverride());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/users/:email", (req, res) => {
    let email = req.body.email;
    res.send(`usuario ${email}`);
});

app.get("/users/:email", (req, res) => {
    res.send(req.params.email);
    res.send('usuario get emails');
});

app.post("/user/create", (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let clave = req.body.clave;
    let user = {
        "email": email,
        "name": name,
        "clave": clave
    };
    res.send(`usuario post`);
});

app.put('/users', (req, res) => {
    const {
        name,
        email,
        clave
    } = req.body;
    users.push({
        name,
        email,
        clave
    });
    res.send('usuario put');
});

app.delete("/users/delete/:name", (req, res) => {
    users = users.filter(user => user !== req.params.name);
    res.send('usuario delete eliminado');
});

app.delete("/user/delete",(req,res)=>{
    let mail= req.query.mail;
    mail.forEach(para=>{   
        users= users.filter((elemento)=>elemento.email!=para) 
    })
    res.send("usuarios eliminado")
})

app.listen(3000, () => {
    log('start server');
});