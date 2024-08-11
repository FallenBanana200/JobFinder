import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App.tsx';
import LoginRegister from './components/Login/LoginRegister.tsx';
import Header from './components/Header.tsx';
import Chats from './components/Chats.tsx';
import ChatScreen from './components/ChatScreen.tsx';
import './index.css';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (success: boolean) => {
    setIsAuthenticated(success);
  };

  return { isAuthenticated, login };
};

function MainRouter() {
  const { isAuthenticated, login } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <Navigate to="/app" replace /> : <LoginRegister onLogin={login} />,
    },
    {
      path: '/app',
      element: <App />,
    },
    {
      path: '/chat',
      element: (
        <>
          <Header backButton="/app" />
          <Chats />
        </>
      ),
    },
    {
      path: '/chat/:person',
      element: (
        <>
          <Header backButton="/chat" />
          <ChatScreen />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);