
//kahan lekar jaana h wo routes k file batayenge 
//kya lekar jaana h wo bhi routes k file batayenge 
//render likhne k baad upar likhi hui dono cheeze hoti h
//but jahan lekar jaayenge wo kaisa dikhega ye views k file batayenge 


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Framework' });
});
//get methods are those methods jismein information can be passed with the help of information itself 

router.get('/student/:id/course/:cid',function(req,res,next){
	// res.render('student',{result: req.params.id});
	//res.render('student',{course: req.params.cid});

	//at a time if any one of the infos from the url you want to access

	res.render('student',{result: req.params});
	//when you have access both the values in the url simultaneously

	//res.json(req.params);
	//this will make us receive the values in the json format


});
//the function is called the handler and it gets executed once the path gets matched

router.post('/student/submit',function(req,res,next){
	var id= req.body.Studentid;
	var cid= req.body.Courseid;
	res.redirect('/student/' + id + '/course/' + cid);
	//res.json(req.body);
	//this will give the data in the json format
});

module.exports = router;
