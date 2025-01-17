import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App.tsx';
import LoginRegister from './components/Login/LoginRegister.tsx';
import Header from './components/Header.tsx';
import Chats from './components/Chats.tsx';
import ChatScreen from './components/ChatScreen.tsx';
import ProfilePage from './components/ProfilePage.tsx';
import ProfileMenu from './components/ProfileMenu.tsx';
import './index.css';
import { AuthProvider } from './AuthContext.tsx';
import Footer from './components/Footer.tsx';
import WorkTypes from './components/WorkTypes.tsx';
import Map from './components/Map.tsx';

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
      element: <><App /><Footer/></>,
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
      path: '/chat/:chatId',
      element: (
        <>
          <Header backButton="/chat" />
          <ChatScreen />
        </>
      ),
    },
    {
      path: '/profile',
      element: (
        <>
          <Header backButton="/app" />
          <ProfileMenu />
        </>
      ),
    },
    {
      path: '/profile/edit',
      element: (
        <>
          <Header backButton="/profile" />
          <ProfilePage />
        </>
      ),
    },
    {
      path: '/types',
      element: (
        <>
          <Header backButton="/app" />
          <WorkTypes/>
        </>
      ),
    },
    {
      path: '/map',
      element: (
        <>
          <Header backButton="/app" />
          <Map/>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  </React.StrictMode>
);
