import { useState, useEffect } from "react";
import { MapPin, Search, Clock, Filter, ArrowUpDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TheaterShowtimes from "@/components/TheaterShowtimes";
import TheaterShowtimesDialog from "@/components/TheaterShowtimesDialog";
import CitySelector from "@/components/CitySelector";
import BackButton from "@/components/BackButton";
import InteractiveBackground from "@/components/InteractiveBackground";
import Footer from "@/components/Footer";
import { getTheatersByCity, getAvailableMoviesForCity } from "@/services/movieData";
import { useSearchParams } from "react-router-dom";

const Theaters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'jakarta';
  });
  const [activeView, setActiveView] = useState("theaters");
  const [selectedTheater, setSelectedTheater] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name"); // "name" or "distance"

  // Handle URL parameters for theater selection
  useEffect(() => {
    const theaterParam = searchParams.get('theater');
    const showDialogParam = searchParams.get('showDialog');
    
    if (theaterParam && showDialogParam === 'true') {
      // Find the theater in all cities
      const allCities = ['jakarta', 'tangerang', 'bekasi', 'bandung', 'semarang', 'solo', 'yogyakarta', 'surabaya'];
      let foundTheater = null;
      let theaterCity = selectedCity;
      
      for (const city of allCities) {
        const theaters = getTheatersByCity(city);
        foundTheater = theaters.find(t => t.name === theaterParam);
        if (foundTheater) {
          theaterCity = city;
          break;
        }
      }
      
      if (foundTheater) {
        // Set the city to match the theater's city
        if (selectedCity !== theaterCity) {
          setSelectedCity(theaterCity);
          localStorage.setItem('selectedCity', theaterCity);
        }
        
        setSelectedTheater({
          name: foundTheater.name,
          location: `${foundTheater.location} • ${foundTheater.distance}`,
          screens: foundTheater.screens
        });
        setIsDialogOpen(true);
        
        // Clear URL parameters after handling
        setSearchParams({});
      }
    }
  }, [searchParams, selectedCity, setSearchParams]);

  // Save city selection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedCity]);

  const allFacilities = ["The Premiere", "IMAX", "Dolby Atmos", "The Premiere Café", "XXI Café"];

  // Get theaters using the centralized data
  const theaters = getTheatersByCity(selectedCity);

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedFacilities([]);
    setSearchQuery("");
    setSortBy("name");
  };

  const hasActiveFilters = selectedFacilities.length > 0 || searchQuery !== "" || sortBy !== "name";

  const sortTheaters = (theaters: any[], sortBy: string) => {
    return [...theaters].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "distance") {
        // Extract distance number from string like "2.5 km"
        const distanceA = parseFloat(a.distance.replace(/[^\d.]/g, '')) || 0;
        const distanceB = parseFloat(b.distance.replace(/[^\d.]/g, '')) || 0;
        return distanceA - distanceB;
      }
      return 0;
    });
  };

  const filteredTheaters = sortTheaters(
    theaters.filter(theater => {
      const matchesSearch = searchQuery === "" || 
        theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theater.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Debug: Log theater facilities for troubleshooting
      if (selectedFacilities.length > 0) {
        console.log(`Theater: ${theater.name}`);
        console.log(`Theater facilities:`, theater.facilities);
        console.log(`Selected facilities:`, selectedFacilities);
      }
      
      // Check if theater has ALL selected facilities (not just some)
      const matchesFacilities = selectedFacilities.length === 0 ||
        selectedFacilities.every(selectedFacility => {
          // Case-insensitive comparison and exact match
          const hasThisFacility = theater.facilities.some(theaterFacility => 
            theaterFacility.toLowerCase().trim() === selectedFacility.toLowerCase().trim()
          );
          console.log(`Does ${theater.name} have ${selectedFacility}? ${hasThisFacility}`);
          return hasThisFacility;
        });
      
      const result = matchesSearch && matchesFacilities;
      if (selectedFacilities.length > 0) {
        console.log(`Theater ${theater.name} matches all criteria: ${result}`);
      }
      
      return result;
    }),
    sortBy
  );

  const handleViewShowtimes = (theater: any) => {
    setSelectedTheater({
      name: theater.name,
      location: `${theater.location} • ${theater.distance}`,
      screens: theater.screens
    });
    setIsDialogOpen(true);
  };

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3 text-white">Sort By</h4>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full border-2 border-white/20 bg-white/20 backdrop-blur-sm rounded-xl text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="distance">Distance (Nearest)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <h4 className="font-medium mb-3 text-white">Facilities</h4>
        <div className="space-y-3">
          {allFacilities.map(facility => (
            <div key={facility} className="flex items-center space-x-2">
              <Checkbox
                id={facility}
                checked={selectedFacilities.includes(facility)}
                onCheckedChange={() => handleFacilityToggle(facility)}
                className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 border-white/30"
              />
              <label 
                htmlFor={facility} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              >
                {facility}
              </label>
            </div>
          ))}
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearAllFilters}
            className="mt-3 border-2 border-white/30 bg-white/20 hover:bg-red-50/20 hover:border-red-300 hover:text-red-300 rounded-xl transition-colors duration-200 w-full text-white backdrop-blur-sm"
          >
            <RotateCcw size={16} className="mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );

  const getCityDisplayName = (city: string) => {
    if (city === "all-cities") return "All Cities";
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  // Get available movies count for the current city
  const availableMoviesCount = getAvailableMoviesForCity(selectedCity).length;

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
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-white mb-4">XXI Theaters</h1>
                  <p className="text-white/80 text-lg">Find the nearest XXI cinema and check showtimes</p>
                  {selectedCity !== "all-cities" && (
                    <p className="text-sm text-white/60 mt-2">
                      {availableMoviesCount} movies currently playing in {getCityDisplayName(selectedCity)}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-auto">
                  <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
                </div>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            {/* Search and Mobile Filter */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search theaters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-2 border-white/20 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-white placeholder:text-white/60"
                  />
                </div>
                
                {/* Mobile Sort and Filter */}
                <div className="flex gap-2 lg:hidden">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 border-2 border-white/20 bg-white/20 backdrop-blur-sm rounded-xl text-white">
                      <ArrowUpDown size={16} className="mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="border-2 border-white/40 bg-white/20 hover:bg-emerald-50/20 hover:border-emerald-300 rounded-xl transition-colors duration-200 text-white backdrop-blur-sm"
                      >
                        <Filter size={20} className="mr-2" />
                        Filters
                        {selectedFacilities.length > 0 && (
                          <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-800">
                            {selectedFacilities.length}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80 p-6 bg-gray-900/95 backdrop-blur-md border-white/20">
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
                        <FilterSection />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* View Toggle - Made pill-like */}
              <div className="w-fit">
                <ToggleGroup 
                  type="single" 
                  value={activeView} 
                  onValueChange={(value) => value && setActiveView(value)}
                  className="bg-white/20 p-1 rounded-full w-fit"
                >
                  <ToggleGroupItem 
                    value="theaters" 
                    className="rounded-full px-4 md:px-6 py-2 data-[state=on]:bg-emerald-600 data-[state=on]:text-white hover:bg-emerald-50/20 transition-colors text-sm text-white"
                  >
                    Theater List
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="showtimes" 
                    className="rounded-full px-4 md:px-6 py-2 data-[state=on]:bg-emerald-600 data-[state=on]:text-white hover:bg-emerald-50/20 transition-colors text-sm text-white"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Showtimes
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Main Content with Filter on Left */}
            <div className="flex gap-8">
              {/* Desktop Filter Section - Left Side */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Sort & Filters</h3>
                  <FilterSection />
                </div>
              </div>

              {/* Content Area - Right Side */}
              <div className="flex-1">
                {/* Results Count */}
                <p className="text-white/80 mb-6">
                  Showing {filteredTheaters.length} XXI theaters in {getCityDisplayName(selectedCity)}
                  {selectedFacilities.length > 0 && (
                    <span className="ml-2">
                      with {selectedFacilities.join(", ")}
                    </span>
                  )}
                  {sortBy === "distance" && (
                    <span className="ml-2 text-sm text-white/60">
                      (sorted by nearest distance)
                    </span>
                  )}
                  {sortBy === "name" && (
                    <span className="ml-2 text-sm text-white/60">
                      (sorted alphabetically)
                    </span>
                  )}
                </p>

                {/* Theater List View */}
                {activeView === "theaters" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredTheaters.map((theater) => (
                      <Card key={theater.id} className="hover:shadow-2xl transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg font-bold text-white">{theater.name}</CardTitle>
                              <div className="flex items-center gap-2 text-white/70 mt-1">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">{theater.location} • {theater.distance}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                              {theater.screens} Screens
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <p className="text-sm text-white/70 mb-4">{theater.address}</p>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-white mb-2">Facilities</h4>
                            <div className="flex flex-wrap gap-1">
                              {theater.facilities.map((facility, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-white/30 text-white/80">
                                  {facility}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl text-white shadow-lg"
                              size="sm"
                              onClick={() => handleViewShowtimes(theater)}
                            >
                              View Showtimes
                            </Button>
                            <Button 
                              className="bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow-lg border-0"
                              size="sm"
                            >
                              Directions
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Showtimes View */}
                {activeView === "showtimes" && (
                  <div className="space-y-4">
                    {filteredTheaters.map((theater) => (
                      <TheaterShowtimes
                        key={theater.id}
                        theaterName={theater.name}
                        location={`${theater.location} • ${theater.distance}`}
                        screenCount={theater.screens}
                        theater={theater}
                        selectedCity={selectedCity}
                      />
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {filteredTheaters.length === 0 && (
                  <div className="text-center py-12">
                    <MapPin size={64} className="mx-auto text-white/40 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No XXI theaters found</h3>
                    <p className="text-white/60">Try searching in a different city or adjusting your facility filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Theater Showtimes Dialog */}
          {selectedTheater && (
            <TheaterShowtimesDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              theater={selectedTheater}
            />
          )}
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Theaters;
