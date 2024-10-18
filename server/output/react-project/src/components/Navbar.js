import React, { useState } from 'react';
import "./../index.css";

const Header = () => {
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleNav = () => {
    setIsResponsive(!isResponsive);
  };


  return (
    <div className={`header ${isResponsive ? 'responsive' : ''} w-full fixed top-0 left-0 z-10 bg-gray-800 flex justify-between items-center p-4`}>
     

<nav className={`flex items-center space-x-4 ${isResponsive ? 'block' : 'hidden md:flex'}`}>
    <a href="#home" className="nav text-white hover:text-cyan-400 text-lg">Home</a>
    <a href="#aboutus" className="nav text-white hover:text-cyan-400 text-lg">About Us</a>
    <a href="#projects" className="nav text-white hover:text-cyan-400 text-lg">Projects</a>
    <a href="#achieve" className="nav text-white hover:text-cyan-400 text-lg">Achievements</a>
    <a href="#contact" className="nav text-white hover:text-cyan-400 text-lg">Contact</a>
</nav>
<a href="#logo" className="logo text-3xl font-bold text-white">Portfolio</a>
<button className="icon md:hidden text-white" onClick={toggleNav}>
    <i className="fa fa-bars"></i>
</button>
