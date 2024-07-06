import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import HomeIcon from '@mui/icons-material/Home';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
const routes = [
    {
        path: "/",
        content: "Category",
        icon: <HomeIcon/>
    },
    {
        path: "/products",
        content: "Products",
        icon: <LocalPostOfficeIcon/>
    },
    {
        path: "/workers",
        content: "Workers",
        icon: <BorderStyleIcon/>
    },
]

export default routes