import React, { useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deletenote} = context;

    const { note, updatenote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="bi bi-pencil-square text-info mx-2" onClick={()=> {updatenote(note)}}></i>
                        <i className="bi bi-trash text-danger mx-2" onClick={()=> {deletenote(note._id)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem