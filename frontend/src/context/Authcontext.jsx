import axios from "axios";
import { createContext, useContext, useState } from "react";
import server from "../environment.js";

export const AuthContext = createContext({}); // ✅ Fix: Renamed to AuthContext

const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name,
        username,
        password,
      });
      if (request.status === 201) {
        return request.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username,
        password,
      });

      if (request.status === 200) {
        localStorage.setItem("token", request.data.token); // Store token for future requests
      }
    } catch (error) {
      throw error;
    }
  };

  const getUserHistory = async () => {
    try {
      let request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });
      return request.data.meeting;
    } catch (error) {
      console.log(`message: ${error.message}`);
      console.log("error in getUserHistory");
    }
  };

  const addHistory = async (meetingCode) => {
    try {
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meetingCode: meetingCode, // ✅ Fix: Correct key name
      });
      return request;
    } catch (error) {
      console.log(`message: ${error.message}`);
      console.log("error in addHistory");
    }
  };

  return (
    <AuthContext.Provider value={{ handleRegister, handleLogin, getUserHistory, addHistory }}>
      {children}
    </AuthContext.Provider>
  );
};
