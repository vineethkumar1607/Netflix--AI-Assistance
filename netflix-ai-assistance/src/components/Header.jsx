import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NETFLIX_LOGO } from '../utils/constants';
import { DEFAULT_USER_LOGO } from '../utils/constants';
import { toggleGptModal } from '../redux/uiSlice';
import AiAssistant from './AiAssistant';


/**
 * Header component for the application with user profile dropdown functionality
 * Handles responsive navigation and user profile interactions
 */
const Header = () => {
    // Get user data from Redux store
    const user = useSelector((Store) => Store.user);
    const showGptModal = useSelector((Store) => Store.ui.gptModalVisibility)
    const dispatch = useDispatch()

    // State for dropdown visibility and hover timeout reference
    const [showDropdown, setShowDropdown] = useState(false);
    const [hoverTimeout, setHoverTimeOut] = useState(null);

    // Navigation links configuration
    const navLinks = [
        "Home",
        "Tv shows",
        "Movies",
        "Games",
        "New & Popular",
        "My List",
        "Browse by Languages"
    ];

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        const mouseTimeout = setTimeout(() => {
            setShowDropdown(false);
        }, 200);
        setHoverTimeOut(mouseTimeout);
    };

    const handleGptModelToggle = () => {
        dispatch(toggleGptModal())
    }

    // Effect to reset dropdown state when user changes
    useEffect(() => {
        setShowDropdown(false);
        return () => {
            if (hoverTimeout) clearTimeout(hoverTimeout);
        };
    }, [user]);

    return (
        <header className='fixed  w-full top-0 left-0 z-[50] bg-gradient-to-b from-black/80 to-transparent'>
            <nav className='flex justify-between items-center px-10 py-5'>
                {/* Logo Section */}
                <div>
                    <img
                        className='w-[110px] md:w-[150px] h-auto'
                        src={NETFLIX_LOGO} // netflix logo
                        alt="Netflix Logo"
                        loading="lazy"
                    />
                </div>

                {/* Navigation and Profile Section - Only shown when user is logged in */}
                {user && (
                    <div className='flex flex-1 justify-between items-center'>
                        <ul className='text-white text-sm font-semibold flex space-x-6 ml-10'>
                            {navLinks.map((links, index) => (
                                <li
                                    className='cursor-pointer hover:text-gray-300 transition-colors'
                                    key={`nav-${index}`}
                                >
                                    {links}
                                </li>
                            ))}
                        </ul>

                        {/* Profile Dropdown Area */}
                        <div className=' flex space-x-6'>
                            <button
                                onClick={handleGptModelToggle}
                                data-dialog-target="animated-modal"
                                className="rounded-md bg-red-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                                Ask GPT
                            </button>
                            {showGptModal && <AiAssistant />}

                            <div
                                className='relative'
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Profile Trigger */}
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <img
                                        className="w-10 h-10 rounded"
                                        src={user.photoURL || DEFAULT_USER_LOGO}
                                        alt="User Profile"
                                        width={40}
                                        height={40}
                                    />
                                    {/* Conditional Chevron Icon (down and up arrow) */}
                                    {showDropdown ? (
                                        <ChevronUp className='text-white' size={18} aria-hidden="true" />
                                    ) : (
                                        <ChevronDown className='text-white' size={18} aria-hidden="true" />
                                    )}
                                </div>

                                {/* Dropdown Content - Conditionally Rendered */}
                                {showDropdown && (
                                    <ProfileDropdown
                                        className="absolute top-full right-0 mt-2 pointer-events-auto"
                                        style={{ transition: 'opacity 0.2s ease' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;