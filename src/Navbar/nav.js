
// import style , customHook and Outlet for which childs navbar contain they will be show after navbar 
import style from "./nav.module.css"
import { useListHook } from '../Context/context'
import { Outlet } from 'react-router-dom'

// function navbar 
function Nav() { 
  // take message if user clcik to action then it will show
  const {errMsg , setErrMsg } =  useListHook();

  // use setTimeOut function because user not want if i click a action then message show always so we set  message is empty string after 2s. 
  if(errMsg){
    setTimeout(()=>{
     setErrMsg("")
    },2000)
  }

  // return JSX
  return (<>
    <div className={style.nav}>
       {/* use condiotionl rendring show message only if message is present*/}
        {errMsg ? <div className={style.err}>
                <h2 style={{color:"red"}}>{errMsg}</h2>
               </div>       
        : null 
        }
           <h1>List shows</h1>  
        </div>
        <Outlet/>
     </>
  )
}


export default Nav