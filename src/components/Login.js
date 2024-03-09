import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(props) {

    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`,{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert("Logged in Successfully","success")
            navigate("/")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="mt-3">
      <h2>Login to continue to MyNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            value={credentials.email}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={credentials.password}
            name="password"
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
