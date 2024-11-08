import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import NotesCardContainer from "./components/NotesCardContainer";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import MainLayout from "./Layout/MainLayout";
import AddNotePage from "./Pages/AddNotePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import EditNotePage from "./Pages/EditNotePage";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleFilterText = (val) => {
    setFilterText(val);
  };

  const handleSearchText = (val) => {
    setSearchText(val);
  };

  const filteredNotes =
    filterText == "BUSINESS"
      ? notes.filter((note) => note.category == "BUSINESS")
      : filterText == "PERSONAL"
      ? notes.filter((note) => note.category == "PERSONAL")
      : filterText == "IMPORTANT"
      ? notes.filter((note) => note.category == "IMPORTANT")
      : notes;

  useEffect(() => {
    if (searchText.length < 3) return;
    axios
      .get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [searchText]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/notes/")
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addNote = (data) => {
    axios
      .post("http://127.0.0.1:8000/notes/", data)
      .then((res) => {
        setNotes([...notes, data]);
        toast.success("A new note has been added!");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(console.log(err.message));
      });
  };

  const updateNote = (data, slug) => {
    axios
      .put(`http://127.0.0.1:8000/notes/${slug}/`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Note updated succesfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteNote = (slug) => {
    axios
      .delete(`http://127.0.0.1:8000/notes/${slug}/`)
      .then((res) => {
        setNotes([...notes]);
      })
      .catch((err) => console.log(err.message));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            searchText={searchText}
            handleSearchText={handleSearchText}
          />
        }
      >
        <Route
          index
          element={
            <Homepage
              notes={filteredNotes}
              loading={isLoading}
              handleFilterText={handleFilterText}
            />
          }
        />
        <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
        <Route
          path="/notes/:slug"
          element={<NoteDetailPage deleteNote={deleteNote} />}
        />
        <Route
          path="/edit-note/:slug"
          element={<EditNotePage updateNote={updateNote} />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
