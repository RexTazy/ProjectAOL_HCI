import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();

  // Real movies data from Movies page
  const movies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      genre: "Sci-Fi, Adventure",
      rating: "PG-13",
      image: "/lovable-uploads/0526d1c8-3d44-4780-a418-1bcf008e8c08.png"
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      genre: "Action, Drama",
      rating: "PG-13",
      image: "/lovable-uploads/803fb1bf-8f36-444a-9849-f34a22648a8f.png"
    },
    {
      id: 3,
      title: "The Batman",
      genre: "Action, Crime",
      rating: "PG-13",
      image: "/lovable-uploads/22ac56e6-2544-463f-a09c-f32816259ad7.png"
    },
    {
      id: 4,
      title: "Black Panther: Wakanda Forever",
      genre: "Action",
      rating: "PG-13",
      image: "/lovable-uploads/806e3694-aadd-4071-b1e4-9ee209ca08e5.png"
    },
    {
      id: 5,
      title: "Glass Onion: A Knives Out Mystery",
      genre: "Thriller",
      rating: "PG-13",
      image: "/lovable-uploads/85148de4-a86b-41f7-93ec-334e7918c038.png"
    },
    {
      id: 6,
      title: "Spider-Man: Across the Spider-Verse",
      genre: "Animation",
      rating: "PG",
      image: "/lovable-uploads/5a6160c7-d6c6-4523-9a5e-a7a4c807e21a.png"
    },
    {
      id: 7,
      title: "Dune: Part Two",
      genre: "Sci-Fi",
      rating: "PG-13",
      image: "/lovable-uploads/5eb2ef8e-cf7c-449e-a2a9-cc9f95710c8a.png"
    },
    {
      id: 8,
      title: "Guardians of the Galaxy Vol. 3",
      genre: "Action",
      rating: "PG-13",
      image: "/lovable-uploads/be098f13-91e3-483b-aad1-1985b856529e.png"
    },
    {
      id: 9,
      title: "Indiana Jones and the Dial of Destiny",
      genre: "Action",
      rating: "PG-13",
      image: "/lovable-uploads/97dedfc4-8a4d-4591-b41a-f6808687c254.png"
    },
    {
      id: 10,
      title: "Bullet Train",
      genre: "Action",
      rating: "R",
      image: "/lovable-uploads/9f4cb4ff-2e94-40be-80b1-390db7248a17.png"
    },
    {
      id: 11,
      title: "Oppenheimer",
      genre: "Drama",
      rating: "R",
      image: "/lovable-uploads/13cb9e02-bc9c-4d08-8875-bda485a3cb05.png"
    },
    {
      id: 12,
      title: "John Wick: Chapter 4",
      genre: "Action",
      rating: "R",
      image: "/lovable-uploads/4abd4b1d-6adc-4780-aa36-7b46c9659cb3.png"
    },
    {
      id: 13,
      title: "The Super Mario Bros. Movie",
      genre: "Animation",
      rating: "General",
      image: "/lovable-uploads/2aa2a4ad-92e9-4bb7-b30a-b6e1f2332ffd.png"
    },
    {
      id: 14,
      title: "Fast X",
      genre: "Action",
      rating: "PG-13",
      image: "/lovable-uploads/bc29e02f-aa44-40b8-a048-242e5470c7f5.png"
    }
  ];

  // Real theaters data from Theaters page - Updated with proper location matching
  const theaters = [
    { name: "Plaza Indonesia XXI", location: "Jakarta Pusat", city: "jakarta" },
    { name: "Grand Indonesia XXI", location: "Jakarta Pusat", city: "jakarta" },
    { name: "BSD XXI", location: "Tangerang", city: "tangerang" },
    { name: "Bintaro XXI", location: "Tangerang", city: "tangerang" },
    { name: "Summarecon Serpong XXI", location: "Tangerang", city: "tangerang" },
    { name: "Living World XXI", location: "Tangerang", city: "tangerang" },
    { name: "Mega Bekasi XXI", location: "Bekasi", city: "bekasi" },
    { name: "Ciputra Cibubur XXI", location: "Bekasi", city: "bekasi" },
    { name: "Bekasi Square XXI", location: "Bekasi", city: "bekasi" },
    { name: "Metropolitan XXI", location: "Bekasi", city: "bekasi" },
    { name: "BTC XXI", location: "Bandung", city: "bandung" },
    { name: "Summarecon Mall Bandung XXI", location: "Bandung", city: "bandung" },
    { name: "Paragon XXI", location: "Semarang", city: "semarang" },
    { name: "Studio XXI (Solo Square)", location: "Solo", city: "solo" },
    { name: "Solo Paragon XXI", location: "Solo", city: "solo" },
    { name: "Empire XXI", location: "Yogyakarta", city: "yogyakarta" },
    { name: "Jogja City Mall XXI", location: "Yogyakarta", city: "yogyakarta" },
    { name: "Tunjungan XXI", location: "Surabaya", city: "surabaya" },
    { name: "Supermall XXI", location: "Surabaya", city: "surabaya" },
    { name: "Galaxy XXI", location: "Surabaya", city: "surabaya" },
    { name: "Grand City XXI", location: "Surabaya", city: "surabaya" },
    { name: "Lenmarc XXI", location: "Surabaya", city: "surabaya" },
    { name: "Ciputra World XXI", location: "Surabaya", city: "surabaya" }
  ];

  // Optimize image loading by adding dimension parameters
  const getOptimizedImageUrl = (url: string) => {
    if (url.startsWith('/lovable-uploads/')) {
      // Add width parameter to scale down the image (48px width for search thumbnails)
      return `${url}?w=48&q=80`;
    }
    return url;
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  const filteredTheaters = theaters.filter(theater =>
    theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    theater.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    theater.city.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 2);

  const hasResults = filteredMovies.length > 0 || filteredTheaters.length > 0;

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter a search term");
      return;
    }
    
    if (searchQuery.trim().length < 2) {
      setSearchError("Search term must be at least 2 characters");
      return;
    }

    // Check if there are any results before navigating
    if (!hasResults) {
      setSearchError("No movies or theaters found matching your search");
      return;
    }

    setSearchError("");
    navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setSearchError("");
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowResults(value.length > 0);
    if (searchError && value.trim().length >= 2) {
      setSearchError("");
    }
  };

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleTheaterClick = (theater: any) => {
    // Set the city to match the theater's city
    localStorage.setItem('selectedCity', theater.city);
    
    // Navigate to theaters page with theater and showDialog parameters
    navigate(`/theaters?theater=${encodeURIComponent(theater.name)}&showDialog=true`);
    setShowResults(false);
    setSearchQuery("");
  };

  const isSearchDisabled = !searchQuery.trim() || searchQuery.trim().length < 2 || !hasResults;

  return (
    <div className="relative">
      <div className="bg-white/95 backdrop-blur-md rounded-full p-2 shadow-2xl border border-white/20 ring-1 ring-black/5 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 flex items-center gap-3 px-4">
            <div className="p-2 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600">
              <Search size={18} className="text-white" />
            </div>
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search movies or theaters..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowResults(searchQuery.length > 0)}
                className="border-0 bg-transparent focus:ring-0 text-lg placeholder:text-gray-500 text-gray-800 shadow-none focus-visible:ring-0 pr-8"
                onKeyPress={(e) => e.key === 'Enter' && !isSearchDisabled && handleSearch()}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Search Button */}
          <Button 
            onClick={handleSearch}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-0 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:shadow-lg"
            disabled={isSearchDisabled}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Search Error */}
      {searchError && (
        <div className="text-center mt-2">
          <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full">{searchError}</span>
        </div>
      )}

      {/* Search Results Dropdown */}
      {showResults && (searchQuery.length > 0) && (filteredMovies.length > 0 || filteredTheaters.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl mx-auto z-50">
          <div className="p-4 space-y-4">
            {/* Movies Section */}
            {filteredMovies.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm font-medium">
                    Movies
                  </div>
                </div>
                <div className="space-y-2">
                  {filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleMovieClick(movie.id)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div 
                        className="w-12 h-16 bg-gray-200 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${getOptimizedImageUrl(movie.image)})` }}
                      />
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-gray-900">{movie.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{movie.genre}</span>
                          <span>•</span>
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Theaters Section */}
            {filteredTheaters.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 bg-gray-500 text-white rounded-full text-sm font-medium">
                    Theaters
                  </div>
                </div>
                <div className="space-y-2">
                  {filteredTheaters.map((theater) => (
                    <div
                      key={theater.name}
                      onClick={() => handleTheaterClick(theater)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-500 font-bold">XXI</span>
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-gray-900">{theater.name}</h3>
                        <div className="text-sm text-gray-600">{theater.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Show "No results" message when typing but no matches found */}
      {showResults && searchQuery.length > 0 && !hasResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl mx-auto z-50">
          <div className="p-6 text-center">
            <Search size={48} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 text-sm">Try searching with different keywords or check your spelling</p>
          </div>
        </div>
      )}

      {/* Backdrop to close search results */}
      {showResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
