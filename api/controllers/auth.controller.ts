import User from "../models/User.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignInController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const foundUser: any = await User.findOne({ username });
    if (!foundUser) {
      return res.status(404).json({
        message: "Incorrect credentials",
        success: false,
      });
    }
    const checkPassword = bcryptjs.compareSync(
      password.toString(),
      foundUser.password
    );

    if (!checkPassword) {
      return res.status(404).json({
        message: "Incorrect credentials",
        success: false,
      });
    } else {
      const expiryTime = new Date(Date.now() + 3600000);

      const token = jwt.sign(
        { id: foundUser._id },
        process.env.PRIVATE_KEY as string
      );
      const { password, ...rest } = foundUser._doc;
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryTime,
        })
        .status(200)
        .json({ success: true, user: rest });
    }
  } catch (err) {
    next(err);
  }
};

export const SignOutController = (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(201)
    .json({ success: true, message: "User signed out" });
};

export const SignUpController = async (req, res, next) => {
  const { username, company, email, password: userPassword, name } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser || existingEmail) {
      return res.status(404).json({
        success: false,
        message: "Unable to create this user. Please try again",
      });
    }

    const hashedPassword = bcryptjs.hashSync(userPassword, 10);
    const user = new User({
      username,
      company,
      email,
      password: hashedPassword,
      name,
    });
    const newUser: any = await User.create(user);

    const token = jwt.sign(
      { id: newUser._id },
      process.env.PRIVATE_KEY as string
    );
    const expiryDate = new Date(Date.now() + 3600000);

    const { password, ...rest } = newUser._doc;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expiresIn: expiryDate,
      })
      .status(201)
      .json({
        success: true,
        user: rest,
        message: "User created successfully",
      });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};
