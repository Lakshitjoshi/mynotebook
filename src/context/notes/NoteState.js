import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial=[
            {
              "_id": "65ddf512f9cbb44a47c9ad9d",
              "user": "64eddfba520f3fe311a550ba",
              "title": "my title",
              "description": "Please wake up early",
              "tag": "personal",
              "date": "2024-02-27T14:43:30.042Z",
              "__v": 0
            },
            {
              "_id": "65df230f561c004148531b0e",
              "user": "64eddfba520f3fe311a550ba",
              "title": "New note",
              "description": "Please access the playlist ",
              "tag": "Youtube",
              "date": "2024-02-28T12:11:59.677Z",
              "__v": 0
            }
          ]
    const [notes, setNotes] = useState(notesInitial)

    //Add a note
    const addNote=(title,description,tag)=>{
      //api call
      console.log("note added");
      const note ={
        "_id": "65ddf512f9cbb44a47c9ad9d",
        "user": "64eddfba520f3fe311a550ba4",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-02-27T14:43:30.042Z",
        "__v": 0
      };
      setNotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote=(id)=>{
      const newNotes = notes.filter((note)=>{
        return note._id!==id;
      })
      setNotes(newNotes);
    }

    // Edit a note
    const editNote=(id,title,description,tag)=>{
      
    }

    return(
        <noteContext.Provider value = {{notes ,addNote,deleteNote,editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;