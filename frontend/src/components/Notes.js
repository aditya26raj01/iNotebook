import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
    const refOpen = useRef(null);
    const refClose = useRef(null);
    const context = useContext(noteContext);
    const { notes, editNote } = context;

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    const updateNote = (note) => {
        setNote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
        refOpen.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handelClick = (e) => {
        e.preventDefault();
        try {
            editNote(note.id, note.title, note.description, note.tag);
            refClose.current.click();
            props.showAlert("Sucessfully Added a Note", "success");
        } catch (error) {
            props.showAlert("Some error Occured!", "danger");
        }
        setNote({ id: "",title: "", description: "", tag: "" })
    }

    return (
        <>
            <button type="button" ref={refOpen} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" name="title" value={note.title} onChange={onChange} className="form-control" id="title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descriptioon" className="form-label">Description</label>
                                    <input type="text" value={note.description} onChange={onChange} name="description" className="form-control" id="description" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={note.tag} onChange={onChange} name="tag" className="form-control" id="tag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handelClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote showAlert={props.showAlert} />
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && "No Notes to Display"}
                </div>
                {notes.map((note, index) => {
                    return <NoteItem note={note} showAlert={props.showAlert} updateNote={updateNote} key={note._id} />;
                })}
            </div>
        </>
    )
};

export default Notes;