import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white  text-black py-8">
      <div className="container m-4 px-4 flex justify-between items-center">
        <p className="text-black-400 font-bold">
          &copy; {new Date().getFullYear()} CRMS Inc. All rights reserved.
        </p>
        <div className="space-x-8">
          <a href="/terms" className="text-sm text-black-400 font-bold hover:text-white">
            Terms of Service
          </a>
          <a href="/privacy" className="text-sm text-black-400 font-bold hover:text-white">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
