import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Header() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
