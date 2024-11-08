import React from "react";
import Filter from "../components/Filter";
import NotesCardContainer from "../components/NotesCardContainer";

const Homepage = ({ notes, loading, handleFilterText }) => {
  return (
    <>
      <Filter handleFilterText={handleFilterText} />
      <NotesCardContainer notes={notes} laoding={loading} />
    </>
  );
};

export default Homepage;
