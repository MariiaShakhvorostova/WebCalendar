/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ColorPicker from "../color/color";
import Button from "../button/button";

import "./editCalendar.css";

const EditCalendarModal = ({ calendar, onSave, onClose }) => {
  const [title, setTitle] = useState(calendar.title);
  const [color, setColor] = useState(calendar.color);

  const handleSave = () => {
    onSave({ ...calendar, title, color });
    onClose();
  };

  return (
    <div className="edit-calendar-modal">
      <div className="modal-header-edit">
        <h2>{calendar.id ? "Edit Calendar" : "Create calendar"}</h2>
        <button className="close-edit-button" onClick={onClose}></button>
      </div>
      <div className="edit-line"></div>
      <div className="edit-calendar-form">
        <div className="title-icon-container">
          <div className="title-icon"></div>

          <div className="form-group">
            <label className="title-label">Title</label>
            <input
              placeholder="Enter title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="color-icon-container">
          <div className="color-icon"></div>
          <div className="form-group">
            <ColorPicker value={color} onColorSelect={setColor} />

            <div className="save-button">
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCalendarModal;
