import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = process.env.host;
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    //Get all note
    const getnotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
     
        setNotes(json)
    }

    //Add a note
    const addnote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    //Delete a Note
    const deletenote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        
        const newNote = notes.filter((note) => { return note._id !== id; })
        setNotes(newNote);
        props.showAlert("Deleted Successfully", "success");
    }


    //Edit a Note
    const editnote = async (id, title, description, tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
       

        let newNotes = JSON.parse(JSON.stringify(notes));
        //logic to edit in client side
        for (let index = 0; index < newNotes.length; index++) {
            
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
       
    }


    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
