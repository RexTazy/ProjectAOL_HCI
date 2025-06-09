
import { Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAvailableMoviesForCity, generateShowtimesForTheater, getMovieById } from "@/services/movieData";

interface TheaterShowtimesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  theater: {
    name: string;
    location: string;
    screens: number;
  };
}

const TheaterShowtimesDialog = ({ isOpen, onClose, theater }: TheaterShowtimesDialogProps) => {
  const navigate = useNavigate();
  
  // Extract city from theater name/location for realistic data
  const selectedCity = localStorage.getItem('selectedCity') || 'jakarta';
  
  // Extract the actual city from theater location or name
  const extractCityFromTheater = (theaterName: string, theaterLocation: string) => {
    const location = theaterLocation.toLowerCase();
    const name = theaterName.toLowerCase();
    
    // City mappings based on common theater locations
    const cityMappings = {
      'jakarta': ['jakarta', 'kemang', 'senayan', 'plaza indonesia', 'grand indonesia', 'central park', 'fx sudirman', 'taman anggrek'],
      'bandung': ['bandung', 'summarecon mall bandung', 'braga city walk'],
      'surabaya': ['surabaya', 'pakuwon mall', 'galaxy mall'],
      'medan': ['medan', 'sun plaza'],
      'makassar': ['makassar', 'mall panakkukang'],
      'denpasar': ['denpasar', 'beachwalk', 'bali'],
      'yogyakarta': ['yogyakarta', 'yogya', 'malioboro'],
      'semarang': ['semarang', 'paragon mall'],
      'palembang': ['palembang', 'palembang square'],
      'bekasi': ['bekasi', 'bekasi square', 'metropolitan mall bekasi'],
      'tangerang': ['tangerang', 'bintaro', 'alam sutera'],
      'depok': ['depok', 'margo city'],
      'malang': ['malang', 'malang town square'],
      'solo': ['solo', 'solo square'],
      'balikpapan': ['balikpapan', 'e-walk'],
      'manado': ['manado', 'manado town square'],
      'batam': ['batam', 'nagoya hill'],
      'pekanbaru': ['pekanbaru', 'mal pekanbaru'],
      'banjarmasin': ['banjarmasin', 'duta mall'],
      'pontianak': ['pontianak', 'ayani megamal'],
      'samarinda': ['samarinda', 'big mall'],
      'jayapura': ['jayapura', 'jayapura mall'],
      'bengkulu': ['bengkulu']
    };
    
    // Check which city this theater belongs to
    for (const [city, keywords] of Object.entries(cityMappings)) {
      if (keywords.some(keyword => location.includes(keyword) || name.includes(keyword))) {
        return city;
      }
    }
    
    return 'jakarta'; // default fallback
  };
  
  const theaterCity = extractCityFromTheater(theater.name, theater.location);
  
  const availableMovies = getAvailableMoviesForCity(selectedCity);
  
  const theaterData = {
    id: 1,
    name: theater.name,
    city: theaterCity,
    location: theater.location,
    distance: "0 km",
    screens: theater.screens,
    facilities: ["XXI Café"],
    address: theater.location
  };
  
  const showtimesData = generateShowtimesForTheater(theaterData, availableMovies);
  
  const movieShowtimes = showtimesData.showtimes.reduce((acc, showtime) => {
    const movie = getMovieById(showtime.movieId);
    if (!movie) return acc;
    
    if (!acc[movie.id]) {
      acc[movie.id] = {
        movie,
        showtimes: []
      };
    }
    acc[movie.id].showtimes.push(showtime);
    return acc;
  }, {} as Record<number, { movie: any; showtimes: any[] }>);

  const handleMovieClick = (movieId: number) => {
    // Set the city to match the theater's actual city before navigating
    localStorage.setItem('selectedCity', theaterCity);
    onClose();
    navigate(`/movie/${movieId}`);
  };

  const handleShowtimeClick = (movieId: number) => {
    // Set the city to match the theater's actual city before navigating
    localStorage.setItem('selectedCity', theaterCity);
    onClose();
    navigate(`/movie/${movieId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[85vh] bg-gray-900/95 backdrop-blur-md text-white border border-white/20 rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold text-white pr-4">{theater.name}</DialogTitle>
              <div className="flex items-center gap-2 text-white/70 mt-1">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">{theater.location}</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 rounded-xl flex-shrink-0">
              {theater.screens} Screens
            </Badge>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 pr-4">
            {Object.values(movieShowtimes).map(({ movie, showtimes }) => (
              <div key={movie.id} className="border-l-4 border-emerald-500 pl-4 py-3 bg-white/10 backdrop-blur-sm rounded-r-xl border border-white/20">
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="cursor-pointer hover:text-emerald-400 transition-colors flex-1 min-w-0"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <h4 className="font-semibold text-white hover:text-emerald-400 truncate pr-2">{movie.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-white/70 mt-1 flex-wrap">
                      <span className="flex-shrink-0">{movie.rating}</span>
                      <span className="flex-shrink-0">•</span>
                      <span className="flex-shrink-0">{movie.duration}</span>
                      <span className="flex-shrink-0">•</span>
                      <div className="flex gap-1 flex-wrap">
                        {movie.format.map((format: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs rounded-xl border-white/30 text-white/80">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-white/60 mt-1 flex-shrink-0" />
                  <div className="flex gap-2 flex-wrap min-w-0 flex-1">
                    {showtimes.map((showtime, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs px-3 py-1 hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-emerald-300 rounded-xl flex flex-col items-center h-auto border-white/30 text-white/80 bg-white/10 backdrop-blur-sm min-w-[70px] flex-shrink-0"
                        onClick={() => handleShowtimeClick(movie.id)}
                      >
                        <span className="font-bold">{showtime.time}</span>
                        <span className="text-xs text-white/60">{showtime.format}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {Object.keys(movieShowtimes).length === 0 && (
              <div className="text-center py-12 text-white/60">
                <p>No movies currently showing at this theater.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TheaterShowtimesDialog;
