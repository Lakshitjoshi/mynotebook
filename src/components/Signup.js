import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup(props) {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name, email,password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name,email,password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/")
            props.showAlert("Account Created Successfully","success")
          }
          else{
            props.showAlert("Invalid Details","danger")
          }
    }
    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name 
          </label>
          <input
            onChange={onChange}
            value={credentials.name}
            name="name"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
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
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={onChange}
            value={credentials.cpassword}
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            minLength={5} required            
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
