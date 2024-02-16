// import style and custom hook which return all values/data 
import style from "./form.module.css";
import { useListHook } from "../Context/context";

// component  form to add new data in list 
function AddLisTForm() {

  // first we get values which provide by customHook useListHook
  const { setForm ,  handleAddTitle ,title, setTitle , userId , setId} = useListHook();
  
  // function for hide form if user not wants to show form 
  const hideForm = (e) => {
    e.preventDefault();
    setForm(false);
    
  };
  
  // return JSX 
  return (
    <div className={style.showForm}>
      <form>
        <input
          type="number"
          value={userId}
          onChange={(e) => setId(e.target.value )}
          placeholder="Add new Id"
          required
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new title"
          required
       />
        <button onClick={handleAddTitle}>Add</button>
      </form>

      <div className={style.closeBtn}>
        <button className={style.close} onClick={hideForm}>
          Close
        </button>
       
      </div>
    </div>
  );
}

export default AddLisTForm;
