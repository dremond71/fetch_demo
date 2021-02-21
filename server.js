const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// get your app to use CORS
app.use(cors());

// get your app to use body-parser.
// without it, you cannot do req.body
// to obtain posted data in a request.
app.use(bodyParser.urlencoded({ extended: true }));
// if you don't prepare the body-parser
// for JSON data, it won't be able
// to perform req.body properly...
// you will get an empty object.
app.use(bodyParser.json());
const users = [
  {
    name: 'user1',
    password: 'password1',
    profession: 'teacher',
    id: 1,
  },

  {
    name: 'user2',
    password: 'password2',
    profession: 'librarian',
    id: 2,
  },

  {
    name: 'user3',
    password: 'password3',
    profession: 'clerk',
    id: 3,
  },
];

app.use(express.static('public'));

/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 *
 * 200 - OK
 * 201 - Created
 */
app.get('/listUsers', function (req, res) {
  res.status(200).send(users);
  //res.end( users );
});

app.post('/user', (req, res) => {
  const user = req.body;

  console.log(`user added:\n${JSON.stringify(user)}`);
  users.push(user);

  res.status(201).send('User added to the database');
});

const server = app.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
