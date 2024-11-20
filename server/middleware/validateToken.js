import jwt from "jsonwebtoken"

const validateToken = async(req, res, next) =>{
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "User is not authorized or token is missing" });
    return;
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "User is not authorized" });
    }

    req.user = decoded.user; 
    next(); 
  });
}

export default validateToken

// let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;

//   if(authHeader && authHeader.startsWith("Bearer")){
//     token = authHeader.split(" ")[1]
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if(err){
//         res.status(401);
//         throw new Error("User is not authorized");
//       }
//       req.user = decoded.user;
//       next();

//     })
//     if(!token) {
//       res.status(401)
//       throw new Error("User is not authorized or token is missing")
//     }
//   }