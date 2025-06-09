
import { Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Theater, getAvailableMoviesForCity, generateShowtimesForTheater, getMovieById } from "@/services/movieData";

interface TheaterShowtimesProps {
  theaterName: string;
  location: string;
  screenCount: number;
  theater?: Theater;
  selectedCity?: string;
}

const TheaterShowtimes = ({ theaterName, location, screenCount, theater, selectedCity = "jakarta" }: TheaterShowtimesProps) => {
  const navigate = useNavigate();
  
  // Get available movies for the city and generate realistic showtimes
  const availableMovies = getAvailableMoviesForCity(selectedCity);
  
  const theaterData = theater || {
    id: 1,
    name: theaterName,
    city: selectedCity,
    location: location,
    distance: "0 km",
    screens: screenCount,
    facilities: ["XXI Café"],
    address: location
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
    // Set the city to match the theater's city before navigating
    localStorage.setItem('selectedCity', theaterData.city);
    navigate(`/movie/${movieId}`);
  };

  const handleShowtimeClick = (movieId: number) => {
    // Set the city to match the theater's city before navigating
    localStorage.setItem('selectedCity', theaterData.city);
    navigate(`/movie/${movieId}`);
  };

  return (
    <Card className="w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-white">{theaterName}</CardTitle>
            <div className="flex items-center gap-2 text-white/70 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            {screenCount} Screens
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {Object.values(movieShowtimes).map(({ movie, showtimes }) => (
          <div key={movie.id} className="border-l-4 border-emerald-500 pl-4 py-2">
            <div className="flex items-start justify-between mb-2">
              <div 
                className="cursor-pointer hover:text-emerald-400 transition-colors"
                onClick={() => handleMovieClick(movie.id)}
              >
                <h4 className="font-semibold text-white hover:text-emerald-400">{movie.title}</h4>
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span>{movie.rating}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                  <span>•</span>
                  <div className="flex gap-1">
                    {movie.format.map((format: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs border-white/30 text-white/80">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Clock className="h-4 w-4 text-white/60" />
              <div className="flex gap-2 flex-wrap">
                {showtimes.map((showtime, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs px-3 py-1 hover:bg-emerald-50/10 hover:border-emerald-300 flex flex-col items-center h-auto border-white/30 text-white/80"
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
          <div className="text-center py-8 text-white/60">
            <p>No movies currently showing at this theater.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TheaterShowtimes;
