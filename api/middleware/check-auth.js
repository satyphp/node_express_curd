 

module.exports=(req,res,next)=>{
        
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'secrate', function (err, tokendata) {
          if (err) {
            return res.status(400).json({ messgae: "Invalide token" });
          } else {
            decodetokendata = tokendata;
            
            next();
          }
        })
}