import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getnotes, editnote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" });
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const updatenote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }
   

    const handleClick = (e) => {
        refClose.current.click(); 
        editnote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Updated Successfully", "success");
    }

    const onchange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-etitle" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input onChange={onchange} value={note.etitle} type="text" className="form-control" id="etitle" name='etitle' aria-describedby="etitle" minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input onChange={onchange} value={note.edescription} type="text" className="form-control" id="edescription" name="edescription" minLength={5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input onChange={onchange} value={note.etag} type="text" className="form-control" id="etag" name="etag" />
                                </div>
                            </form>
                        </div>
                        
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length===0 && "No Notes to Display"}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} note={note} updatenote={updatenote} />
                    })
                }
            </div>
        </>
    )
}

export default Notes