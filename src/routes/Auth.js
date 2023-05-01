import React from "react";
import { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if(name === "email") {
        setEmail(value);
    } else if (name === "password") {
        setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
        let data;
        if (newAccount) {
          data = await authService.createUserWithEmailAndPassword(
            email,
            password
          );
        } else {
          data = await authService.signInWithEmailAndPassword(email, password);
        }
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
  }
  const toggleAccount = () => setNewAccount(prev => !prev);
  const onSocialClick = async(event) => {
    const name = event.target.name;
    let provider;
    if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
      console.log(data);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          required
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          required
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? 'Sign up' : 'Log in'} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Log In" : "Sign up"}
      </span>
      <div>
        <button name='google' onClick={onSocialClick}>Continue with Google</button>
        <button name='github' onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
