import React, { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    const [alert, setAlert] = useState({type:"",message:""});
    
    const showAlert = ()=>{
        
    }

    return (
        <AlertContext.Provider value={{alert:alert}} >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;