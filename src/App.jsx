import { useEffect, useState } from "react";
import Button from "./components/Button";
import NavBar from "./components/NavBar";
import "./index.css";
// const API_URL = process.env.REACT_APP_LOCALHOST;
const API_URL = import.meta.env.VITE_LOCALHOST;

function App() {
  const [users, setUsers] = useState([]);
 useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);
  console.log(users)
  return (
    <main>
      <div className="app-background">
        <NavBar />
        <div className="main-page">
          <h1>Terms</h1>
          <div className="button-wrapper">
            <Button />
            <div className="main-docs">
              <p>
                BY clicking Invoice Now, you choose to register according to the
                information that you have typed in and the text on the
                registration page and the terms here, and you at the same time
                accept the terms here.
              </p>
              <p>
                You can use the program FOR FREE for 14 days. 123 Fakturera is
                so easy and self-explanatory that the chance that you will need
                support is minimal, but if you should need support, we are here
                for you, with our office manned for the most part of the day.
                After the trial period, the subscription continues and costs SEK
                99 excluding VAT per month, which is billed annually. If you do
                not want to keep the program, just cancel the trial period by
                giving notice before 14 days from registration.
              </p>
              <p>
                You have of course the right to terminate the use of the program
                without any costs, by giving us notice per email before 14 days
                from registration, that you do not want to continue with the
                program, and you then of course do not pay anything.
              </p>
              <p>
                If we do not receive such a notice from you before 14 days from
                registration, then the order, for natural reasons, cannot be
                changed. With registration it is meant the date and time when
                you did choose to press the button Invoice Now.
              </p>
            </div>
            <Button />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
