let express = require('express')
let mongoose = require('mongoose')
const User = require('./userModel')

let app = express()

app.use(express.json())


let PORT = process.env.PORT || 5000

let dbCon = "mongodb+srv://venkat:venkat@cluster0.taaagri.mongodb.net/products-db"



app.post('/register', async(req, res) => {
  
  try {
    let { name, email, password, confirmpassword } = req.body

    if (!name || !email || !password || !confirmpassword) {
      res.status(400).send('Require name and email and password and cpassword')
    }
    if (password !== confirmpassword) {
      res.status(400).send('password and cpassword not matched')
    }
    
    let newUser = {
      name,
      email,
      password,
      confirmpassword
    }

    let userExist = await User.findOne({ email })
    
    if (userExist) {
      res.status(400).send('User already exist')
    }

    let user = await User.create(newUser)
    return res.status(201).send('user created successfully in db')
    
  } catch (error) {
    return res.status(500).send('internal server error')
  }
  
})
app.post('/login', async(req, res) => {
  
  try {
    let {email, password} = req.body

    if (!email || !password ) {
      res.status(400).send('Require email and password')
    }
    
    let userExist = await User.findOne({ email })
    
    if (!userExist) {
      res.status(400).send('No user in DB')
    }

    if (userExist.password !== password) {
      return res.status(400).send('Invalid credentials')
    }

    if (userExist.email && userExist.password) {
      
    }

    
  } catch (error) {
    return res.status(500).send('internal server error')
  }
  
})

app.listen(PORT, () => {
  console.log(`server started in port ${PORT}`)
})

mongoose.connect(dbCon)
  .then(() => {
    console.log('DB connected successfully')
  })
  .catch(() => {
    console.log('Error while connecting DB')
  })


