
import { useState } from "react";
import { Film, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    genre: string;
    rating: string;
    duration: string;
    image: string;
    isAdvanceTicket?: boolean;
    status?: string;
  };
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const isImageUrl = movie.image.startsWith('/lovable-uploads/') || movie.image.startsWith('http');
  const isUpcoming = movie.status === "upcoming";
  
  // Optimize image loading by adding dimension parameters
  const getOptimizedImageUrl = (url: string) => {
    if (url.startsWith('/lovable-uploads/')) {
      // Add width parameter to scale down the image (300px width for movie cards)
      return `${url}?w=300&q=80`;
    }
    return url;
  };
  
  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTrailerOpen(true);
  };
  
  return (
    <>
      <Link to={`/movie/${movie.id}`}>
        <Card 
          className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group relative bg-white/10 backdrop-blur-md border border-white/20"
          style={{ 
            animationDelay: `${index * 100}ms`,
            aspectRatio: '27/40'
          }}
        >
          {/* Movie Poster */}
          <div 
            className={`h-full flex items-center justify-center relative group-hover:brightness-75 transition-all duration-300 overflow-hidden ${
              !isImageUrl ? movie.image : ''
            }`}
            style={isImageUrl ? {
              backgroundImage: `url(${getOptimizedImageUrl(movie.image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            } : {}}
          >
            {!isImageUrl && <Film size={48} className="text-white opacity-30" />}
            
            {/* Always visible badge */}
            {movie.isAdvanceTicket && (
              <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-white border-0 text-xs">
                  Advance ticket sales
                </Badge>
              </div>
            )}

            {/* Hover overlay with details - Made much darker for better readability */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex flex-col justify-end p-2 md:p-4">
              <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-sm md:text-lg font-semibold mb-1 md:mb-2 line-clamp-2">{movie.title}</h3>
                <p className="text-gray-200 text-xs md:text-sm mb-1 md:mb-2">{movie.genre}</p>
                <div className="flex justify-between items-center text-xs md:text-sm text-gray-300 mb-2 md:mb-4">
                  <span>{movie.rating}</span>
                  <span>{movie.duration}</span>
                </div>
                <div className={`flex ${isUpcoming ? 'justify-center' : 'flex-col'} gap-1 md:gap-2`}>
                  {!isUpcoming && (
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 text-xs md:text-sm py-1 md:py-2 shadow-lg" 
                      size="sm"
                      asChild
                    >
                      <Link to={`/movie/${movie.id}`}>
                        Book Now
                      </Link>
                    </Button>
                  )}
                  <Button 
                    className={`${isUpcoming ? 'w-full' : 'w-full'} bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 text-xs md:text-sm py-1 md:py-2 shadow-lg`}
                    size="sm"
                    onClick={handleTrailerClick}
                  >
                    <Play size={12} className="mr-1" />
                    Trailer
                  </Button>
                </div>
              </div>
            </div>

            {/* Black gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
          </div>

          {/* Basic info always visible below the poster - Completely hidden on hover */}
          <CardContent className="p-2 md:p-3 bg-white/10 backdrop-blur-sm absolute bottom-0 left-0 right-0 group-hover:translate-y-full transition-transform duration-300">
            <h3 className="font-semibold text-xs md:text-sm mb-1 line-clamp-1 text-center text-white drop-shadow-lg">{movie.title}</h3>
            <p className="text-white/70 text-xs text-center drop-shadow-lg">{movie.rating} • {movie.duration}</p>
          </CardContent>
        </Card>
      </Link>

      {/* YouTube Trailer Modal */}
      {isTrailerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setIsTrailerOpen(false)}>
          <div className="relative w-full max-w-4xl mx-4 aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-8 md:-top-10 right-0 text-white text-xl md:text-2xl hover:text-gray-300"
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
    </>
  );
};

export default MovieCard;
