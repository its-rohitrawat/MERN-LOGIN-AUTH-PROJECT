
import jwt from "jsonwebtoken"
export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(400).json({
        success: false,
        message : "Access Token is missing or invalid"
      });

      const token = authHeader.split(" ")[1]
      try {
        let decodedInfo = jwt.verify(token, process.env.JWT_SECRET)
        const {id} = decodedInfo;
        const user = await User.findByID(id)
        if(!user) {
            return res.status(400).json({
                success: false,
                message :"User not found",
            })
            res.userId = user._id
            next()
        }
      } catch (error) {
        if(error.name == "TokenExpiredError"){
            return res.status(400).json({
                success : false,
                message : "accessToken has expired, useRefersh token to generate new accessToken"
            })
        }
        return res.status(400).json({
        success : false,
        message : error.message
      })
      }
      

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
