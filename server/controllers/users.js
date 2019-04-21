const User = require('../model/users');
const MongooseHelpers = require("../helpers/mongoose");
const jwt = require ('jsonwebtoken');
const config = require ('../config/dev');





exports.auth = function(req,res){
    const {email, password} = req.body;
    
    if(!password || !email){
        return res.status(422).send({errors:[{title:"Data missing", details:"Provide password & email ID"}]});
    }
    User.findOne({email},function(err,user){
        if(err){
            return res.status(422).send({ errors : MongooseHelpers.normalizeErrors(err.errors)});
        }
        if (!user){
            return res.status(422).send({errors:[{title: 'Invalid User!', details:'User does not exists'}]});
        }



         if (user.isPasswordCorrect(password)){
            // return JWT token
          const token = jwt.sign({
                userId: user.id,
                username: user.username
              }, config.SECRET , { expiresIn: '1h'});
            

        const temp = {
            success:[{
                title: "Got it" 
            }]
        }

        return res.json(token);

        }else{
            return res.status(422).send({errors:[{title: 'Wrong Data', details:'Invalid email or password'}]});
        }
    })

   
}

exports.register = function(req,res){

   const {username, email, password, passwordConfirmation} = req.body;

   if(!password || !email){
    return res.status(422).send({errors:[{title:"Data missing", details:"Provide password & email ID"}]});
   }
   if(password !== passwordConfirmation){
    return res.status(422).send({errors:[{title:"Password Mismatch", details:"Password mismatch!"}]});
   }

   User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({ errors : MongooseHelpers.normalizeErrors(err.errors)});
        }
        if(existingUser){
            
            return res.status(422).send({errors:[{title:"Invalid email", details:"This email already exists"}]});
        }

        const user = new User({
            username,
            email,
            password
        })

        user.save(function(err){
            if (err){
                return res.status(422).send({ errors : MongooseHelpers.normalizeErrors(err.errors)});
            }

            return res.json({ 'registered': true})
        })
   })


}

exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;
   
    

    if (token){
        const user = parseToken(token);
     
    
        User.findById(user.userId, function (err, user){
            if (err){
                return res.status(422).send({ errors : MongooseHelpers.normalizeErrors(err.errors)});
            }

            if (user){
                res.locals.user = user;
                next();
            } else{
                return res.status(422).send({errors:[{title:"Not Authorized", details:"You need to Login to get access!"}]});
            }

        })

    } else {
        return res.status(422).send({errors:[{title:"Not Authorized", details:"You need to Login to get access!"}]});
    }
}

function parseToken(token){
    console.log(jwt.verify(token.split(' ')[1], config.SECRET));
    return jwt.verify(token.split(' ')[1], config.SECRET);
}