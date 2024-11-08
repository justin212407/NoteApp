import React, { useEffect } from "react";
import NotesCard from "./NotesCard";
import Loader from "./Loader";

const NotesCardContainer = ({ notes, loading }) => {
  useEffect(() => {
    console.log(notes); // Check if each note object has a `category` field
  }, [notes]);
  return (
    <div className="container">
      <div className="note-has-grid row">
        {loading && <Loader loading={loading} />}
        {notes.map((note) => (
          <NotesCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesCardContainer;
