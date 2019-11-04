
//This file will contain all the details regarding the database connections

var express = require('express');
var router = express.Router();
var db = require('../db');
//creating a database 

router.get('/createdb',function(req,res){
	let sql = 'CREATE DATABASE nodeapp';
	db.query(sql, function(err,result){
		if(err)
		{ 
			throw err;
		}
		console.log(result);
		res.send('Database created');
	});
});


router.get('/createtable',(req,res)=> {
	let sql = 'CREATE TABLE products (id int(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,product_name varchar(255) DEFAULT NULL,sku varchar(50) DEFAULT NULL,price decimal(8,2) NOT NULL, is_active tinyint(1) NOT NULL,created_at datetime NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1';

	let query = db.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
		res.send('Entries Added...')
	});
});
// for creating table with the help of queries in javascript 
//goto localhost:3000/products/createtable
//dont run this again it gives the error that TABLE products already exixsts


//Remember you can just write the queries here in the code or you can just just run
//the same set of queries in the phpmyadmin
//that is easier and there you can also use their graphical user interface to execute sql queries


// INSERT INTO `products` (`id`, `product_name`, `sku`, `price`, `is_active`, `created_at`) VALUES
// (1, 'Mobile', 'mobile', '6000.00', 1, '2018-09-15 00:00:00'),
// (2, 'Laptop', 'laptop', '36000.00', 1, '2018-09-15 00:00:00'),
// (3, 'LED Bulb', 'led-blub', '150.00', 1, '2018-09-15 00:00:00'),
// (4, 'Television', 'Tele', '21150.00', 1, '2018-09-15 00:00:00'),
// (5, 'Mouse', 'Mouse', '150.00', 1, '2018-09-15 00:00:00');


router.get('/', function(req, res, next) {
	//we will see now how to write queries for a given database 
	var query = 'select * from products';
	//we use connection.query() because our database name that was created named after variable connection
	db.query(query, function(err,rows,fields){

		if(err) throw err;
		//res.json(rows[0]); //include square brackets part if you need individual data 
 		res.render('products', { title: 'products', products:rows });

	});
});

router.get('/create-form',function(req,res,next){
	res.render('createform',{title:'Create Product'});
});


//creating in a database 
router.post('/create',function(req,res,next){
	//createform mein input k jo bhi naam h will be used in req.body 
	var product_name = req.body.product_name;
	var price = req.body.price;
	var sku = req.body.sku;

	var sql = `INSERT INTO products (product_name,price,sku) VALUES ("${product_name}","${price}","${sku}" )`;
// thus we can insert values using queries in the code itself
	db.query(sql, function(err,result){
		if(err) throw err;
		res.redirect('/products');
	});
});

//updating in a database 
router.get('/edit-form/:id',function(req,res,next){
	var id= req.params.id;
	var sql = `SELECT * FROM products WHERE id='${id}' `;
	db.query(sql,function(err, rows, fields){
	res.render('editform',{title:'Update Product', product: rows[0]});

	});
});


router.post('/edit/:id',function(req,res,next){
	//createform mein input k jo bhi naam h will be used in req.body 
	var product_name = req.body.product_name;
	var price = req.body.price;
	var sku = req.body.sku;

	var id = req.params.id;

	var sql = `UPDATE products SET product_name="${product_name}",price ="${price}", sku="${sku}" WHERE id="${id}"`;
// thus we can insert values using queries in the code itself
	db.query(sql, function(err,result){
		if(err) throw err;
		res.redirect('/products');
	});
});

//deleting from a database 

router.get('/delete/:id',function(req,res,next){
	var id = req.params.id;
	var sql = `DELETE FROM products WHERE id =${id} `;
	db.query(sql, function(err,result){
		if (err) throw err;
		res.redirect('/products');
	});
});

module.exports = router;
