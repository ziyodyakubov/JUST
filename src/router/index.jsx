import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn,Main, Products, Category, Workers} from "@pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />}>
          <Route index element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/workers" element={<Workers />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default Index;
