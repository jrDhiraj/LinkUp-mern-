import httpStatus from "http-status";
import { User } from "../models/users.models.js";
import { Meeting } from "../models/meeting.models.js";
import bcrypt, { hash } from "bcrypt";
import crypto from 'crypto'

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Please enter both username and password" });
  }

  try {
      // Use findOne to get a single user document
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
      }

      console.log(user);

      // Compare passwords using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid username & password" });
      }
      
      // Generate a token
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;

      // Save the user document
      await user.save();

      return res.status(httpStatus.OK).json({ token, user });

  } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: `Something went wrong: ${error.message}` });
  }
};


const register = async (req, res) => {
    const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "Username already exists" });
    }
    const hashesPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashesPassword,
    });
    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User Register" });
  } catch (error) {
    res.json({ message: `Something went wrong ${error}` });
  }
};

const getUserHistory = async(req , res) =>{
  const token = req.query;
  try {
    const user = await User.findOne({token:token});
    const meeting = await Meeting.find({user_id:user.username});
    res.json({meeting});
  } catch (error) {
    console.log(`message: ${error.message}`);
    console.log("error in getuserHistory")
  }
}

const addHistory = async(req, res) =>{
  const {token , meetingCcode } = req.body;

  try {
    const user = await User.findOne({token:token});

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meetingCcode,
      date: new Date(),  
    })
    await newMeeting.save();
    res.status(httpStatus.CREATED).json({message:"new Meeting Created"});

  } catch (error) {
    console.log(`message: ${error.message}`);
    console.log("error in addHistory")
    
  }
}
export {login , register, getUserHistory, addHistory};
