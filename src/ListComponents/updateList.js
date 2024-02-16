import React, { useState } from "react";
import style from "./update.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useListHook } from "../Context/context";

function UpdateList() {
  // Retrieves necessary data and functions using the useListHook
  const { values, setValues, setErrMsg } = useListHook();
  const { id } = useParams();

  // Finds the item to update based on the id parameter
  const newValue = values.find((item) => item.id === Number(id));

  // Sets up state for the new title and user ID
  const [newTitle, setNewTitle] = useState(newValue.title);
  const [newUserId, setNewUserId] = useState(newValue.userId);

  // Function to update the list data
  const UpdateListData = async () => {
    try {
      // Sends a PUT request to update the item
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: newTitle,
          body: "bar",
          userId: newUserId,
          id: newValue.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // Updates the values array with the new data
      const updatedValues = values.map((item) =>
        item.id === newValue.id ? { ...item, title: newTitle, userId: newUserId } : item
      );
      setValues(updatedValues);
      setErrMsg("Update Successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Conditional rendering based on whether newValue is available or not
  if (!newValue) {
    return <div>Loading...</div>; // Or any loading indicator/message you prefer
  }

  // Renders the update form
  return (
    <div className={style.update}>
      <div className="card" id={style.card}>
        <div style={{ background: "brown" }} className="card-header">
          <h2 style={{ textAlign: "center" }}>Update Details</h2>
        </div>
        <div className="mb-3">
          <label id={style.label1} className="form-label">
            <h2>
              <span style={{ color: "red" }}>UserId</span> : {newValue.userId}
            </h2>
            <h2>
              <span style={{ color: "red" }}>id</span> : {newValue.id}
            </h2>
          </label>
          <input
            type="number"
            className="form-control"
            id="userIdInput"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            required
          />

          <label id={style.label2} className="form-label">
            <h2>
              <span style={{ color: "red" }}>title</span> : {newValue.title}
            </h2>
          </label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <section className={style.btn}>
            {/* Calls the UpdateListData function on click */}
            <NavLink onClick={UpdateListData} className={style.updateBtn}>
              Update
            </NavLink>
            <NavLink className={style.backBtn} to="/">
              Go to home
            </NavLink>
          </section>
        </div>
      </div>
    </div>
  );
}

export default UpdateList;
