import React, { useState } from "react";
import Header from "./Header/header.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Background from "./Background/background.jsx";
import Footer from "./Footer/footer.jsx";
import Login from "./Login/login.jsx";
import Signup from "./Signup/signup.jsx";
import UserCreated from "./UserCreated/usercreated.jsx";
import Search from "./Search/search.jsx";
import Admin from "./AdminInt/adminint.jsx";
import User from "./User/userint.jsx";
import Staff from "./Staffint/staffint.jsx";
import AddStaff from "./AdminInt/AddStaff/addStaff.jsx";
import BorrowForm from "./User/Borrowform/borrowform.jsx";
import Membership from "./User/Membership/membership.jsx";
import Borrow from "./User/Borrow/borrow.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Background />
          <Footer />
        </>
      ),
    },
    {
      path: "/search",
      element: (
        <>
          <Header />
          <Search logged={false} />
          <Footer />
        </>
      ),
    },
    {
      path: "/collection",
      element: (
        <>
          <Header />
          <Background />
          <Footer />
        </>
      ),
    },
    {
      path: "/services",
      element: (
        <>
          <Header />
          <Background />
          <Footer />
        </>
      ),
    },
    {
      path: "/resources",
      element: (
        <>
          <Header />
          <Background />
          <Footer />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Header />
          <Background />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: <Login user="User" />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/success",
      element: <UserCreated />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/stafflogin",
      element: <Login user="Staff" />,
    },
    {
      path: "/staff",
      element: <Staff />,
    },
    {
      path: "/adminlogin",
      element: <Login user="Admin" />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/addstaff",
      element: <AddStaff />,
    },
    {
      path: "/borrowform",
      element: <BorrowForm />,
    },
    {
      path: "/membership",
      element: <Membership />,
    },
    {
      path: "/borrow",
      element: <Borrow />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
