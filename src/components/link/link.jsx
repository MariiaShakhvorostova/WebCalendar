/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./link.css";

const Link = ({ disabled, path }) => {
  const linkClass = disabled ? "link disabled" : "link";
  const tabIndex = disabled ? -1 : undefined;

  return (
    <div className="wrap">
      <a href={path || "#"} className={linkClass} tabIndex={tabIndex}>
        Link
      </a>
    </div>
  );
};

export default Link;

// Link component
// @param {Object} props - Component props
// @param {boolean} props.disabled - Determines if the link is disabled
// @param {string} props.path - The path the link should navigate to
//
// Usage examples:
// <Link disabled={false} path="/home" />
// <Link disabled={true} path="/about" />
