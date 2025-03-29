import React, { useContext } from 'react';
import { withAuth } from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import RestoreIcon from '@mui/icons-material/Restore';
import { Button, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Authcontext } from '../context/Authcontext.jsx';
import './Home.css'; // Import your CSS file for styling

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = React.useState('');
    const [code , setCode] = React.useState([])

    const { addHistory } = useContext(Authcontext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            alert("Please enter a valid meeting code.");
            return;
        }

        await addHistory(meetingCode);
        // Check if the meeting code is not empty before navigating
        navigate(`/${meetingCode}`);

    };

    const generateMeetingCode = () => {
        const Code = Math.floor(100000 + Math.random() * 900000);
        console.log(Code);
        setCode(Code.toString());
    }

    return (
        <>
            {/* Navbar */}
            <div className="navbar">
                <div className="navbar-logo" role='buttom' onClick={()=>{
                    navigate('/')
                }}>
                    <h3>LinkUp</h3>
                </div>
                <div className="navbar-actions">

                    <IconButton title='History' onClick={() => {
                        console.log("clicked history")
                        navigate("/history");
                    }}>
                        <RestoreIcon className="history-icon" />
                    </IconButton>

                    <Button className="logout-button" onClick={() => {
                        localStorage.removeItem('token');
                        navigate("/auth");
                    }}>
                        Logout
                    </Button>
                </div>
            </div>

            {/* Meeting Section */}
            <div className='meetContainer'>
                <div className="leftPanel">
                    <h2>Providing Quality Video Calls</h2>
                    <p className="description">
                        Join high-quality video calls with just a code.
                        Enter your meeting code and start connecting instantly.
                    </p>
                    <div className='input-container'>
                        <TextField
                            className="meeting-input"
                           value={code}
                            id="outlined-basic"
                            label="Meeting Code"
                            variant="outlined"
                        />
                        <Button className='join-button' variant="contained" onClick={generateMeetingCode}>Meeting code</Button>
                    </div>
                    <div className="input-container">
                        <TextField
                            className="meeting-input"
                            onChange={e => setMeetingCode(e.target.value)}
                            id="outlined-basic"
                            label="Meeting Code"
                            variant="outlined"
                        />
                        <Button className="join-button" variant="contained" onClick={handleJoinVideoCall}>Join</Button>
                        <Button className="join-button" variant="contained" onClick={() => {
                            navigate("/");
                        }}>Back</Button>
                    </div>
                </div>

                {/* Right Panel - Image */}
                <div className='rightPanel'>
                    <img src="../assets/undraw_conference-call_ccsp.png" alt="Video Call" />
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
