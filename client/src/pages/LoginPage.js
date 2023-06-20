import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {

  const defForm = { email: "", password: "" }
  const [formData, setFormData] = useState(defForm)
  const [loginResult, setLoginResult] = useState("")
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    const query = await fetch("/api/user/auth", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await query.json();

    if (result && !result.err && result.data && result.data.token) {
      setLoginResult("success");
      localStorage.setItem("auth-token", result.data.token);
      setUser(result.data.user)
      navigate("/");
    } else {
      setLoginResult("fail");
    }
  };


  return (
    <>
      <h1>Login Page</h1>

      <form className="form mb-3">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="john@gmail.com"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mt-2">
          <button className="btn btn-primary" onClick={handleFormSubmit}>Log Me In!</button>
        </div>
      </form>

      {loginResult === "success" && (
        <div className="alert alert-success" role="alert">
          Login successful!
        </div>
      )}

      {loginResult === "fail" && (
        <div className="alert alert-danger" role="alert">
          Login failed!
        </div>
      )}
    </>
  )
}

export default LoginPage
