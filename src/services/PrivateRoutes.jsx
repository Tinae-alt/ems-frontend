import {Navigate, Outlet} from "react-router-dom";


const PrivateRoutes=()=>{
    let jwtToken = sessionStorage.getItem('jwtToken')
    return (
        jwtToken != null ? <Outlet/> : <Navigate to="/login" />
    )

}

export default PrivateRoutes