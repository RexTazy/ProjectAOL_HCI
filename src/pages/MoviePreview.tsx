import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, Star, Play, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import BookingDialog from "@/components/BookingDialog";
import CitySelector from "@/components/CitySelector";
import BackButton from "@/components/BackButton";
import InteractiveBackground from "@/components/InteractiveBackground";
import Footer from "@/components/Footer";
import { getMovieById, getTheatersByCity, generateShowtimesForTheater, getAvailableMoviesForCity } from "@/services/movieData";

const MoviePreview = () => {
  const { id } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'jakarta';
  });
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Save city selection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedCity]);

  // Get movie data from centralized service
  const movie = getMovieById(parseInt(id || "1"));
  
  if (!movie) {
    return (
      <div className="min-h-screen relative">
        <InteractiveBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h1 className="text-2xl font-bold text-white mb-2">Movie not found</h1>
            <p className="text-white/80">The movie you're looking for doesn't exist.</p>
            <BackButton to="/movies">Back to Movies</BackButton>
          </div>
        </div>
      </div>
    );
  }

  // Check if movie is available in selected city
  const availableMoviesInCity = getAvailableMoviesForCity(selectedCity);
  const isMovieAvailableInCity = availableMoviesInCity.some(m => m.id === movie.id) || movie.status === "upcoming";

  // Get theaters and their showtimes for this movie
  const theaters = getTheatersByCity(selectedCity);
  const theaterShowtimes = theaters.map(theater => {
    const showtimes = generateShowtimesForTheater(theater, availableMoviesInCity);
    const movieShowtimes = showtimes.showtimes.filter(st => st.movieId === movie.id);
    return {
      theater,
      showtimes: movieShowtimes
    };
  }).filter(ts => ts.showtimes.length > 0); // Only include theaters showing this movie

  const dates = [
    { date: "05", day: "Hari ini", isToday: true },
    { date: "06", day: "Jum", isToday: false },
    { date: "07", day: "Sab", isToday: false },
    { date: "08", day: "Min", isToday: false },
    { date: "09", day: "Sen", isToday: false },
    { date: "10", day: "Sel", isToday: false },
    { date: "11", day: "Rab", isToday: false },
  ];

  const handleShowtimeClick = (time: string, format: string, theaterName: string) => {
    setSelectedShowtime(time);
    setSelectedFormat(format);
    setSelectedTheater(theaterName);
    setIsBookingOpen(true);
  };

  const scrollToShowtimes = () => {
    const showtimesSection = document.getElementById('showtimes-section');
    if (showtimesSection) {
      showtimesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      setTimeout(() => {
        window.scrollBy(0, -80);
      }, 300);
    }
  };

  const getCityDisplayName = (city: string) => {
    if (city === "all-cities") return "All Cities";
    return city.charAt(0).toUpperCase() + city.slice(1);
  };

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <BackButton to="/movies">Back to Movies</BackButton>

          {/* Movie Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Movie Poster */}
              <div className="lg:col-span-1">
                <div 
                  className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backgroundImage: `url(${movie.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>

              {/* Movie Details */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
                <p className="text-lg text-white/80 mb-6">{movie.genre}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-white/60" />
                    <span className="text-white">{movie.duration}</span>
                  </div>
                  {movie.releaseDate && (
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-white/60" />
                      <span className="text-white">{movie.releaseDate}</span>
                    </div>
                  )}
                  <Badge variant="outline" className="px-3 py-1 border-white/30 text-white">
                    {movie.rating}
                  </Badge>
                </div>

                <div className="flex gap-4 mb-8">
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 shadow-lg"
                    onClick={() => setIsTrailerOpen(true)}
                  >
                    <Play size={18} className="mr-2" />
                    Watch Trailer
                  </Button>
                  {isMovieAvailableInCity && movie.status === "now-playing" && (
                    <Button 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg"
                      onClick={scrollToShowtimes}
                    >
                      Book Tickets
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {movie.description && (
                    <p className="text-white/80 leading-relaxed">{movie.description}</p>
                  )}
                  
                  {movie.director && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">Director</h3>
                      <p className="text-white/80">{movie.director}</p>
                    </div>
                  )}
                  
                  {movie.cast && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">Cast</h3>
                      <p className="text-white/80">{movie.cast.join(', ')}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-white mb-2">Available Formats</h3>
                    <div className="flex gap-2">
                      {movie.format.map((format) => (
                        <Badge key={format} variant="secondary" className="px-3 py-1 bg-white/20 text-white">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Showtimes Section */}
          {movie.status === "now-playing" && (
            <div id="showtimes-section" className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-white">Showtimes</h2>
                <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
              </div>

              {/* Date Selector */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {dates.map((dateItem) => (
                  <button
                    key={dateItem.date}
                    className={`flex-shrink-0 px-4 py-3 rounded-xl text-center min-w-[80px] ${
                      dateItem.isToday
                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
                        : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                    }`}
                  >
                    <div className="text-sm font-medium">{dateItem.day}</div>
                    <div className="text-lg font-bold">{dateItem.date}</div>
                  </button>
                ))}
              </div>

              {/* Theater Locations or No Theaters Message */}
              {isMovieAvailableInCity ? (
                theaterShowtimes.length > 0 ? (
                  <div className="space-y-6">
                    {theaterShowtimes.map(({ theater, showtimes }) => (
                      <Card key={theater.id} className="border-2 border-white/20 bg-white/10 backdrop-blur-md">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <MapPin size={18} className="text-white/60" />
                            <h3 className="text-lg font-semibold text-white">{theater.name}</h3>
                            <div className="flex gap-2 ml-auto">
                              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 rounded-xl">
                                {theater.screens} Screens
                              </Badge>
                              {theater.facilities.includes("The Premiere") && (
                                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 rounded-xl">
                                  The Premiere
                                </Badge>
                              )}
                              {theater.facilities.includes("IMAX") && (
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 rounded-xl">
                                  IMAX
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {showtimes.map((showtime, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="flex flex-col items-center py-3 h-auto bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 hover:border-emerald-500/70"
                                onClick={() => handleShowtimeClick(showtime.time, showtime.format, theater.name)}
                              >
                                <span className="font-bold text-lg">{showtime.time}</span>
                                <span className="text-xs text-white/70">{showtime.format}</span>
                                <span className="text-xs text-white/50">Screen {showtime.screen}</span>
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin size={64} className="mx-auto text-white/40 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No showtimes available</h3>
                    <p className="text-white/60">
                      This movie is not currently showing in theaters in {getCityDisplayName(selectedCity)}.
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <MapPin size={64} className="mx-auto text-white/40 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Movie not available</h3>
                  <p className="text-white/60">
                    This movie is not currently playing in {getCityDisplayName(selectedCity)} due to theater capacity limits.
                    Try selecting a different city or check upcoming movies.
                  </p>
                </div>
              )}
            </div>
          )}

          {movie.status === "upcoming" && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8">
              <div className="text-center py-12">
                <Calendar size={64} className="mx-auto text-white/40 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Coming Soon</h3>
                <p className="text-white/60">
                  This movie will be available for booking soon. Check back on the release date.
                </p>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* YouTube Trailer Modal */}
      {isTrailerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsTrailerOpen(false)}>
          <div className="relative w-full max-w-4xl mx-4 aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
              onClick={() => setIsTrailerOpen(false)}
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/BI6BbO8PYrc?autoplay=1"
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      <BookingDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        movie={movie}
        selectedTime={selectedShowtime}
        selectedFormat={selectedFormat}
        selectedTheater={selectedTheater}
      />
    </div>
  );
};

export default MoviePreview;
