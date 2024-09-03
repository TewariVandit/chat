import Signup from './components/Signup';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from '.';
import "./WhatsAppConnect.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },

])

function App() {
  const [dis, setDis] = useState(true);

  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(`${BASE_URL}`, {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }

  }, [authUser]);

  return (
    <>
      {
        dis ? (
          <div className="whatsapp-connect">
            <header className="header">
              <div className="header-content">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp Logo"
                  className="logo"
                />
                <h1 className="title">WHATSAPP WEB</h1>
              </div>
            </header>

            <div className="content">
              <div className="download-section">
                <div className="download-card">

                  <div>

                    <img
                      src="ui.png"
                      alt="Download Icon"
                      className="download-icon"
                    />
                  </div>

                  <div className="download-text">
                    <h2 onClick={() => setDis(!dis)}>Get into App</h2>
                  </div>
                  <div>
                    <button className="download-button">Get the app</button>
                  </div>

                </div>
              </div>

              <div className="qr-section">
                <div>

                  <h2>Use WhatsApp on your computer</h2>
                  <ol className="ff">
                    <li>1. Open WhatsApp on your phone</li>
                    <li>2. Tap <strong>Menu</strong> <span>⋮</span> on Android, or <strong>Settings</strong> <span>⚙️</span> on iPhone</li>
                    <li>3. Tap <strong>Linked devices</strong> and then <strong>Link a device</strong></li>
                    <li>4. Point your phone at this screen to capture the QR code</li>
                  </ol>
                </div>
                <div className="qr-code">
                  <img

                    src="data:image/png;base64,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"
                    alt="QR Code"
                  />
                </div>
              </div>
              <hr />

              <div className="link-phone-number">

                <a href="/" >Link with phone number</a>

              </div>
              <div className="hep"><br />
                <h1>Tutorial</h1>
                <p>Need help to get started?</p><br /><br />
                <img src="help.png" alt="" />
              </div>
            </div>
          </div>
        ) : (
          <RouterProvider router={router} />
        )
      }
    </>

  );
}

export default App;
