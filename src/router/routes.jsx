import CategoryIcon from '@mui/icons-material/Category';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
const routes = [
    {
        path: "/",
        content: "Category",
        icon: <CategoryIcon/>
    },
    {
        path: "/products",
        content: "Products",
        icon: <CheckroomIcon/>
    },
    {
        path: "/workers",
        content: "Workers",
        icon: <PeopleAltIcon/>
    },
]

export default routes