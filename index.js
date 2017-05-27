var fs = require('fs'),
https = require('https'),
express = require('express'),
app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.locals.pretty = true;

https.createServer({
   key: fs.readFileSync('key.pem'),
   cert: fs.readFileSync('cert.pem')
},
 app).listen(8443);

console.log('App running at https://localhost:8443');

app.get('/', function (req, res) {

   res.header('Content-type', 'text/html');
   return res.render('index', { title: 'Hey Hey Hey!', message: 'Yo Yo'});
})

;
