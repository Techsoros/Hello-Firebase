import "./App.css";
import app from "./firebase/firebase.init";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});

  const googleSignInHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        alert("There is a problem ", error);
      });
  };
  const githubSignInHandler = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        alert("There is a problem ", error);
      });
  };
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        alert("Sign-Out Successful");
        setUser({});
      })
      .catch((error) => {
        alert("THere is a Problem");
        console.log(error);
        setUser({});
      });
  };
  return (
    <div className="App">
      <h2>Welcome to Firebase World</h2>
      {user.displayName || (
        <div className="button-box">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px auto",
              gap: "20px",
              borderRadius: "15px",
              padding: "10px 15px",
              outline: "0",
              border: "1px solid #ddd",
            }}
            onClick={googleSignInHandler}
          >
            <h4>Signup with</h4>
            <img
              src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png"
              alt=""
              width="50px"
            />
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 auto",
              gap: "20px",
              borderRadius: "15px",
              padding: "10px 15px",
              outline: "0",
              border: "1px solid #ddd",
            }}
            onClick={githubSignInHandler}
          >
            <h4>Signup with</h4>
            <img
              src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-3/24/github-256.png"
              alt=""
              width="50px"
            />
          </button>
        </div>
      )}

      {user.displayName && (
        <div className="">
          <div
            className="user-profile"
            style={{
              display: "flex",
              margin: "20px auto",
              justifyContent: "center",
              padding: "20px",
              border: "2px solid #ddd",
              borderRadius: "18px",
              maxWidth: "600px",
              gap: "20px",
            }}
          >
            <div className="user-img">
              <img
                src={user.photoURL}
                alt=""
                style={{ borderRadius: "9999px", maxWidth: "200px" }}
              />
            </div>
            <div className="user-body">
              <h3>name : {user.displayName}</h3>
              <p>email : {user.email || "githubnotProvided@gmail.com"}</p>
            </div>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 auto",
              gap: "20px",
              borderRadius: "15px",
              padding: "10px 15px",
              outline: "0",
              border: "1px solid #ddd",
            }}
            onClick={signOutHandler}
          >
            <h4>Sign-Out</h4>
            <img
              src="https://cdn4.iconfinder.com/data/icons/doodle-4/156/logout-256.png"
              alt=""
              width="30px"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
