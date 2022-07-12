import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added New Note Successfully","success");
    }

    const onchange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='container my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input onChange={onchange} type="text" className="form-control" id="title" name='title' aria-describedby="title" value={note.title} minLength={5} required/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input onChange={onchange} type="text" className="form-control" id="description" name="description" value={note.description} minLength={5} required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input onChange={onchange} type="text" className="form-control" id="tag" name="tag" value={note.tag} />
                    </div>

                    <button type="submit" onClick={handleClick}  disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote