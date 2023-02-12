const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("build"))
app.use(morgan("dev"))

const exampleWare = (req,res,next) => {
    console.log("An example middleware was used in here")
    next()
}

app.use(exampleWare)


let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
        "id" : 5,
        "name" : "Robert Schnell",
        "number" : "444-4456-3562"
    }
]

app.get("/api/persons" , (req,res) => {
    res.json(persons)
})

app.get("/api/info" , (req , res) => {
    let date = new Date()
    res.end(`Phonebook has info for ${persons.length} people\n\n${date}`)
})

app.get("/api/persons/:uid" , (req,res) => {
    const id = Number(req.params.uid)
    const person = persons.find(instance => instance.id === id)
    if(person)
        res.json(person)
    else
        res.status(404).send("<h2>Der person,der du suchst,ist nicht in unserem buch</h2>")
})

app.delete("/api/persons/:haturi" , (req , res) => {
    const kolabaeng = Number(req.params.haturi)
    console.log(kolabaeng)
    persons = persons.filter(person => person.id !== kolabaeng)
    res.end(`Person with id number ${kolabaeng} was removed from dictionary`)
})

app.post("/api/persons" , (req , res) => {

    const generateId = () => {
        return Math.floor(Math.random() * 1000)
    }

    const body = req.body

    if(!body.number || !body.name)                      //Making name and number mandatory
        return res.status(400).send("<h1>Name und nummer sind notig</h1>")
    
    
    let commonName = persons.find(person => person.name === body.name)      //Checking the name already exists in the phonebook or not
    if (commonName)
        return res.status(400).send("<h1>Ein andere person mit ahnlichen namen ist schon da</h1>")
        

    let personToBeAdded = {
        name : body.name,
        number : body.number,
        id : generateId()
    }

    console.log(personToBeAdded)
    persons = persons.concat(personToBeAdded)
    res.json(persons)
})

let PORT = 3001

app.listen(PORT || 3001 , () => {
    console.log(`Listening now at localhost:${PORT || 3001}`)
})