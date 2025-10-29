export const tmdboptions = (apiToken, customParams = {}) => ({
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
    },
    params: {
        language: "en-US",
        page: 1,
        ...customParams // allwos overriding the defult params
    },
});


export const TMDB_MOVIE_ENDPOINTS = {
  TOP_RATED: "top_rated",
  NOW_PLAYING: "now_playing",
  POPULAR: "popular",

};