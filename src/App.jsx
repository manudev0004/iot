import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Crousel from "./components/Crousel";
import Booking from "./components/Booking";
import { auth } from "./firebaseConfig"; // Import Firebase auth
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const history = useHistory(); // Use useHistory hook here

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setUser(null);
        history.push("/some-path"); // Redirect to homepage
      }
    });
    return () => unsubscribe();
  }, [history]);

  return (
    <div>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar user={user} />
          <div className="flex-grow">
            <Switch>
              <Route path="/signin">
                <Signin />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/book_slot">
                {user ? <Booking /> : <Redirect to="/signin" />}
              </Route>
              <Route path="/" component={Crousel} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
