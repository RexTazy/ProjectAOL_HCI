
import { Clock, MapPin, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  
  const availableMovies = getAvailableMoviesForCity(selectedCity);
  
  const theaterData = {
    id: 1,
    name: theater.name,
    city: selectedCity,
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
    onClose();
    navigate(`/movie/${movieId}`);
  };

  const handleShowtimeClick = (movieId: number) => {
    onClose();
    navigate(`/movie/${movieId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white text-gray-900 border-0 rounded-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">{theater.name}</DialogTitle>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{theater.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 rounded-xl">
                {theater.screens} Screens
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {Object.values(movieShowtimes).map(({ movie, showtimes }) => (
            <div key={movie.id} className="border-l-4 border-emerald-500 pl-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-r-xl">
              <div className="flex items-start justify-between mb-2">
                <div 
                  className="cursor-pointer hover:text-emerald-600 transition-colors"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <h4 className="font-semibold text-gray-900 hover:text-emerald-600">{movie.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{movie.rating}</span>
                    <span>•</span>
                    <span>{movie.duration}</span>
                    <span>•</span>
                    <div className="flex gap-1">
                      {movie.format.map((format: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs rounded-xl">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Clock className="h-4 w-4 text-gray-400" />
                <div className="flex gap-2 flex-wrap">
                  {showtimes.map((showtime, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs px-3 py-1 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl flex flex-col items-center h-auto"
                      onClick={() => handleShowtimeClick(movie.id)}
                    >
                      <span className="font-bold">{showtime.time}</span>
                      <span className="text-xs text-gray-500">{showtime.format}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {Object.keys(movieShowtimes).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No movies currently showing at this theater.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TheaterShowtimesDialog;
