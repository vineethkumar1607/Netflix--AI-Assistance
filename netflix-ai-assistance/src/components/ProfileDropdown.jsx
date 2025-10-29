import { User, Pencil, RefreshCcw, Info } from 'lucide-react';
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { DEFAULT_USER_LOGO } from "../utils/constants"
const ProfileDropdown = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const handleSignOut = () => {
        try {
            signOut(auth);
            navigate("/");
        } catch (error) {
            navigate("/error");
        }
    }

    return (
        <div className="bg-black text-white absolute w-60 top-12 right-0 p-2 rounded shadow-lg z-50 border border-gray-800 ">
            <div className="flex items-center gap-3 cursor-pointer rounded p-2 hover:bg-gray-800">
                <img className="w-6 h-6 " src={DEFAULT_USER_LOGO} alt="User Profile" />
                <div className="font-medium">{user?.displayName || "Default"}</div>
            </div>

            <hr className="border-gray-700 m-1" />

            <div className="flex items-center gap-3 cursor-pointer rounded p-2 hover:underline  hover:text-gray-300" >
                <Pencil />
                Manage Profiles
            </div>
            <div className="flex items-center gap-3 cursor-pointer rounded p-2 hover:underline  hover:text-gray-300" >
                <RefreshCcw />
                Transfer Profile
            </div>
            <div className="flex items-center gap-3 cursor-pointer rounded p-2 hover:underline  hover:text-gray-300" >
                <User />
                Account
            </div>
            <div className="flex items-center gap-3 cursor-pointer rounded p-2 hover:underline  hover:text-gray-300" >
                <Info />
                Help Center
            </div>
            <hr className="border-gray-700 m-1" />
            <p className="font-medium p-2 flex justify-center hover:underline  hover:text-gray-300" onClick={handleSignOut}>Sign out of Netflix</p>
        </div>
    )

}

export default ProfileDropdown;
