import React from "react";
import TaskGrid from "../features/tasks/components/TaskGrid";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import SearchBar from "../features/tasks/components/searchBar";

const HomePage: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <SearchBar />
        <TaskGrid />
      </DefaultLayout>
    </>
  );
};

export default HomePage;
