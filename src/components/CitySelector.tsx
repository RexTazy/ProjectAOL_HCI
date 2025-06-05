
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  const [citySearch, setCitySearch] = useState("");

  const cities = [
    "All Cities",
    "Jakarta",
    "Surabaya", 
    "Bandung",
    "Medan",
    "Semarang",
    "Makassar",
    "Palembang",
    "Tangerang",
    "Tangerang Selatan",
    "Depok",
    "Bekasi",
    "Batam",
    "Banjarmasin",
    "Balikpapan",
    "Samarinda",
    "Pontianak",
    "Jayapura",
    "Bengkulu",
    "Yogyakarta",
    "Solo",
    "Malang",
    "Denpasar",
    "Manado",
    "Pekanbaru"
  ];

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCityChange = (value: string) => {
    onCityChange(value);
  };

  const getDisplayValue = () => {
    if (selectedCity === 'all-cities') return 'All Cities';
    const cityName = cities.find(city => 
      city.toLowerCase().replace(/\s+/g, '-') === selectedCity
    );
    return cityName || 'Select your city';
  };

  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600">
        <MapPin size={16} className="text-white" />
      </div>
      <Select value={selectedCity} onValueChange={handleCityChange}>
        <SelectTrigger className="w-48 border-2 border-gray-200 bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium text-gray-800 hover:border-teal-300 rounded-xl shadow-sm">
          <SelectValue placeholder="Select your city" className="text-gray-800">
            {getDisplayValue()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl rounded-2xl">
          <div className="px-3 py-2">
            <Input
              type="text"
              placeholder="Search cities..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="border-2 border-gray-200 text-sm rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
          {filteredCities.map((city) => (
            <SelectItem 
              key={city} 
              value={city === 'All Cities' ? 'all-cities' : city.toLowerCase().replace(/\s+/g, '-')} 
              className="hover:bg-teal-50 rounded-lg focus:bg-teal-50"
            >
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;
