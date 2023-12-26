import React, { useEffect, useState } from "react";
import "./style.css";

//router dependencies
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//remote data storage dependencies
import { authDataSource } from "../../../core/dataSource/remoteDataSource/auth";

//local data storage dependencies and helpers
import { loggedIn } from "../../../core/dataSource/localDataSource/user";
import { local } from "../../../core/helpers/localstorage";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = { email: email, password: password };
    try {
      const response = await authDataSource.login(data);
      local("token", response.token);
      local("type", response.user.userType);

      const { user } = response;

      dispatch(
        loggedIn({
          email: user.email,
          name: user.name,
          address: user.address,
          phone: user.phone,
          userType: user.userType,
          chatSessions: user.chatSessions,
          cart: user.cart,
          image: user.image,
          token: response.token,
        })
      );
      navigateTo("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="login-section">
      {Array.from({ length: 228 }, (_, i) => (
        <span key={i}></span>
      ))}
      <div className="signin">
        <div className="content">
          <img src="./favicon.png" alt="logo" />

          <h2>log in</h2>

          <div className="sign-up-part">
            <p>New Member?</p>
            <Link to="/sign-up">
              <h4>Signup</h4>
            </Link>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i>email</i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>Password</i>
            </div>

            <p className="forgot-password_link">Forgot Password</p>
            {error && <p className="error">{error}</p>}
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
