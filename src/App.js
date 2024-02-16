// import all necessary things like navbar , list to show all fetched data etc. 
import Nav from "./Navbar/nav";
import List from "./ListComponents/List";
import UpdateList from "./ListComponents/updateList";
// import route , routerprovider and createBrowserRouter to make url for different pages .
import {RouterProvider, createBrowserRouter } from "react-router-dom";

// we are use here context Api so that keep all most actions and some other htings inside this and we use it globally
import CustomContextProvider from "./Context/context";

// app function
function App() {

  // create routes 
  const route = createBrowserRouter([
      {path:"/" ,element :<Nav/> ,children :[
         {index:true , element:<List/>},
         {path :":id" ,element:<UpdateList/>},
         
      ]} 
  ]);

  return (
    <>
      
      {/* {/ *use customContext  */}  
   <CustomContextProvider>
        {/* router provider  */}
        <RouterProvider router={route}>
       {/* home page contains only navbar and lists */}
       <Nav/>
       <List/>
       </RouterProvider>
   </CustomContextProvider>   
    
    </>
  );
}

export default App;
