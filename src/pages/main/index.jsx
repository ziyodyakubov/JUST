import { useNavigate } from "react-router-dom"
import ResponsiveDrawer from "../../components/loyout"
import { useEffect } from "react"

const Main = () => {
  const navigate = useNavigate()
  useEffect(()=> {
    if (!localStorage.getItem("access_token")) {
      navigate("/login")
    }
  },[])
  return (
    <div>
      <ResponsiveDrawer/>
    </div>
  )
}

export default Main