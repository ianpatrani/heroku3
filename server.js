// import Express from "express";
// import cors from "cors";
// import methodOverride  from "method-override";
// import axios from "axios";
// import path from"path";

const Express = require("express");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const multer = require("multer")

const app = Express();
const log = console.log;
let port = process.env.PORT || 3000;
let users = [{
        email: "micorreo@mail.com",
        name: "minombre1",
        password: "00223355"
    },
    {
        email: "micorreo@mail.com",
        name: "minombre2",
        password: "00223355"
    },
    {
        email: "micorreo@mail.com",
        name: "minombre3",
        password: "00223355"
    }
];

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({
    extended: true
}))
app.use(methodOverride());



const multerConfig = multer.diskStorage({
    destination: function (res, file, cb) {
        cb(null, "./bucket")
    },
    filename: function (res, file, cb) {
        let idImage = uuid().split("-")[0];
        let day = dayjs().format('DD-MM-YYYY');
        cb(null, `${day}.${idImage}.${file.originalname}`);
    },
});

const multerMiddle = multer({
    storage: multerConfig
})

app.post("/registro/usuario", multerMiddle.single("imgFile"), (req, res) => {

    if (req.file) {
        res.send("imagen guardada");
    } else {
        res.send("error al cargar la imagen posiblemente no fue recibida");
    }

})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

app.get("/users", (req, res) => {
    res.send(users)
})

app.get("/user/:mail", (req, res) => {
    let mail = req.params.mail;
    users.forEach(user => {
        if (user.email == mail) {
            res.send(user)
        }
    });
    res.send("usuario no encontrado");
});

app.get("/usersEmail/:email", (req, res) => {
    let email = req.params.email;
    let arrayEmail = email.split(",");
    let response = [];

    arrayEmail.forEach((email) => {
        users.forEach((user) => {
            if (user.email == email) {
                response.push(user)
            }
        })
    })
    res.send(response);
})

app.get("/users/name", (req, res) => {
    let arrayNombre = req.query.nombre;
    let resul = [];
    arrayNombre.forEach((nombre) => {
        users.forEach((element) => {
            if (nombre == element.name) {
                resul.push(element)
            }
        })
    })
    res.send(resul); //get user por query
})

app.post("/users/name", (req, res) => {
    let email = req.body.email;
    let nombre = req.body.nombre;
    let pass = req.body.pass;

    let user = {
        "email": email,
        "name": nombre,
        "password": pass
    };
    users.forEach((element) => {
        if (user.email == element.email)
            res.send("este mail ya existe")
    });
    users.push(user);
    res.send("usuario creado"); //get user por form
});

app.delete("/user/delete/:mail", (req, res) => {
    let mail = req.params.mail;
    users = users.filter((elemento) => elemento.email != mail)
    res.send("usuario eliminado");
});

app.delete("/user/delete", (req, res) => {
    let mail = req.query.mail;
    mail.forEach(para => {
        users = users.filter((elemento) => elemento.email != para)
    });
    res.send("usuarios eliminado");
});

app.get("/update", (req, res) => {

    res.sendFile(path.join(__dirname, "/views/update.html"));
});

app.post("/user/update", (req, res) => {
    let email = req.body.email;
    let nombre = req.body.nombre;
    let pass = req.body.pass;
    let leng = users.length
    for (let i = 0; i < leng; i++) {
        if (users[i].email == email) {
            users[i].name = nombre;
            users[i].password = pass
        }
    }
    res.send(" usuario fue actualizado");

});

app.listen(port, () => {
    log(" start server ");
});