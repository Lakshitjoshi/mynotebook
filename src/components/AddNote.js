import React,{useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";


function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote } = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added successfully","success")
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3" onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            value={note.title}
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            value={note.description}
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            value={note.tag}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
