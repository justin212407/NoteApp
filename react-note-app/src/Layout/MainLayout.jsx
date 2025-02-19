import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = ({ searchText, handleSearchText }) => {
  return (
    <>
      <Navbar searchText={searchText} handleSearchText={handleSearchText} />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default MainLayout;
