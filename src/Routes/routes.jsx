import { createBrowserRouter } from "react-router-dom";
import NavBarContainer from "../Components/NAvBarBlock/NavBarContainer";
import Layout from "../Layout/Layout";
import Home from "../Auth/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ResetPassword from "../Auth/ResetPassword";
import ProfileContainer from "../Components/UserProfile/ProfileContainer";
import MyAccount from "../Components/UserProfile/MyAccount";
import AddProfile from "../Components/UserProfile/AddProfile";
import UploadProfilePhoto from "../Components/UserProfile/UploadProfilePhoto";
import ChangePassword from "../Components/UserProfile/ChangePassword";
import DeleteAccount from "../Components/UserProfile/DeleteAccount";
import AdminContainer from "../admin/AdminContainer";
import CreateAlbum from "../admin/Album/CreateAlbum";
import AlbumLandingContainer from "../AlbumLanding/AlbumLandingContainer";
import PopularAlbums from "../AlbumLanding/PopularAlbums";
import AlbumDetails from "../AlbumLanding/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";



let myRoutes = createBrowserRouter([
    {
        path:"/",
        element:<Layout />,
        children:[
            {
                path:"/",
                element:<AlbumLandingContainer/>,
                children:[
                    {
                        index:true,
                        element:<PopularAlbums/>
                    },
                    {
                        path:"album-details/:title",
                        element:<AlbumDetails/>
                    }
                ]
            },
            {
                path:"/auth/Login",
                element:(
                <PublicRoutes>
                    <Login/>
                 </PublicRoutes>
                ),
            },
            {
                path:"/auth/Register",
                element: (
                <PublicRoutes>
                    <Register/>
                 </PublicRoutes>
                ),
            },
            {
                path:"/auth/reset-password",
                element:(
                     <PublicRoutes>
                        <ResetPassword/>
                     </PublicRoutes>
                ),
            },
            {
                path:"/admin",
                element:<AdminContainer/>,
                children:[
                    {
                        path:"create-album",
                        element:<CreateAlbum/>,
                    }
                ]
            },
            
            {
                path:"/user/Profile",
                element:(
                <PrivateRoutes>
                    <ProfileContainer/>
                </PrivateRoutes>
                ),
                children:[{
                    index: true,
                    element:<MyAccount/>
                },
                {
                    path:"add-profile",
                    element:<AddProfile/>
                },
                {
                    path:"upload-profile-photo",
                    element:<UploadProfilePhoto/>
                },
                {
                    path:"change-password",
                    element:<ChangePassword/>
                },
                {
                    path:"delete-account",
                    element:<DeleteAccount/>
                },
            ]
            },
            {
                path:"*",
                element:<h1>404! Page Not Found</h1>
            },
        ]
    },
    
    
]);

export default myRoutes;