import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handelClick = (e) => {
        e.preventDefault();
        try {
            addNote(note.title, note.description, note.tag);
            props.showAlert("Sucessfully Added a Note", "success");
        } catch (error) {
            props.showAlert("Some error Occured!", "danger");
        }
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" value={note.title} id="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptioon" className="form-label">Description</label>
                    <input type="text" name="description" className="form-control" value={note.description} id="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" name="tag" className="form-control" value={note.tag} id="tag" onChange={onChange} />
                </div>

                <button type="submit" disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} className="btn btn-primary" onClick={handelClick}>Submit</button>
            </form>
        </>
    )
};

export default AddNote;