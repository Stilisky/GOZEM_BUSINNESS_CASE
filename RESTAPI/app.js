var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbConnection = require ('./db/config')
const bodyParser = require('body-parser')
var packagesRouter = require('./routes/packageRoutes');
var deliveriesRouter = require('./routes/deliveryRoutes');
const {
  webSocketLocationChange,
  webSocketGetDelivery, 
  webSocketDeliveryUpdateBroadcast
} = require('./services/packageDelivery')

var app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors: {
    origin: '*'
  }
});

server.listen(5010)

dbConnection
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Format
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Cross Fix
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Mes routes
app.use('/api/delivery', deliveriesRouter);
app.use('/api/package', packagesRouter);

//WebSocket clients
const clients = []

// Websockets Events
io.on('connection', (socket) => {
  console.log("web client is connect");
  clients.push(socket)
  socket.on('location_changed', async (data) => {
    webSocketLocationChange(data.delevery_id, data.location)
    const delivery = await webSocketGetDelivery(data.delevery_id)
    webSocketDeliveryUpdateBroadcast(clients, delivery);
  });

  socket.on('status_changed', (data) => {

    socket.emit('status_changed', data);
  });

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
