import "./App.css";

// react-router-dom
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // v6...

// pages
import Home from "./pages/Home";
import Purchase from "./pages/Purchase"
import Login from "./pages/Login"
import Register from "./pages/Register";
import Profile from "./pages/Profile"
import Balance from "./pages/Balance";
import Settings from "./pages/Settings"
import History from "./pages/History"
// layouts
import RootLayout from "./layouts/RootLayout";

//css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // errorElement: <PageNotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "purchase",
          element: <Purchase />,
        },
        {
          path: "login",
          element: <Login/>,
        },
        {
          path: "register",
          element:<Register/>
        },
        {
          path:"profile",
          element:<Profile/>
        },
        {
          path:"balance",
          element:<Balance/>
        },
        {
          path:"settings",
          element:<Settings/>
        },
        {
          path:"history",
          element:<History/>
        }
        // {
        //   path: "contact",
        //   element: <ContactLayout />,
        //   children: [
        //     {
        //       path: "faq",
        //       element: <Faq />,
        //     },
        //     {
        //       path: "form",
        //       element: <Form />,
        //     },
        //   ],
        // },
        // {
        //   path: "articles",
        //   element: <ArticlesLayout />,
        //   children: [
        //     {
        //       index: true,
        //       element: <Articles />,
        //     },
        //     {
        //       path: ":id",
        //       element: <ArticleDetail />,
        //     },
        //   ],
        // },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
