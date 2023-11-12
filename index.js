import express from "express"
import mongoose from "mongoose"
import { Users } from './db/UsersData.js';
import { Livs } from './db/Livror.js';
import { Pitirais } from "./db/Pityzrya.js";
import cors from 'cors';
import { orders } from "./db/order.js";
// import { restart } from "nodemon";
const app = express()


const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors());

app.get("/", async (req, res) => {

    let a = await Pitirais.find()
    console.log({ a });
    // a = a.filter(e => e.name === "raouf")
    res.status(200).json(a)
})

app.get("/order/:id", async (req, res) => {
    let { id } = req.params

    let a = await orders.find()
    a = a.find(e => e.pitId === id)
    console.log({ a });
    // a = a.filter(e => e.name === "raouf")
    res.status(200).json(a)
})


app.get("/order", async (req, res) => {
    let { id } = req.params

    let a = await orders.find()
    // a = a.filter(e => e.name === "raouf")
    res.status(200).json(a)
})

app.post('/order', async (req, res) => {
    try {
        if (
            !req.body.pitId ||
            !req.body.cleintId ||
            !req.body.body ||
            !req.body.packje
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        let neworder = {
            pitId: req.body.pitId,
            cleintId: req.body.cleintId,
            body: req.body.body,
            packje: req.body.packje,
            status: "wiat for pit to acsipte",
            livId: ""
        }

        const result = await orders.create(neworder);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'order posted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})


app.post('/pit', async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.password ||
            !req.body.adderss
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        let newpit = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            tel: req.body.tel,
            adderss: req.body.adderss,
            NubderOrder: 0,
            type: req.body.type,
            menu: ""
        }
        newpit.menu = ['pizza', 'cheese', 'tacus']
        newpit.type = 'pizirai'
        const result = await Pitirais.create(newpit);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

app.get('/ac/:id', async (req, res) => {
    let { id } = req.params
    let a = await orders.find()
    a = a.find(e => e.id === id)
    a.status = "waiting for liv to ac"
    const result = await orders.findByIdAndUpdate(id, a);
    res.status(201).json(a)
})


app.get('/dil', async (req, res) => {
    let a = await orders.find()
    a = a.filter(e => e.status === "waiting for liv to ac")
    res.status(200).json(a)
})





app.listen(PORT)




mongoose
    .connect('mongodb+srv://raouf:raouf@samssar.rg5dnyn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("mriglla")

    })
    .catch(err => console.log(err))

