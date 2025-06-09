import { useState, useEffect } from "react";
import { Film, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import MovieCard from "@/components/MovieCard";
import CitySelector from "@/components/CitySelector";
import BackButton from "@/components/BackButton";
import InteractiveBackground from "@/components/InteractiveBackground";
import Footer from "@/components/Footer";
import { getAvailableMoviesForCity, allMovies } from "@/services/movieData";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("now-playing");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'jakarta';
  });

  // Save city selection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedCity]);

  const genres = ["all", "action", "comedy", "drama", "horror", "romance", "sci-fi", "thriller", "animation"];
  
  // Get movies based on city capacity for now-playing, all movies for upcoming
  const getMoviesForCity = () => {
    if (activeTab === "now-playing") {
      return getAvailableMoviesForCity(selectedCity);
    } else {
      return allMovies.filter(movie => movie.status === "upcoming");
    }
  };

  const movies = getMoviesForCity();

  const filteredMovies = movies
    .filter(movie => selectedGenre === "all" || movie.genre === selectedGenre)
    .filter(movie => 
      searchQuery === "" || 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "popularity") return 0;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  const nowPlayingCount = getAvailableMoviesForCity(selectedCity).length;
  const upcomingCount = allMovies.filter(m => m.status === "upcoming").length;

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleClearAllFilters = () => {
    setSelectedGenre("all");
    setSortBy("popularity");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedGenre !== "all" || sortBy !== "popularity" || searchQuery !== "";

  const getCityDisplayName = (city: string) => {
    if (city === "all-cities") return "All Cities";
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          {/* Back Button */}
          <BackButton to="/">Back to Home</BackButton>

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-white mb-4">Movies</h1>
                  <p className="text-white/80 text-lg">Discover now playing and upcoming movies</p>
                </div>
                <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-2 border-white/20 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-white placeholder:text-white/60"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Pill-like Toggle Buttons */}
            <div className="mb-6">
              <ToggleGroup 
                type="single" 
                value={activeTab} 
                onValueChange={(value) => value && setActiveTab(value)}
                className="bg-white/20 p-1 rounded-full w-fit"
              >
                <ToggleGroupItem 
                  value="now-playing" 
                  className="rounded-full px-6 py-2 data-[state=on]:bg-emerald-600 data-[state=on]:text-white hover:bg-emerald-50/20 transition-colors text-white"
                >
                  Now Playing ({nowPlayingCount})
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="upcoming" 
                  className="rounded-full px-6 py-2 data-[state=on]:bg-emerald-600 data-[state=on]:text-white hover:bg-emerald-50/20 transition-colors text-white"
                >
                  Upcoming ({upcomingCount})
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-2">Genre</label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="border-2 border-white/20 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-white">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre} className="hover:bg-emerald-50">
                        {genre === "all" ? "All Genres" : genre.charAt(0).toUpperCase() + genre.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-2 border-white/20 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="popularity" className="hover:bg-emerald-50">Popularity</SelectItem>
                    <SelectItem value="title" className="hover:bg-emerald-50">Title A-Z</SelectItem>
                    <SelectItem value="release" className="hover:bg-emerald-50">Release Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear All Filters Button */}
              {hasActiveFilters && (
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={handleClearAllFilters}
                    className="border-2 border-white/30 bg-white/20 hover:bg-red-50/20 hover:border-red-300 hover:text-red-300 rounded-xl transition-colors duration-200 px-4 py-2 text-white backdrop-blur-sm"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Results Count */}
            <p className="text-white/80 mb-6">
              Showing {filteredMovies.length} of {movies.length} movies in {getCityDisplayName(selectedCity)}
              {activeTab === "now-playing" && selectedCity !== "all-cities" && (
                <span className="text-sm text-white/60 block mt-1">
                  Based on theater capacity in this city
                </span>
              )}
            </p>

            {/* Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie, index) => (
                <MovieCard
                  key={`${movie.id}-${selectedCity}`}
                  movie={movie}
                  index={index}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredMovies.length === 0 && (
              <div className="text-center py-12">
                <Film size={64} className="mx-auto text-white/40 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No movies found</h3>
                <p className="text-white/60">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Movies;
