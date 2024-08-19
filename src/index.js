import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { createBrowserRouter,Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Signup from './pages/Signup'
import AllPost from './pages/AllPost';
import AddPost from './pages/AddPost';
import AuthLayout from './components/AuthLayout';
import Post from './pages/Post';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<Home/>}> </Route>
      <Route path="/login" element={
        <AuthLayout  authentication = {false}> <LogIn/></AuthLayout>
       }> </Route>
      <Route path="/signup" element={
        <AuthLayout authentication={false}><Signup/></AuthLayout>
        }> </Route>
      <Route path="/all_post" element={
        <AuthLayout authentication ={false}><AllPost/></AuthLayout>
        }> </Route>
      <Route path="/add_post" element={
        <AuthLayout authentication><AddPost/></AuthLayout>
        }>
        </Route>
        <Route path='/post/:slug' element={<Post/>}></Route>
    </Route>
  ) 
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
   </React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
