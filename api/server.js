/* eslint-disable prettier/prettier */
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err))

// Define Coffee Schema
const coffeeSchema = new mongoose.Schema({
  name: String,
  origin: String,
  roastLevel: String,
  flavor: String,
  price: Number,
})

const Coffee = mongoose.model('Coffee', coffeeSchema)

// Routes
app.get('/api/coffees', async (req, res) => {
  try {
    const coffees = await Coffee.find()
    res.json(coffees)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/api/coffees', async (req, res) => {
  const coffee = new Coffee({
    name: req.body.name,
    origin: req.body.origin,
    roastLevel: req.body.roastLevel,
    flavor: req.body.flavor,
    price: req.body.price,
  })

  try {
    const newCoffee = await coffee.save()
    res.status(201).json(newCoffee)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.get('/api/coffees/:id', async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id)
    if (coffee == null) {
      return res.status(404).json({ message: 'Coffee not found' })
    }
    res.json(coffee)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.put('/api/coffees/:id', async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id)
    if (coffee == null) {
      return res.status(404).json({ message: 'Coffee not found' })
    }
    
    if (req.body.name != null) {
      coffee.name = req.body.name
    }
    if (req.body.origin != null) {
      coffee.origin = req.body.origin
    }
    if (req.body.roastLevel != null) {
      coffee.roastLevel = req.body.roastLevel
    }
    if (req.body.flavor != null) {
      coffee.flavor = req.body.flavor
    }
    if (req.body.price != null) {
      coffee.price = req.body.price
    }

    const updatedCoffee = await coffee.save()
    res.json(updatedCoffee)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.delete('/api/coffees/:id', async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id)
    if (coffee == null) {
      return res.status(404).json({ message: 'Coffee not found' })
    }
    await coffee.remove()
    res.json({ message: 'Coffee deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
