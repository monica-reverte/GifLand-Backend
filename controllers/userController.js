const User = require("../models/userModel");

const auth0Login = async (req, res) => {

    try {
  
      const user = await User.findOne({email : req.body.email});
      
      
      if(!user){
        
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
          });

        await newUser.save();
        return res.status(201).json({
          ok: true,
          user: { id: newUser._id, name: newUser.name, email: newUser.email }
    
        });     
      }
  
      return res
      .status(200)
      .json({
        ok: true, 
        user : { id: user._id, name: user.name, email: user.email }});
  
      
  
    } catch (err) {
      return res.status(503).json({
        ok: false,
        message: "Something happened"
      });
    }
  };

  module.exports = {auth0Login}