var fs = require('fs'), https = require('https'), express = require('express'),
app = express();

app.use(express.static('public')); app.set('view engine', 'pug');
app.locals.pretty = true;

https.createServer({
   key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem')
},
 app).listen(8443);

console.log('App running at https://localhost:8443');

var elasticsearch = require('elasticsearch'); var client = new
elasticsearch.Client({
  host: 'https://admin:admin@localhost:9200', log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    // console.log('All is well');
  }
});

app.get('/', function (req, res) {

  client.cluster.state({
    metric: 'metadata', index: req.params.name
  }).then(function (response) {
    res.header('Content-type', 'text/html');
    console.log(Object.keys(response.metadata.indices));
    return res.render('index', { resbody: Object.keys(response.metadata.indices) });
  });
  

})

;
