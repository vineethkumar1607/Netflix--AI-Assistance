// src/components/AiAssistant.jsx (Cleaned UI Component)

import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleGptModal } from '../redux/uiSlice'; 
import NetflixSpinner from "./NetflixSpinner";
import MovieCard from "./MovieCard";
import { useAiMovieSearch } from '../hooks/useAiMovieSearch'; 

const AiAssistant = () => {
    // 💡 Destructure the new hasSearched state
    const {
        loading,
        inputText,
        error,
        recommendations,
        handleTextInput,
        handleGeminiSearch,
        hasSearched, // 💡 Used to conditionally apply min-height
    } = useAiMovieSearch();
    
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(toggleGptModal());
    };

    // 💡 Dynamically construct the classes for the results container
    const resultContainerClasses = `mt-4 ${hasSearched ? 'min-h-52' : ''}`;


    return (
        <div className="fixed w-screen inset-0 z-[1000] flex items-center justify-center bg-black/80">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <NetflixSpinner size="lg" />
                </div>
            )}

            <div className={`relative m-4 p-4 border border-gray-800 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-black/60 shadow-sm ${loading ? 'opacity-50' : ''}`}>
                <div className="flex justify-between items-center pb-4">
                    <h2 className="text-xl font-medium text-white">
                        Ask AI for movie suggestions
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-white"
                        disabled={loading}
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleGeminiSearch} className='flex flex-col space-y-4'>
                    <div className='flex space-x-3'>
                        <input
                            type="text"
                            value={inputText}
                            onChange={handleTextInput}
                            className='p-3 border border-gray-600 bg-gray-800 text-white rounded-lg flex-1'
                            disabled={loading}
                            placeholder="E.g.: Sci-fi movies like Interstellar"
                        />
                        <button
                            type='submit'
                            disabled={loading}
                            className="rounded-md bg-red-800 py-2 px-4 text-white shadow-md hover:bg-red-700 min-w-[100px]"
                        >
                            Search
                        </button>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    {/* 🚀 FIX APPLIED: Use dynamic class for min-height */}
                    <div className={resultContainerClasses}> 
                        {recommendations && recommendations.length > 0 && (
                            <>
                                <h3 className="text-lg font-medium text-white mb-2">
                                    AI Suggested Movies:
                                </h3>
                                <div className="flex overflow-x-scroll no-scrollbar space-x-4 py-2">
                                    {recommendations.map((movie) => (
                                        <MovieCard 
                                            key={movie.id} 
                                            movie={movie} 
                                            badgeText="AI Suggestion"
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 pt-4">
                                    Note: Recommendations based on AI analysis and TMDb availability.
                                </p>
                            </>
                        )}
                        
                        {!loading && hasSearched && recommendations?.length === 0 && (
                            <div className="text-gray-400 pt-4">No results found for your query.</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AiAssistant;