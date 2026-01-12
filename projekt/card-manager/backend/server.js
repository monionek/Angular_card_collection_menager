const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('backend/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { login, password } = req.body;
  const users = router.db.get('users').value();

  const user = users.find((u) => u.login === login && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({
    token: 'fake-token',
    user: {
      id: user.id,
      login: user.login,
    },
  });
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server running on http://localhost:3000');
});
