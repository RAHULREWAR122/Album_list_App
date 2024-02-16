// Imports necessary dependencies and components
import { useListHook } from "../Context/context";
import style from "./list.module.css";
import { NavLink } from "react-router-dom";
import AddListForm from "./AddListForm";

// Defines the List component
function List() {
  // Destructures necessary variables and functions from the custom hook
  const { setForm, form, values, setValues, setErrMsg } = useListHook();

  // Defines function to handle deletion of an item
  const handleDelete = async (id) => {
    // Sends a DELETE request to the API to remove the item
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });

    // Filters out the deleted item from the list of values
    const removeItem = values.filter((item) => item.id !== id);
    setValues(removeItem);
    // Sets an error message indicating successful deletion
    setErrMsg("Delete Successfully");
  };

  // Defines function to display the add form
  const showForm = (e) => {
    // Sets the form state to true to display the form
    setForm(true);
    console.log("first");
  };

  // Renders the component
  return (
    <>
      {/* Conditionally renders the AddListForm component based on form state */}
      {form === true ? <AddListForm /> : null}

      {/* Renders the list of items */}
      <div className={style.list} style={{ marginTop: "20px" }}>
        {/* Renders a clickable div to show the add form */}
        <div onClick={showForm} id={style.card} style={{ cursor: "pointer" }}>
          <h2 style={{ color: "red" }}>Click to Add New Title</h2>
          <img
            className={style.img}
            src="https://cdn-icons-png.freepik.com/256/9492/9492741.png?ga=GA1.1.482976367.1699857719&semt=ais"
            alt=""
          />
        </div>

        {/* Maps over the list of values and renders each item */}
        {values.map((list) => {
          return (
            <div key={list.id} className="card" id={style.card}>
              <div className="card-body" id={style.cardBody}>
                <div className={style.idInfo}>
                  <h5 className="card-title">Id : {list.id}</h5>
                  <h5 className="card-title">UserId : {list.userId}</h5>
                </div>
                <p className="card-text">{list.title}</p>
                <div className={style.btns}>
                  {/* Renders links to update and remove each item */}
                  <NavLink
                    id={style.updateBtn}
                    to={`/${list.id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </NavLink>
                  <NavLink
                    to="/"
                    id={style.removeBtn}
                    onClick={() => handleDelete(list.id)}
                    className="btn btn-primary"
                  >
                    Remove
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Exports the List component
export default List;
