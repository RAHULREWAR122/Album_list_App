// importing useState, useEffect , createContext and useContext
import { createContext, useContext, useEffect, useState } from "react";

// fiirst we createContext as listContext
const ListContext = createContext();

// make a custom hook which return all things which we will define inside ListContext , it work as a provider
function useListHook() {

  const value = useContext(ListContext);
  return value;

}

// this is the function which we use inside App.js (main folder which contains all data that present in this function);
const CustomContextProvider = ({ children }) => {
  // declare hooks  
  const [form, setForm] = useState(false);
  const [values, setValues] = useState([]);
  const [title, setTitle] = useState("");
  const [userId, setId] = useState("");
  const [errMsg ,setErrMsg] = useState("");   
  
  
  // use usEffect for fetching data form Api and set data in values
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
      // set response in values
      setValues(data)
    });
  }, []);

  


// handle addtitle with post request for api
const handleAddTitle = (e) => {
    e.preventDefault();    
    // Set the new ID
    const newId = values.length + 1;
    // Send POST request to add new item
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body: 'bar',
        userId,
        id: newId, 
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // check user fill both inputs userd and title if not then return and show message
        if (userId === "" || title === "") {
            setErrMsg("both fields are required");
          return; // Exit the function early
        }else{     
          // send data and show message
        setErrMsg("Added Successfully");
        // Update context state with new item
        setValues([...values , { userId, title, id: newId }]);
      }
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  
      // now if user click to add then after inputs area null
    setId("");
    setTitle("");
     
  };
    
 
  // return JSX and send values which is useful of components
  return (
    <>
      <ListContext.Provider
        value={{ form, setForm, values, setValues ,handleAddTitle ,title , setTitle , userId , setId , errMsg ,setErrMsg} }
      >
        {children}
      </ListContext.Provider>
    </>
  );
};


export default CustomContextProvider;
export { useListHook, ListContext };
