var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/avalnchedb');

var productSchema = new Schema({
    product_name: String,
    brand: String,
    price: Number,
    stock: String,
    img: String,
    description: String,
    type: String
});

var orderSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    payment: String,
    product: String
});

var product = mongoose.model('product', productSchema);
var order = mongoose.model('order', orderSchema);
var app = express();


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser());

app.get('/', function(req, res) {
    product.find({}, function(err, products) {
        if (err) throw err;
        console.log(products)
        res.render('home', { product: products });

    });
});

app.get('/brand/:brand_name', function(req, res) {
    var brand_name = req.params.brand_name;
    product.find({
        brand: brand_name
    }, function(err, products) {
        if (err) throw err;
        res.render('category', { product: products });

    });

});

app.get('/category/:type', function(req, res) {
    var type = req.params.type;
    product.find({
        type: type
    }, function(err, products) {
        if (err) throw err;
        res.render('category', { product: products });

    });

});

app.get('/category/:type/brand/:brand_name', function(req, res) {
    var type = req.params.type;
    var brand_name = req.params.brand_name;
    product.find({
        type: type,
        brand: brand_name
    }, function(err, products) {
        if (err) throw err;
        res.render('category', { product: products });

    });

});

app.get('/product/:id', function(req, res) {
    var id = req.params.id;
    var brand_name = req.params.brand_name;
    product.find({
        _id: id,
    }, function(err, products) {
        if (err) throw err;
        res.render('eachproduct', { product: products[0] });

    });

});

app.get('/cart', function(req, res) {
    res.render('cart');
});

app.post('/buy_now', function(req, res) {
    console.log(req.body)
    var neworder = order(
        req.body
    );
    neworder.save(function(err, data) {
        if (err) throw err;
        res.json({ a: 1 });
    });
});

app.get('/order_placed', function(req, res) {
    res.render('success');
});


app.listen(8000, function() {
    console.log('Example app listening on port 8000!');
});