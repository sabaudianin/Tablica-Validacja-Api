import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import { Home } from "./pages/Home/Home";
import { TekstTask } from "./pages/tekstTask/TekstTask";
import { PeselTask } from "./pages/peselTask/PeselTask";
import { ApiTask } from "./pages/apiTask/ApiTask";
import { NotFound } from "./pages/notFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "tekst", element: <TekstTask /> },
      { path: "pesel", element: <PeselTask /> },
      { path: "api", element: <ApiTask /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
