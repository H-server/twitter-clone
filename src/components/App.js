import Router from "./Router";
import { useState, useEffect } from "react";
import { authService } from '../fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState();
  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
    <>
    {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing...'}
    <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;