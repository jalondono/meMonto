const {JWT_SECRET, JWT_EXP} = require ('../config');
const {UserModel} = require('../models');
const jwt = require ('jsonwebtoken');

const newToken = user => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXP
  })
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload)
    })
  });


async function signup(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Please provide email and password' })
  }
  try {
    const user = await UserModel.create(req.body);
    console.log('User with ' + user.id+ ' created');
    const token = newToken(user);
    console.log('jwt ' + token + ' was generated');
    return res.status(201).send({ token })
  } catch (e) {
    console.log(e);
    return res.status(500).end()
  }
}

async function signin(req, res) {
  console.log('sign in function');
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Please provide Email and password' })
  }
  const invalid = { message: 'Invalid email and password combination' };
  try {
    const user = await UserModel.findOne({ email: req.body.email })
      .select('email password')
      .exec();
    if (!user) {
      return res.status(401).send(invalid)
    }
    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid)
    }
    const token = newToken(user);
    console.log('jwt ' + token + ' was generated');
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e);
    res.status(500).end()
  }
}

async function protect(req, res, next) {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    console.log(token);
    payload = await verifyToken(token);
    console.log(payload)
  } catch (e) {
    return res.status(401).end()
  }
  const user = await UserModel.findById(payload.id)
    .select('-password')
    .lean()
    .exec();
  if (!user) {
    return res.status(401).end()
  }
  req.user = user;
  next()
}

module.exports = {
  newToken,
  verifyToken,
  signup,
  signin,
  protect
};
