import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from 'axios';
import Logout from './Logout';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState("")

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3001/auth").then((response) => {
            if (response.data.loggedIn) {
                setIsLoggedIn(true);
                setUser(response.data.user[0].username+' ('+response.data.user[0].role+')');
            }
        });
    }, []);

    const login = event => {
        event.preventDefault();

        Axios.post('http://localhost:3001/log/in', {
            username: username,
            password: password
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                alert(JSON.stringify(response.data.message)); //error type
            } else {
                alert("Hello, "+response.data+"!"); //success
                window.location.reload();
            }
        });
    };

    return (
        <>
        {(isLoggedIn) 
            ? 
            <div className="pt-5">
                <h2>You are logged in, {user}!</h2>
                <Logout />
            </div>
            :
            <div className="login-container col-sm-4 mx-auto mt-5">
                <form onSubmit={login}>
                    <h2>Welcome!</h2>
                    <hr />
                    <div className="my-3">
                        <label className="form-label">Username</label>
                        <input 
                            className="form-control" 
                            id="userName" 
                            type="text" 
                            placeholder="Enter your username..." 
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="form-label">Password</label>
                        <input 
                            className="form-control" 
                            id="password" 
                            type="password" 
                            placeholder="Enter your password..." 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required 
                        />
                    </div>
                    <button className="login-btn col-12 mb-3">LOGIN</button>
                    <p className="text-muted link-text">New member? <Link to={"/register"}>Register</Link> here</p>
                </form>
            </div>
        }
        </>
    )
}

export default Login;