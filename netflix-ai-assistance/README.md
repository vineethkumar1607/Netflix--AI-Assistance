# Netflix - AI Assistance
A React-based Netflix clone with AI features, built with Vite and Tailwind CSS.


- created  react app using react vite

# **Movie Streaming Platform - Development Progress**  

## **Application Setup & Configuration**  
- Initialized project using **Vite + React**  
- Configured **React Router** for client-side navigation  
- Set up **Firebase integration** for authentication    
- Established **Redux store** with slices for **user** and **movie data**  
- Integrated **TMDB API** for movie data:  
  - Registered for **TMDB API access**  
  - Created **`apiClient.js`** with Axios instance  
  - Developed custom **`useApi`** hook for data fetching  

## **Authentication Flow**  
- Implemented **login/signup forms** with client-side validation  
- Connected forms to **Firebase Auth**:  
  - **Sign In/Out functionality**  
  - **User session persistence**  
- Created **profile dropdown component** (integrated with Header)  

## **UI Components**  
### **Header**  
  - **Navigation links**  
  - **Responsive profile dropdown** (conditionally rendered based on auth state)  

### **Browse Page**  
#### **Main Container Component**  
- **Video Title Component**:  
  - **Movie title/description**  
  - **Interactive buttons** (Play, More Info)  
- **Video Background Component**:  
  - **Embedded trailer** via custom hook (**`useMovieTrailer`**)  
  - **Dynamic background** based on current featured movie  

#### **Secondary Container Component**  
- **Movierows** by category (Now Playing, Popular, etc.)  //// NEED TO ADD MORE

## **Data Management**  
- **Custom Hooks**:  
  - **`useNowPlayingMovies`** - Fetches and stores now playing movies movies  
  - **`useMovieTrailer`** - Handles trailer video data  
  - **`useTopRatedMovies`** - Fetches and stores Top Rated movies  
  - **`usePopularMovies`** - Fetches and stores Popular movies  
- **Redux Implementation**:  
  - **`userSlice`** - Manages authentication state  
  - **`moviesSlice`** - Stores TMDB API data  of nowPlayingMovies, topratedMovies, popularMovies, Movie trailer

## **API Integration**  
- **Axios interceptors** for efficient API calls  
- **Error handling** for failed requests  
- **Optimized data fetching** to minimize unnecessary calls  



        - created header
        - routing setup
        - created login and signup form
        - Form validation
        - connecting to firebase
        - created signIn / signUp
        - implememnted sign in a feature 
        - create redux store and userSlice
        - implememnted sign out feature 
        - created profile dropdown component and wrapped it in header component
        - navigation links in the navbar
        - registered for TMDB and got tye access for the api and access key 
        - Created axios instance ( apiClient.js)
        - created a custom axios hook for fetching the data (useApi.js)
        - setup redux store with movies slice 
        - fetched data using axios from TMDB now playing movies API endpoint in the browser component
        - created the custom hook for fetching now playing movies and stored that data in the store (useNowPlayingmovies.js)
        - main and Secondary container in the browser component
        - Main cotainer consists of two components i.e. Video title and video background components
        - Video title component consists of title, description, play and more info buttons
        - video background component consists of video which acts ha a background of mian container
        - created custom hook fo rfetching the data of trailer video and used in back video component uisng embed i frame
        

##  Features

### Authentication
- **Login/Signup Page**
  - Toggle between login and signup forms
  - Form validation
  - Responsive design
  - Netflix-style UI

### Main Application (Authenticated)
- **Browse Page**
  - Header with navigation
  - Background video banner
    - Play/pause functionality
    - Movie description
  - AI-powered recommendations (Future)


