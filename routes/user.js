//---------------------------------------------signup page ------------------------------------------------------
exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var name= post.username;
       var pass= post.password;
       var dob= post.dob;
       var mail= post.mail;
 
       var sql = "INSERT INTO `m_users`(`name`,`dob`,`email`, `password`) VALUES ('" + name + "','" + dob + "','" + mail + "','" + pass + "')";
 
       var query = db.query(sql, function(err, result) {
 
          message = "Account created succesfully!";
          res.render('signup.ejs',{message: message});
          console.log("succesfully Created Your Account!");
         // res.redirect('/login');
          
       });
 
    } else {
       res.render('signup');
    }
 };
  

 //-----------------------------------------------login page call------------------------------------------------------
 exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var mail= post.mail;
      var pass= post.password;
     
      var sql="SELECT id, name, dob, email FROM `m_users` WHERE `email`='"+mail+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
         console.log("succesfully logged user " + results[0].id);

            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};


 //------------------------------------logout functionality----------------------------------------------
 exports.logout=function(req,res){
   req.session.destroy(function(err) {
     console.log("succesfully log out");
      res.redirect("/login");
   })
};


 //-----------------------------------------------dashboard page functionality----------------------------------------------
            
 exports.dashboard = function(req, res, next){
            
   var user =  req.session.user,
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `m_users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};


 //--------------------------------render user movielist after login--------------------------------
 exports.list = function(req, res){
 
   var userId = req.session.userId;
 ;
   if(userId == null){
      res.redirect("/login");
      return;
   }


      var sql="SELECT * FROM `watchedlist` WHERE `userid`='"+userId+"'" ;          
      db.query(sql, function(err, data){  
         console.log("succesfully goes to list");
         res.render('list.ejs',{watchlist2:data,x:1});
        
      });
   

  
};

 //---------------------------------------------addmovie page call------------------------------------------------------
 exports.addmovie = function(req, res){
            
   message = '';
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
  else if(req.method == "POST"){
         var post  = req.body;
         var mname= post.mname;
         var ryear= post.ryear;
         var actors = post.actors;
         var actress = post.actress;
         var genre= post.genre;
         var category = post.category;
         var imdb = post.imdb;
         var myrate = post.myrate;
         var wtimes= post.wtimes;
         var wyear = post.wyear;
         var url = post.url;
         var inlist = post.inlist;
         var notes = post.notes;
         var userId = userId;
         
   
         var sql = "INSERT INTO `watchedlist`(`userid`,`mname`,`ryear`,`actors`,`actress`,`genre`, `category`,`imdb`,`myrate`,`wtimes`,`wyear`,`url`,`inlist`,`notes` ) VALUES ('" + userId + "','" + mname + "','" + ryear + "','" + actors + "','" + actress + "','" + genre + "','" + category + "','" + imdb + "','" + myrate + "','" + wtimes + "','" +wyear  + "','" + url + "','" + inlist + "','" + notes + "')";
   
         var query = db.query(sql, function(err, result) {
   
      
      
      
            console.log("succesfully added movie to user "+userId);
            res.redirect('/home/list/addmovie');
         });
   
      }
      else {
         res.render('addmovie.ejs',{message: message});
      } 
         
};



 //--------------------------------render user details after login--------------------------------
 exports.profile = function(req, res){
 
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `m_users` WHERE `id`='"+userId+"'";          
    db.query(sql, function(err, result){  
       res.render('profile.ejs',{data:result});
    });
 };



 //--------------------------------render my wishlist after login--------------------------------
 exports.wishlist = function(req, res){
 
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `wishlist2` WHERE `userid`='"+userId+"'" ;          
   db.query(sql, function(err, data){  
      console.log("succesfully goes to mywish list" );
      res.render('wishlist.ejs',{watchlist2:data});
     // console.log("succesfully ljj");

   });
};

 //---------------------------------edit users details after login----------------------------------
 exports.editprofile=function(req,res){
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `m_users` WHERE `id`='"+userId+"'";
    db.query(sql, function(err, data){
       res.render('edituser.ejs',{data:data});
    });
 };

 //---------------------------------edit movie details after login----------------------------------
 exports.editmovie=function(req,res){
   var id = req.params.id;
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `watchedlist` WHERE `mid`= ? and userid=?";
   db.query(sql,[id,userId], function(err, data){
      res.render('editmovie.ejs',{editData:data[0]});
      console.log("Edit "+id);
      
   });
};


 //---------------------------------update movie details after login----------------------------------
 exports.updatemovie=function(req,res,next){
   var id = req.params.id;
   
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var post  = req.body;
         var mname= post.mname;
         var ryear= post.ryear;
         var actors = post.actors;
         var actress = post.actress;
         var genre= post.genre;
         var category = post.category;
         var imdb = post.imdb;
         var myrate = post.myrate;
         var wtimes= post.wtimes;
         var wyear = post.wyear;
         var url = post.url;
         var inlist = post.inlist;
         var notes = post.notes;
         var userId = userId;

   var sql="UPDATE watchedlist SET mname=?, ryear=?, actors=?, actress=?, genre=?, category=?, imdb=?, myrate=?, wtimes=?, wyear=?, url=?, inlist=?, notes=?   WHERE mid =? and userid=?";
   db.query(sql,[mname,ryear,actors,actress,genre,category,imdb,myrate,wtimes,wyear,url,inlist,notes,id,userId], function(err, data){
     
      console.log("updated movie "+id);
      res.redirect('/home/list/');
   });
};


 //--------------------------------- details after login----------------------------------
 exports.details=function(req,res){
   var id = req.params.id;
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `watchedlist` WHERE `mid`= ? and userid=?";
   db.query(sql,[id,userId], function(err, data){
      res.render('details.ejs',{details:data[0]});
      console.log("details "+id);
      
   });
};


 
 //--------------------------------- details delete after login----------------------------------
 exports.deletemovie=function(req,res,next){
   var id = req.params.id;
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="DELETE FROM `watchedlist` WHERE `mid`=? and userid=?";
   db.query(sql,[id,userId], function(err, results){
      console.log("deleted" + id);
      res.redirect("/home/list");
   });
};


 //--------------------------------- details sort list after login----------------------------------
 exports.sort=function(req,res,next){
   var id = req.params.id;
 
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
  
      var sql="SELECT * FROM `watchedlist` WHERE userid=?  ORDER BY `mid` DESC";
      db.query(sql,[userId], function(err, data){
         console.log("listed");
         res.render('list.ejs',{watchlist2:data,x:0});
      });
   

  

   
};



 

 