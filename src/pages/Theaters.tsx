import { useState, useEffect } from "react";
import { MapPin, Search, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TheaterShowtimes from "@/components/TheaterShowtimes";
import TheaterShowtimesDialog from "@/components/TheaterShowtimesDialog";
import CitySelector from "@/components/CitySelector";
import BackButton from "@/components/BackButton";
import { getTheatersByCity, getAvailableMoviesForCity } from "@/services/movieData";

const Theaters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'jakarta';
  });
  const [activeView, setActiveView] = useState("theaters");
  const [selectedTheater, setSelectedTheater] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  const filteredTheaters = theaters.filter(theater => {
    const matchesSearch = searchQuery === "" || 
      theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theater.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFacilities = selectedFacilities.length === 0 ||
      selectedFacilities.some(facility => theater.facilities.includes(facility));
    
    return matchesSearch && matchesFacilities;
  });

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
        <h4 className="font-medium mb-3 text-gray-900">Facilities</h4>
        <div className="space-y-3">
          {allFacilities.map(facility => (
            <div key={facility} className="flex items-center space-x-2">
              <Checkbox
                id={facility}
                checked={selectedFacilities.includes(facility)}
                onCheckedChange={() => handleFacilityToggle(facility)}
                className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 border-gray-300"
              />
              <label 
                htmlFor={facility} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              >
                {facility}
              </label>
            </div>
          ))}
        </div>
        {selectedFacilities.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedFacilities([])}
            className="mt-3 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl"
          >
            Clear filters
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {/* Back Button */}
        <BackButton to="/">Back to Home</BackButton>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">XXI Theaters</h1>
              <p className="text-gray-600">Find the nearest XXI cinema and check showtimes</p>
              {selectedCity !== "all-cities" && (
                <p className="text-sm text-gray-500 mt-1">
                  {availableMoviesCount} movies currently playing in {getCityDisplayName(selectedCity)}
                </p>
              )}
            </div>
            <div className="w-full lg:w-auto">
              <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
            </div>
          </div>
        </div>

        {/* Search and Mobile Filter */}
        <div className="mb-8 space-y-4">
          {/* ... keep existing code (search and mobile filter section) */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search theaters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="lg:hidden border-2 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl transition-colors duration-200"
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
              <SheetContent side="right" className="w-80 p-6">
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                  <FilterSection />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* View Toggle - Made pill-like */}
          <div className="w-fit">
            <ToggleGroup 
              type="single" 
              value={activeView} 
              onValueChange={(value) => value && setActiveView(value)}
              className="bg-gray-100 p-1 rounded-full w-fit"
            >
              <ToggleGroupItem 
                value="theaters" 
                className="rounded-full px-4 md:px-6 py-2 data-[state=on]:bg-emerald-600 data-[state=on]:text-white hover:bg-emerald-50 transition-colors text-sm"
              >
                Theater List
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="showtimes" 
                className="rounded-full px-4 md:px-6 py-2 data-[state=on]:bg-emerald-600 data-[state=on]:text-white hover:bg-emerald-50 transition-colors text-sm"
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
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <FilterSection />
            </div>
          </div>

          {/* Content Area - Right Side */}
          <div className="flex-1">
            {/* Results Count */}
            <p className="text-gray-600 mb-6">
              Showing {filteredTheaters.length} XXI theaters in {getCityDisplayName(selectedCity)}
              {selectedFacilities.length > 0 && (
                <span className="ml-2">
                  with {selectedFacilities.join(", ")}
                </span>
              )}
            </p>

            {/* Theater List View */}
            {activeView === "theaters" && (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredTheaters.map((theater) => (
                  <Card key={theater.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold">{theater.name}</CardTitle>
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{theater.location} • {theater.distance}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                          {theater.screens} Screens
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{theater.address}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Facilities</h4>
                        <div className="flex flex-wrap gap-1">
                          {theater.facilities.map((facility, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl"
                          size="sm"
                          onClick={() => handleViewShowtimes(theater)}
                        >
                          View Showtimes
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl">
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
              <div className="space-y-6">
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
                <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No XXI theaters found</h3>
                <p className="text-gray-600">Try searching in a different city or adjusting your facility filters.</p>
              </div>
            )}
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
    </div>
  );
};

export default Theaters;
