import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import './index.css';
import HomePage from "./pages/HomePage";
import MainLayout from "./Layout/MainLayout";
import AddPage from "./pages/AddPage";
import ViewPage from "./pages/ViewPage"
import AnalysePage from "./pages/AnalysePage"
import Tutorial from "./pages/Tutorial"


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/add-attendance" element={< AddPage />} />
        <Route path="/view-attendance" element={< ViewPage />} />
        <Route path="/analyse-attendance" element={< AnalysePage />} />
        <Route path="/tutorial" element={< Tutorial />} />
    </Route>
))
const App = () => {
    return (
        <RouterProvider router={router} />
    )
}
export default App
