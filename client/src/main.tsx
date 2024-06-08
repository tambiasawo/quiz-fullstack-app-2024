import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/Error";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard.tsx";
import RootLayout from "./components/RootLayout.tsx";
import Quizzes from "./pages/Quizzes.tsx";
import Results from "./pages/Results.tsx";
import Profile from "./pages/Profile.tsx";
import FAQ from "./pages/FAQ.tsx";
import Quiz from "./pages/Quiz.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
let persistor = persistStore(store);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { element: <Dashboard />, index: true },
      { path: "/profile", element: <Profile /> },
      { path: "/quizzes", element: <Quizzes /> },
      { path: "/results", element: <Results /> },
      { path: "/faq", element: <FAQ /> },

      { path: "/quiz/:quiz_type", element: <Quiz /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
