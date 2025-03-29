import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Authcontext } from "../context/Authcontext";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {

    const navigate = useNavigate();
  const { getUserHistory } = useContext(Authcontext);
  const [meeting, setMeeting] = useState([]);

  

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getUserHistory();
        setMeeting(history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []); // Removed meeting from dependencies




  return (
    <div style={{ padding: "2rem" }}>

    <IconButton onClick={()=>{
        navigate("/home");
    }}>
        <HomeIcon></HomeIcon>
    </IconButton>

      {meeting.length === 0 ? (
        <Typography variant="h6" color="red">
          No meeting history available.
        </Typography>
      ) : (
        meeting.map((item, index) => (
          <Card key={item._id || index} variant="outlined" sx={{ mb: 2, p: 2 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                Meeting Code: {item.meetingCode || "Unknown"}
              </Typography>
              <Typography variant="body2">
                Date: {(item.date).toLocaleString().padStart(2, "0")}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
