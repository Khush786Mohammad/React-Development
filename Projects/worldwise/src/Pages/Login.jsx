import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import { useAuth } from "../contexts/FakeAuthContext";
import Button from "../Components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  const {isAuthenticated, login} = useAuth();

  useEffect(function(){
    if(isAuthenticated)
    {
      navigate("/app", { replace: true });
    }
    
  } , [navigate, isAuthenticated]);

  function handleLogin(e){
    e.preventDefault();
    login(email, password);
  }

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={(e)=>handleLogin(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          {/* <button onClick={(e)=>handleLogin(e)}>Login</button> */}
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
