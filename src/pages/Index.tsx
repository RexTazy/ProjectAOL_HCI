
import { Link } from "react-router-dom";
import { Film, MapPin, Gift, Megaphone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";
import CitySelector from "@/components/CitySelector";
import { useState, useEffect } from "react";
import { getAvailableMoviesForCity } from "@/services/movieData";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'jakarta';
  });
  const [carouselApi, setCarouselApi] = useState<any>(null);
  
  // Save city selection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
  }, [selectedCity]);
  
  const navigationCards = [
    {
      title: "Browse Now Playing",
      icon: Film,
      path: "/movies",
      color: "bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
    },
    {
      title: "Find Theaters",
      icon: MapPin,
      path: "/theaters",
      color: "bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
    },
    {
      title: "View Promotions",
      icon: Gift,
      path: "/promotions",
      color: "bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
    },
    {
      title: "Read News",
      icon: Megaphone,
      path: "/info21",
      color: "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    }
  ];

  // Get movies that are actually available in the selected city
  const [featuredMovies, setFeaturedMovies] = useState(() => {
    const availableMovies = getAvailableMoviesForCity(selectedCity);
    return availableMovies.slice(0, 4);
  });

  useEffect(() => {
    // Get movies available in the selected city and take first 4
    const availableMovies = getAvailableMoviesForCity(selectedCity);
    setFeaturedMovies(availableMovies.slice(0, 4));
  }, [selectedCity]);

  // Auto-rotate carousel every 6 seconds and track current slide
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);
    onSelect();

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 6000);

    return () => {
      clearInterval(interval);
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  const highlightItems = [
    {
      id: 1,
      title: "Black Panther: Wakanda Forever",
      subtitle: "Now Showing in Theaters",
      image: "/lovable-uploads/1aa34e35-c821-4d1c-870b-3afcf91b1257.png"
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      subtitle: "Back in theaters for limited time",
      image: "/lovable-uploads/03747d74-c0c1-4b67-8ce4-2d754e01f7ff.png"
    },
    {
      id: 3,
      title: "Oppenheimer",
      subtitle: "The story of the atomic bomb",
      image: "/lovable-uploads/f702fe9a-a312-45be-8fce-fc9af8f25989.png"
    },
    {
      id: 4,
      title: "Avatar: The Way of Water",
      subtitle: "Experience the wonder of Pandora",
      image: "/lovable-uploads/94acf1a4-1378-4c64-83e8-cd6a35a1827e.png"
    }
  ];

  const promotions = [
    {
      id: 1,
      title: "Student Discount",
      description: "Get 20% off with valid student ID",
      validUntil: "Valid until Dec 31, 2024"
    },
    {
      id: 2,
      title: "Weekend Special",
      description: "Buy 2 get 1 free on weekends",
      validUntil: "Every weekend"
    }
  ];

  const news = [
    {
      id: 1,
      title: "New IMAX Theater Opening",
      description: "Experience movies like never before in our new IMAX theater",
      date: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "Holiday Movie Marathon",
      description: "Join us for a special holiday movie marathon event",
      date: "Dec 20, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 pb-0">
      {/* Main Search Section */}
      <div className="py-16 bg-gradient-to-br from-slate-800 via-teal-900 to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Find Movies and Theaters</h1>
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Highlights Carousel - Optimized for mobile */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <div className="relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setCarouselApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {highlightItems.map((item, index) => {
                const distance = Math.abs(index - currentSlide);
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.3;
                
                return (
                  <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-[85%] sm:basis-[90%] md:basis-4/5 lg:basis-3/4">
                    <div 
                      className="h-64 md:h-80 rounded-2xl overflow-hidden relative shadow-2xl transition-all duration-500"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: opacity
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white max-w-2xl">
                        <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{item.title}</h2>
                        <p className="text-gray-200 mb-2 md:mb-4 text-sm md:text-base">{item.subtitle}</p>
                        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 rounded-xl px-4 md:px-6 text-sm md:text-base">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {/* Hide arrows on mobile, show on desktop */}
            <CarouselPrevious className="hidden md:flex left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
            <CarouselNext className="hidden md:flex right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
          </Carousel>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {highlightItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => {
                  if (carouselApi) {
                    carouselApi.scrollTo(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Cards - Redesigned */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {navigationCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={card.title} 
                className={`${card.color} border-0 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer rounded-2xl overflow-hidden h-24`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={card.path}>
                  <CardContent className="p-4 text-center h-full flex flex-col justify-center items-center">
                    <div className="flex justify-center mb-2">
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {card.title}
                    </h3>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Movies Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Now Playing</h2>
            <p className="text-gray-600">Latest blockbusters in our theaters</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
            <Button asChild variant="outline" className="rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300">
              <Link to="/movies" className="flex items-center gap-2">
                See All Movies <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featuredMovies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${selectedCity}`} movie={movie} index={index} />
          ))}
        </div>
      </div>

      {/* Promotions Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Special Promotions</h2>
            <p className="text-gray-600">Don't miss these amazing deals</p>
          </div>
          <Button asChild variant="outline" className="rounded-xl border-2 hover:bg-orange-50 hover:border-orange-300">
            <Link to="/promotions" className="flex items-center gap-2">
              View All <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.map((promo) => (
            <Card key={promo.id} className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-all duration-300 rounded-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{promo.title}</h3>
                <p className="text-gray-700 mb-3">{promo.description}</p>
                <p className="text-sm text-orange-600 font-medium">{promo.validUntil}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Latest News</h2>
            <p className="text-gray-600">Stay updated with cinema news</p>
          </div>
          <Button asChild variant="outline" className="rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300">
            <Link to="/info21" className="flex items-center gap-2">
              Read More <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((article) => (
            <Card key={article.id} className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200 hover:shadow-lg transition-all duration-300 rounded-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-700 mb-3">{article.description}</p>
                <p className="text-sm text-teal-600 font-medium">{article.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
