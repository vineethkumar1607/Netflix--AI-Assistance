import { Play, Info } from 'lucide-react';
import { IoIosPlay } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='absolute w-screen aspect-video z-20 pt-[20%] px-20 bg-gradient-to-r from-black/60'>
            <h1 className='text-5xl font-bold text-white mb-4 drop-shadow-xl'>{title}</h1>
            <p className='w-1/3 text-lg text-white mb-8 drop-shadow-md'>{overview}</p>
            <div className='flex space-x-4'>
                <button className=' bg-white text-black py-3 px-8 rounded-md text-xl font-bold  hover:bg-gray-300
                    transition-all duration-200 flex items-center justify-center gap-2 shadow-lg'>
                    <IoIosPlay size={24} />
                    Play
                </button>
                <button className='bg-[rgba(109,109,110,0.7)] text-white py-3 px-8 rounded-md text-xl font-bold hover:bg-gray-600/60 
                    transition-all duration-200 flex items-center justify-center gap-2 shadow-lg'>
                    <Info size={20} className="mr-1" />
                    More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTitle