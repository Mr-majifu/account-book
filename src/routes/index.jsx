

import Home from "@/container/Home";
import Data from "@/container/Data";
import User from "@/container/User";
import Detail from "@/container/Detail";


export default [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/data",
    element: <Data />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/detail",
    element: <Detail />,
  },
]