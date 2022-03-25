import React from "react";
import "./styles/Menu.css";

export default function Menu() {
  return (
    <div className='app-menu text-light'>
      <h1 className='logo-text'>Photos App</h1>
      <ul className='main-menu-container'>
        <li className='menu-item'>Home</li>
        <li className='menu-item'>Photos</li>
        <li className='menu-item'>Abouct</li>
        <li className='menu-item'>Contact</li>
      </ul>
    </div>
  );
}
