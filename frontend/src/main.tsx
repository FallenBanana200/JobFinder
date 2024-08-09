import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header.tsx';
import Chats from './components/Chats.tsx';
import ChatScreen from './components/ChatScreen.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <App />
    </>,
  },
  {
    path: '/chat',
    element: <>
      <Header backButton="/" />
      <Chats />
    </>,
  },
  {
    path: '/chat/:person',
    element: <>
      <Header backButton="/chat" />
      <ChatScreen/>
    </>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);