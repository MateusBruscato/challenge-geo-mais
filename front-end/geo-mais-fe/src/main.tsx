import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Person from "./views/person";
import AddPerson from "./views/person/add/AddPerson";
import ListPeople from "./views/person/list/ListPeople";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Person />,
        children: [
          {
            path: "",
            element: <ListPeople />,
          },
          {
            path: "detalhe",
            element: <AddPerson />,
          },
          {
            path: "detalhe/:id",
            element: <AddPerson />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
