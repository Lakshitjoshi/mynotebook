import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial=[]         
    const [notes, setNotes] = useState(notesInitial)

    //GET ALL NOTES
    const getNotes=async()=>{
      //api call
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlZGRmYmE1MjBmM2ZlMzExYTU1MGJhIn0sImlhdCI6MTcwODk2NjY4Nn0.e0a7qJ5IycBDVV8WiyP2VTvFtvW0s2q6ntmMU1PlSdc"
        }
      }); 

      const json = await response.json();
      setNotes(json);

      
    }
    //Add a note
    const addNote=async(title,description,tag)=>{
      //api call
      const response = await fetch(`${host}/api/notes/addnote`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlZGRmYmE1MjBmM2ZlMzExYTU1MGJhIn0sImlhdCI6MTcwODk2NjY4Nn0.e0a7qJ5IycBDVV8WiyP2VTvFtvW0s2q6ntmMU1PlSdc"
        },
        body: JSON.stringify({title,description,tag})
      }); 
      const json = await response.json();
      setNotes(notes.concat(json));
    }

    //Delete a note
    const deleteNote=async(id)=>{
      //api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlZGRmYmE1MjBmM2ZlMzExYTU1MGJhIn0sImlhdCI6MTcwODk2NjY4Nn0.e0a7qJ5IycBDVV8WiyP2VTvFtvW0s2q6ntmMU1PlSdc"
        }
      });
      const json = await response.json(); 
      const newNotes = notes.filter((note)=>{
        return note._id!==id;
      })
      setNotes(newNotes);
    }

    // Edit a note
    const editNote=async(id,title,description,tag)=>{
      //API CALL
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlZGRmYmE1MjBmM2ZlMzExYTU1MGJhIn0sImlhdCI6MTcwODk2NjY4Nn0.e0a7qJ5IycBDVV8WiyP2VTvFtvW0s2q6ntmMU1PlSdc"
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = await response.json(); 

      let newNotes = JSON.parse(JSON.stringify(notes))
      // LOGIC TO EDIT IN CLIENT
      for(let index =0;index< newNotes.length; index++){
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title = title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    return(
        <noteContext.Provider value = {{notes ,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;