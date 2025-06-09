
import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  const [citySearch, setCitySearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cities = [
    "All Cities",
    "Balikpapan",
    "Bandung",
    "Banjarmasin",
    "Batam",
    "Bekasi",
    "Bengkulu",
    "Denpasar",
    "Depok",
    "Jakarta",
    "Jayapura",
    "Makassar",
    "Malang",
    "Manado",
    "Medan",
    "Palembang",
    "Pekanbaru",
    "Pontianak",
    "Samarinda",
    "Semarang",
    "Solo",
    "Surabaya",
    "Tangerang",
    "Yogyakarta"
  ];

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const getDisplayValue = () => {
    if (selectedCity === 'all-cities') return 'All Cities';
    const cityName = cities.find(city => 
      city.toLowerCase().replace(/\s+/g, '-') === selectedCity
    );
    return cityName || 'Select your city';
  };

  const handleCitySelect = (city: string) => {
    const value = city === 'All Cities' ? 'all-cities' : city.toLowerCase().replace(/\s+/g, '-');
    onCityChange(value);
    setIsOpen(false);
    setCitySearch("");
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCities.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCities.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredCities.length) {
          handleCitySelect(filteredCities[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setCitySearch("");
        setHighlightedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [citySearch]);

  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600">
        <MapPin size={16} className="text-white" />
      </div>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-48 justify-between border-2 border-white/20 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium text-white hover:border-emerald-300 rounded-xl shadow-sm"
          >
            <span className="truncate">{getDisplayValue()}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-48 p-0 bg-white border-2 border-gray-200 shadow-2xl rounded-2xl"
          align="start"
          onKeyDown={handleKeyDown}
        >
          <div className="p-3 border-b border-gray-100">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search cities..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="border-2 border-gray-200 text-sm rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              onKeyDown={handleKeyDown}
            />
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <button
                  key={city}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-teal-50 focus:bg-teal-50 focus:outline-none transition-colors ${
                    index === highlightedIndex ? 'bg-teal-50' : ''
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${
                    index === filteredCities.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                  onClick={() => handleCitySelect(city)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {city}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                No cities found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CitySelector;
