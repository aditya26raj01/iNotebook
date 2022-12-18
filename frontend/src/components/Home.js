import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

function Home(props) {
  const context = useContext(noteContext);
  const navigate  = useNavigate();
  
  const { getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [])
  return (
    <div>
      <div className="container my-3">
      </div>
      <Notes showAlert={props.showAlert} />
    </div>
  )
};

export default Home;