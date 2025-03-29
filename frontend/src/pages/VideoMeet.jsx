import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import "../styles/videoMeet.css";
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import BackspaceIcon from "@mui/icons-material/Backspace";
import server from '../environment.js';

const server_url = server;

let connections = {}; // Changed from var to let

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {
    const socketRef = useRef();
    const socketIdRef = useRef();
    const localVideoref = useRef();
    const videoRef = useRef([]);

    const [videoAvailable, setVideoAvailable] = useState(true);
    const [audioAvailable, setAudioAvailable] = useState(true);
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const [screen, setScreen] = useState(false);
    const [showModal, setModal] = useState(false); // Changed initial state to false
    const [screenAvailable, setScreenAvailable] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [newMessages, setNewMessages] = useState(0);
    const [askForUsername, setAskForUsername] = useState(true);
    const [username, setUsername] = useState("");
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getPermissions();
        return () => {
            // Cleanup function
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            for (let id in connections) {
                if (connections[id]) {
                    connections[id].close();
                }
            }
            try {
                if (localVideoref.current && localVideoref.current.srcObject) {
                    localVideoref.current.srcObject.getTracks().forEach(track => track.stop());
                }
            } catch (e) { console.log(e); }
        };
    }, []);

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [video, audio]);

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen]);

    const getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .catch((e) => console.log(e));
            }
        }
    };

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoAvailable(!!videoPermission);
            console.log('Video permission:', !!videoPermission);

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioAvailable(!!audioPermission);
            console.log('Audio permission:', !!audioPermission);

            setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({
                    video: videoAvailable,
                    audio: audioAvailable
                });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    };

    const getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop());
        } catch (e) { console.log(e); }

        window.localStream = stream;
        localVideoref.current.srcObject = stream;

        for (let id in connections) {
            if (id === socketIdRef.current) continue;

            connections[id].addStream(window.localStream);

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                    })
                    .catch(e => console.log(e));
            });
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            } catch (e) { console.log(e); }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            localVideoref.current.srcObject = window.localStream;

            for (let id in connections) {
                connections[id].addStream(window.localStream);

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                        })
                        .catch(e => console.log(e));
                });
            }
        });
    };

    const getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .catch((e) => console.log(e));
        } else {
            try {
                if (localVideoref.current && localVideoref.current.srcObject) {
                    let tracks = localVideoref.current.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                }
            } catch (e) { console.log(e); }
        }
    };

    const getDislayMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop());
        } catch (e) { console.log(e); }

        window.localStream = stream;
        localVideoref.current.srcObject = stream;

        for (let id in connections) {
            if (id === socketIdRef.current) continue;

            connections[id].addStream(window.localStream);

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
                    })
                    .catch(e => console.log(e));
            });
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            } catch (e) { console.log(e); }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            localVideoref.current.srcObject = window.localStream;

            getUserMedia();
        });
    };

    const gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message);

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }));
                            }).catch(e => console.log(e));
                        }).catch(e => console.log(e));
                    }
                }).catch(e => console.log(e));
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
            }
        }
    };

    const connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false });

        socketRef.current.on('signal', gotMessageFromServer);

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href);
            socketIdRef.current = socketRef.current.id;

            socketRef.current.on('chat-message', addMessage);

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id));
                if (connections[id]) {
                    connections[id].close();
                    delete connections[id];
                }
            });

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections);

                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
                        }
                    };

                    connections[socketListId].onaddstream = (event) => {
                        setVideos(prevVideos => {
                            const existingVideo = prevVideos.find(v => v.socketId === socketListId);
                            if (existingVideo) {
                                return prevVideos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                            } else {
                                return [...prevVideos, {
                                    socketId: socketListId,
                                    stream: event.stream,
                                    autoplay: true,
                                    playsinline: true
                                }];
                            }
                        });
                    };

                    if (window.localStream) {
                        connections[socketListId].addStream(window.localStream);
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
                        window.localStream = blackSilence();
                        connections[socketListId].addStream(window.localStream);
                    }
                });

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue;

                        try {
                            connections[id2].addStream(window.localStream);
                        } catch (e) { console.log(e); }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }));
                                })
                                .catch(e => console.log(e));
                        });
                    }
                }
            });
        });
    };

    const silence = () => {
        let ctx = new AudioContext();
        let oscillator = ctx.createOscillator();
        let dst = oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        ctx.resume();
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
    };

    const black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height });
        canvas.getContext('2d').fillRect(0, 0, width, height);
        let stream = canvas.captureStream();
        return Object.assign(stream.getVideoTracks()[0], { enabled: false });
    };

    const handleVideo = () => {
        setVideo(!video);
    };

    const handleAudio = () => {
        setAudio(!audio);
    };

    const handleScreen = () => {
        setScreen(!screen);
    };

    const handleEndCall = () => {
        try {
            if (localVideoref.current && localVideoref.current.srcObject) {
                localVideoref.current.srcObject.getTracks().forEach(track => track.stop());
            }
        } catch (e) { console.log(e); }
        window.location.href = "/";
    };

    const openChat = () => {
        setModal(true);
        setNewMessages(0);
    };

    const closeChat = () => {
        setModal(false);
    };

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };

    const sendMessage = () => {
        if (message.trim() && socketRef.current) {
            socketRef.current.emit('chat-message', message, username);
            setMessage("");
        }
    };

    const connect = () => {
        if (username.trim()) {
            setAskForUsername(false);
            getMedia();
        }
    };

    return (
        <div className="video-container">
            {askForUsername ? (
                <div className="username-modal">
                    <div className="modal-content">
                        <h2>Enter into Lobby</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <button
                            onClick={connect}
                            disabled={!username.trim()}
                        >
                            Connect
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="video-grid">
                        {videos.map((video) => (
                            <div className="video-item" key={video.socketId}>
                                <video
                                    data-socket={video.socketId}
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                    playsInline
                                />
                            </div>
                        ))}
                    </div>

                    <video className="local-video" ref={localVideoref} autoPlay muted playsInline></video>

                    <div className={`chat-panel ${showModal ? 'open' : ''}`}>
                        <div className="chat-header">
                            <h3>Chat</h3>
                            <BackspaceIcon onClick={() => setModal(false)}> </BackspaceIcon>
                        </div>
                        <div className="chat-messages">
                            {messages.length > 0 ? (
                                messages.map((item, index) => (
                                    <div
                                        className={`message ${item.sender === username ? 'sent-message' : 'received-message'
                                            }`}
                                        key={index}
                                    >
                                        <div className="message-sender">
                                            {item.sender === username ? 'You' : item.sender}
                                        </div>
                                        <div className="message-text">{item.data}</div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', color: '#64748b' }}>No messages yet</p>
                            )}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={message}
                                onChange={handleMessage}
                                placeholder="Type your message..."
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </div>

                    <div className="controls-bar">
                        <button
                            className={`control-button ${video ? 'active' : ''}`}
                            onClick={handleVideo}
                        >
                            <div className="icon">{video ? <VideocamIcon /> : <VideocamOffIcon />}</div>
                            <div className="label">{video ? 'Video On' : 'Video Off'}</div>
                        </button>

                        <button
                            className={`control-button ${audio ? 'active' : ''}`}
                            onClick={handleAudio}
                        >
                            <div className="icon">{audio ? <MicIcon /> : <MicOffIcon />}</div>
                            <div className="label">{audio ? 'Mute' : 'Unmute'}</div>
                        </button>

                        {screenAvailable && (
                            <button
                                className={`control-button ${screen ? 'active' : ''}`}
                                onClick={handleScreen}
                            >
                                <div className="icon">{screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}</div>
                                <div className="label">{screen ? 'Stop Share' : 'Share Screen'}</div>
                            </button>
                        )}

                        <button
                            className="control-button end-call"
                            onClick={handleEndCall}
                        >
                            <div className="icon"><CallEndIcon /></div>
                            <div className="label">End Call</div>
                        </button>

                        <button
                            className="control-button"
                            onClick={() => setModal(!showModal)}
                        >
                            <Badge badgeContent={newMessages} color="orange">
                                <div className="icon"><ChatIcon /></div>
                            </Badge>
                            <div className="label">Chat</div>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}