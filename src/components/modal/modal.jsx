/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./modal.css";

const Modal = ({ title, content, onClose, actions }) => {
  return (
    <>
      <>
        <div className="modal-overlay"></div>
        <div className="modal">
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <img
              src="/src/assets/imgs/x.png"
              alt="Close"
              className="close-icon"
              onClick={onClose}
            />
          </div>
          <div className="modal-line"></div>
          <div className="modal-content">
            <p>{content}</p>
            <div className="modal-actions">{actions}</div>
          </div>
        </div>
      </>
    </>
  );
};

export default Modal;
// Modal component
// @param {Object} props - Component props
// @param {string} props.title - The title of the modal
// @param {string} props.content - The content of the modal
// @param {function} props.onClose - Function to be called when the modal is closed
//
// Usage examples:
// <Modal title="Title" content="Lorem ipsum dolor sit amet." />
