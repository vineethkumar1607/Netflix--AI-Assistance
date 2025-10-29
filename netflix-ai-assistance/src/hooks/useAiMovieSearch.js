// src/hooks/useAiMovieSearch.js

import { useState, useMemo, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- TMDB Configuration ---
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN; // Get this from environment

// Helper function to generate options object
const useTmdbOptions = (token) => {
    return useMemo(() => ({
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }), [token]);
};

// Helper function to search for one movie on TMDb
const searchMovieOnTMDb = async (movieTitle, options) => {
    const url = `${API_BASE_URL}/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(movieTitle)}`;

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error(`TMDb search failed with status: ${response.status} for ${movieTitle}`);
            return null;
        }
        const data = await response.json();
        return data.results[0] || null;
    } catch (error) {
        console.error(`Error fetching from TMDb for ${movieTitle}:`, error);
        return null;
    }
};

/**
 * Custom hook to handle AI movie search logic and state.
 * @returns {object} State and handler functions.
 */
export const useAiMovieSearch = () => {
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState(null);
    
    const tmdbRequestOptions = useTmdbOptions(API_TOKEN); 
    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_KEY
    });

    const handleTextInput = useCallback((event) => {
        setInputText(event.target.value);
    }, []);

    const handleGeminiSearch = useCallback(async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError(null);
        setRecommendations(null); 

        try {
            if (!inputText?.trim()) {
                setError("Please enter a movie query");
                setLoading(false);
                return;
            }

            // 1. Call Gemini API for recommendations (Titles only)
            const prompt = `You are a movie recommendation assistant. 
            Recommend exactly 5 movies in comma-separated format like: 
            Avengers, Spider-Man, Justice League, Iron Man, Thor. 
            Only respond to movie-related queries.
            User query: ${inputText}`;

            const geminiResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            });

            const rawTitles = geminiResponse.text; 
            const movieTitles = rawTitles.split(',').map(m => m.trim()).filter(m => m.length > 0);
            
            if (movieTitles.length === 0) {
                 throw new Error("AI response was empty or malformed.");
            }

            // 2. Search each recommended movie title on TMDb API concurrently
            const tmdbPromises = movieTitles.map(title => searchMovieOnTMDb(title, tmdbRequestOptions));
            const tmdbResults = await Promise.all(tmdbPromises);
            
            const finalRecommendations = tmdbResults
                .filter(result => result !== null && result.poster_path)
                .map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: movie.poster_path,
                }));
            
            if (finalRecommendations.length === 0) {
                 throw new Error("Could not find relevant movies on TMDb.");
            }

            setRecommendations(finalRecommendations);

        } catch (err) {
            console.error("API Error:", err);
            setError(err.message || "Failed to get and search recommendations.");
        } finally {
            setLoading(false);
        }
    }, [ai, inputText, loading, tmdbRequestOptions]); // Dependency array for useCallback

    return {
        loading,
        inputText,
        error,
        recommendations,
        handleTextInput,
        handleGeminiSearch,
    };
};