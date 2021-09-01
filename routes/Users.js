const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const db = require('../database/db')
let sequelize = db.sequelize;
const DataTypes = sequelize.DataTypes;

const User = require('../models/user')(sequelize, DataTypes);
users.use(cors());

process.env.SECRET_KEY = 'secret';

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../client/public/images');
    },
    filename: (req, file, cb) => {
        const fileExt = file.originalname.split('.').pop();
        cb(null, uuidv4() + '.' + fileExt)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

users.post('/register', upload.single('avatar'), (req, res) => {
  const today = new Date()
  const userData = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.file.filename,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + ' Registered successfully!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        } else {
          res.json({ error: 'Invalid Password.' })
        }
      } else {
        res.json({ error: 'User does not exist.' })
      }
    })
    .catch(err => {
      res.json({ error: 'Invalid Credentials.' })
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist.')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.delete('/profile/:id', (req,res) => {
  User.destroy({
    where: {
        id: req.params.id
    }
  })
})

users.put('/profile/:id',(req, res) => {
  User.update(
    { name: req.body.name }, //values to be updated
    { where: { id: req.params.id} }
  )
  .then(res => {
    // handleResult(res)
    }
  )
  .catch(err => {
    // handleError(err)
    }
  )
})

module.exports = users;
