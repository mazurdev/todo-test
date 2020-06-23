const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');
const port = process.env.PORT || 4000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res, next) => {
  const users = readUsers();

  const user = users.filter(
    u => u.email === req.body.email && u.password === req.body.password
  )[0];

  if (user) {
    res.send({...formatUser(user), token: checkIfAdmin(user)});
  } else {
    res.status(401).send('Incorrect email or password');
  }
});

server.use('/users', (req, res, next) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running');
});

function formatUser(user) {
  delete user.password;
  user.role = user.email === 'admin@gmail.com' ? 'admin' : 'user';
  return user;
}

function checkIfAdmin(user, bypassToken = false) {
  return user.email === 'admin@gmail.com' || bypassToken === true ? 'admin-token' : 'user-token';
}

function isAuthorized(req) {
  return req.headers.authorization === 'admin-token' ? true : false;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const users = JSON.parse(dbRaw).users;
  return users;
}
