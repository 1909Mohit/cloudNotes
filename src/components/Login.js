import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "@gmail.com", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Logged in Successfully","success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid credentials", "danger");
        }
    };

    const onchange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h2 className='mb-3'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' placeholder='atleast 5 characters' value={credentials.password} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login