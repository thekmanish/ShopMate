import asyncHandler from "./asyncHandler.js";
import CustomError from "./CustomError.js";
import users from "../model/userModel.js";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No Token Provided" });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid Token" });
      }
      req.loggedInUser = await users.findById(decoded._id);
      next();
    } catch (err) {
      console.log(err);
      return next(new CustomError("Not authorized", 401));
    }
  } else {
    return next(new CustomError("Not authorized", 401));
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid Token" });
      }
      const userDetails = await users.findById(decoded._id);
      if (userDetails.isAdmin === true) {
        req.adminUser = userDetails;
      } else {
        return next(new CustomError("Not authorized", 401));
      }
      next();
    } catch (err) {
      return next(new CustomError("Not authorized", 401));
    }
  } else {
    return next(new CustomError("Not authorized", 401));
  }
});
export { protect, adminProtect };
