// Centralized movie and theater data service
export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  duration: string;
  format: string[];
  status: "now-playing" | "upcoming";
  image: string;
  isAdvanceTicket?: boolean;
  description?: string;
  director?: string;
  cast?: string[];
  releaseDate?: string;
}

export interface Theater {
  id: number;
  name: string;
  city: string;
  location: string;
  distance: string;
  screens: number;
  facilities: string[];
  address: string;
  premiere?: number;
  imax?: number;
}

export interface Showtime {
  movieId: number;
  time: string;
  format: string;
  screen: number;
}

export interface TheaterShowtimes {
  theaterId: number;
  date: string;
  showtimes: Showtime[];
}

// All available movies
export const allMovies: Movie[] = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    genre: "sci-fi",
    rating: "13+",
    duration: "192 min",
    format: ["Regular", "IMAX"],
    status: "now-playing",
    image: "/lovable-uploads/0526d1c8-3d44-4780-a418-1bcf008e8c08.png",
    description: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    releaseDate: "December 16, 2022"
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    genre: "action",
    rating: "13+",
    duration: "131 min",
    format: ["Regular", "Dolby Atmos"],
    status: "now-playing",
    image: "/lovable-uploads/803fb1bf-8f36-444a-9849-f34a22648a8f.png",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    releaseDate: "May 27, 2022"
  },
  {
    id: 3,
    title: "The Batman",
    genre: "action",
    rating: "17+",
    duration: "176 min",
    format: ["Regular", "IMAX"],
    status: "now-playing",
    image: "/lovable-uploads/22ac56e6-2544-463f-a09c-f32816259ad7.png",
    description: "When a killer targets Gotham's elite with a series of sadistic machinations, a trail of cryptic clues sends the World's Greatest Detective on an investigation into the underworld.",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    releaseDate: "March 4, 2022"
  },
  {
    id: 4,
    title: "Black Panther: Wakanda Forever",
    genre: "action",
    rating: "13+",
    duration: "161 min",
    format: ["Regular", "IMAX"],
    status: "now-playing",
    image: "/lovable-uploads/806e3694-aadd-4071-b1e4-9ee209ca08e5.png",
    description: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death.",
    director: "Ryan Coogler",
    cast: ["Letitia Wright", "Angela Bassett", "Tenoch Huerta"],
    releaseDate: "November 11, 2022"
  },
  {
    id: 5,
    title: "Glass Onion: A Knives Out Mystery",
    genre: "thriller",
    rating: "13+",
    duration: "139 min",
    format: ["Regular"],
    status: "now-playing",
    image: "/lovable-uploads/85148de4-a86b-41f7-93ec-334e7918c038.png",
    description: "Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Benoit Blanc is put on the case.",
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Edward Norton", "Janelle Monáe"],
    releaseDate: "December 23, 2022"
  },
  {
    id: 6,
    title: "Spider-Man: Across the Spider-Verse",
    genre: "animation",
    rating: "PG",
    duration: "140 min",
    format: ["Regular", "IMAX"],
    status: "now-playing",
    image: "/lovable-uploads/5a6160c7-d6c6-4523-9a5e-a7a4c807e21a.png",
    isAdvanceTicket: true,
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry"],
    releaseDate: "June 2, 2023"
  },
  {
    id: 7,
    title: "Dune: Part Two",
    genre: "sci-fi",
    rating: "PG-13",
    duration: "166 min",
    format: ["Regular", "IMAX"],
    status: "now-playing",
    image: "/lovable-uploads/5eb2ef8e-cf7c-449e-a2a9-cc9f95710c8a.png",
    isAdvanceTicket: true,
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    releaseDate: "March 1, 2024"
  },
  {
    id: 8,
    title: "Guardians of the Galaxy Vol. 3",
    genre: "action",
    rating: "PG-13",
    duration: "150 min",
    format: ["Regular", "IMAX"],
    status: "now-playing",
    image: "/lovable-uploads/be098f13-91e3-483b-aad1-1985b856529e.png",
    description: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own.",
    director: "James Gunn",
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
    releaseDate: "May 5, 2023"
  },
  {
    id: 9,
    title: "Indiana Jones and the Dial of Destiny",
    genre: "action",
    rating: "PG-13",
    duration: "154 min",
    format: ["Regular", "IMAX"],
    status: "now-playing",
    image: "/lovable-uploads/97dedfc4-8a4d-4591-b41a-f6808687c254.png",
    description: "Finding himself in a new era, approaching retirement, Indy wrestles with fitting into a world that seems to have outgrown him.",
    director: "James Mangold",
    cast: ["Harrison Ford", "Phoebe Waller-Bridge", "Antonio Banderas"],
    releaseDate: "June 30, 2023"
  },
  {
    id: 10,
    title: "Bullet Train",
    genre: "action",
    rating: "R",
    duration: "127 min",
    format: ["Regular"],
    status: "now-playing",
    image: "/lovable-uploads/9f4cb4ff-2e94-40be-80b1-390db7248a17.png",
    description: "Five assassins aboard a fast moving bullet train find out their missions have something in common.",
    director: "David Leitch",
    cast: ["Brad Pitt", "Joey King", "Aaron Taylor-Johnson"],
    releaseDate: "August 5, 2022"
  },
  // Upcoming movies
  {
    id: 11,
    title: "Oppenheimer",
    genre: "drama",
    rating: "17+",
    duration: "180 min",
    format: ["IMAX", "Dolby Atmos"],
    status: "upcoming",
    image: "/lovable-uploads/13cb9e02-bc9c-4d08-8875-bda485a3cb05.png",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    releaseDate: "July 21, 2023"
  },
  {
    id: 12,
    title: "John Wick: Chapter 4",
    genre: "action",
    rating: "17+",
    duration: "169 min",
    format: ["Regular", "IMAX"],
    status: "upcoming",
    image: "/lovable-uploads/4abd4b1d-6adc-4780-aa36-7b46c9659cb3.png",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    releaseDate: "March 24, 2023"
  },
  {
    id: 13,
    title: "The Super Mario Bros. Movie",
    genre: "animation",
    rating: "General",
    duration: "92 min",
    format: ["Regular", "Dolby Atmos"],
    status: "upcoming",
    image: "/lovable-uploads/2aa2a4ad-92e9-4bb7-b30a-b6e1f2332ffd.png",
    description: "A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.",
    director: "Aaron Horvath",
    cast: ["Chris Pratt", "Anya Taylor-Joy", "Charlie Day"],
    releaseDate: "April 5, 2023"
  },
  {
    id: 14,
    title: "Fast X",
    genre: "action",
    rating: "13+",
    duration: "141 min",
    format: ["Regular", "IMAX"],
    status: "upcoming",
    image: "/lovable-uploads/bc29e02f-aa44-40b8-a048-242e5470c7f5.png",
    description: "Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.",
    director: "Louis Leterrier",
    cast: ["Vin Diesel", "Michelle Rodriguez", "Tyrese Gibson"],
    releaseDate: "May 19, 2023"
  }
];

// All theaters
export const allTheaters: Theater[] = [
  // Jakarta Area
  { id: 1, name: "Plaza Indonesia XXI", city: "jakarta", location: "Jakarta Pusat", distance: "2.5 km", screens: 8, facilities: ["IMAX", "The Premiere"], address: "Plaza Indonesia Level 5, Jl. M.H. Thamrin Kav. 28-30" },
  { id: 2, name: "Grand Indonesia XXI", city: "jakarta", location: "Jakarta Pusat", distance: "3.1 km", screens: 10, facilities: ["The Premiere", "XXI Café"], address: "Grand Indonesia Shopping Town Level 3A" },
  
  // Tangerang
  { id: 3, name: "BSD XXI", city: "tangerang", location: "Tangerang Selatan", distance: "15.2 km", screens: 4, facilities: ["XXI Café"], address: "BSD City, Tangerang Selatan" },
  { id: 4, name: "Bintaro XXI", city: "tangerang", location: "Tangerang Selatan", distance: "18.8 km", screens: 4, facilities: ["XXI Café"], address: "Bintaro Jaya, Tangerang Selatan" },
  { id: 5, name: "Summarecon Serpong XXI", city: "tangerang", location: "Tangerang", distance: "22.3 km", screens: 6, facilities: ["XXI Café"], address: "Summarecon Mall Serpong, Tangerang" },
  { id: 6, name: "Living World XXI", city: "tangerang", location: "Tangerang Selatan", distance: "16.5 km", screens: 6, facilities: ["The Premiere", "XXI Café"], address: "Living World Mall, Tangerang Selatan" },
  
  // Bekasi
  { id: 7, name: "Mega Bekasi XXI", city: "bekasi", location: "Bekasi", distance: "25.3 km", screens: 10, facilities: ["XXI Café"], address: "Mega Bekasi Hypermall, Bekasi" },
  { id: 8, name: "Ciputra Cibubur XXI", city: "bekasi", location: "Bekasi", distance: "22.8 km", screens: 7, facilities: ["The Premiere", "XXI Café"], address: "Ciputra Cibubur Mall, Bekasi" },
  { id: 9, name: "Bekasi Square XXI", city: "bekasi", location: "Bekasi", distance: "27.1 km", screens: 3, facilities: ["XXI Café"], address: "Bekasi Square Mall, Bekasi" },
  { id: 10, name: "Metropolitan XXI", city: "bekasi", location: "Bekasi", distance: "24.7 km", screens: 4, facilities: ["XXI Café"], address: "Metropolitan Mall, Bekasi" },
  
  // Bandung
  { id: 11, name: "BTC XXI", city: "bandung", location: "Bandung", distance: "150 km", screens: 3, facilities: ["XXI Café"], address: "Bandung Trade Center, Bandung" },
  { id: 12, name: "Summarecon Mall Bandung XXI", city: "bandung", location: "Bandung", distance: "148 km", screens: 8, facilities: ["IMAX", "The Premiere", "Dolby Atmos"], address: "Summarecon Mall Bandung, Bandung" },
  
  // Semarang
  { id: 13, name: "Paragon XXI", city: "semarang", location: "Semarang", distance: "450 km", screens: 4, facilities: ["XXI Café"], address: "Paragon Mall, Semarang" },
  
  // Solo
  { id: 14, name: "Studio XXI (Solo Square)", city: "solo", location: "Solo", distance: "550 km", screens: 5, facilities: ["XXI Café"], address: "Solo Square Mall, Solo" },
  { id: 15, name: "Solo Paragon XXI", city: "solo", location: "Solo", distance: "548 km", screens: 6, facilities: ["The Premiere", "XXI Café"], address: "Solo Paragon Mall, Solo" },
  
  // Yogyakarta
  { id: 16, name: "Empire XXI", city: "yogyakarta", location: "Yogyakarta", distance: "560 km", screens: 6, facilities: ["XXI Café"], address: "Empire XXI, Yogyakarta" },
  { id: 17, name: "Jogja City Mall XXI", city: "yogyakarta", location: "Yogyakarta", distance: "558 km", screens: 7, facilities: ["The Premiere", "XXI Café"], address: "Jogja City Mall, Yogyakarta" },
  
  // Surabaya
  { id: 18, name: "Tunjungan XXI", city: "surabaya", location: "Surabaya", distance: "670 km", screens: 4, facilities: ["XXI Café"], address: "Tunjungan Plaza, Surabaya" },
  { id: 19, name: "Supermall XXI", city: "surabaya", location: "Surabaya", distance: "675 km", screens: 5, facilities: ["XXI Café"], address: "Supermall Pakuwon Indah, Surabaya" },
  { id: 20, name: "Galaxy XXI", city: "surabaya", location: "Surabaya", distance: "672 km", screens: 5, facilities: ["XXI Café"], address: "Galaxy Mall, Surabaya" },
  { id: 21, name: "Grand City XXI", city: "surabaya", location: "Surabaya", distance: "668 km", screens: 7, facilities: ["The Premiere", "XXI Café"], address: "Grand City Mall, Surabaya" },
  { id: 22, name: "Lenmarc XXI", city: "surabaya", location: "Surabaya", distance: "673 km", screens: 5, facilities: ["The Premiere", "XXI Café"], address: "Lenmarc Mall, Surabaya" },
  { id: 23, name: "Ciputra World XXI", city: "surabaya", location: "Surabaya", distance: "671 km", screens: 10, facilities: ["The Premiere", "Dolby Atmos"], address: "Ciputra World Mall, Surabaya" },
  
  // Denpasar
  { id: 24, name: "Beachwalk XXI", city: "denpasar", location: "Denpasar", distance: "1150 km", screens: 3, facilities: ["The Premiere", "XXI Café"], address: "Beachwalk Shopping Center, Denpasar" },
  { id: 25, name: "Galeria XXI", city: "denpasar", location: "Denpasar", distance: "1148 km", screens: 2, facilities: ["XXI Café"], address: "Galeria Mall, Denpasar" },
  
  // Other cities
  { id: 26, name: "Mega XXI", city: "batam", location: "Batam", distance: "1050 km", screens: 6, facilities: ["XXI Café"], address: "Mega Mall Batam, Batam" },
  { id: 27, name: "Studio XXI (Pasar Baru Square)", city: "balikpapan", location: "Balikpapan", distance: "1200 km", screens: 4, facilities: ["XXI Café"], address: "Pasar Baru Square, Balikpapan" },
  { id: 28, name: "Riau XXI", city: "pekanbaru", location: "Pekanbaru", distance: "900 km", screens: 7, facilities: ["XXI Café"], address: "Riau Mall, Pekanbaru" },
  { id: 29, name: "Hermes XXI", city: "medan", location: "Medan", distance: "1400 km", screens: 6, facilities: ["XXI Café"], address: "Hermes Palace Mall, Medan" }
];

// Function to get theaters by city
export const getTheatersByCity = (city: string): Theater[] => {
  if (city === "all-cities") return allTheaters;
  return allTheaters.filter(theater => theater.city === city);
};

// Function to calculate available movies for a city based on total screen capacity
export const getAvailableMoviesForCity = (city: string): Movie[] => {
  const theaters = getTheatersByCity(city);
  const totalScreens = theaters.reduce((sum, theater) => sum + theater.screens, 0);
  
  // Realistic capacity: assume each movie needs at least 2-3 showtimes per day
  // and each screen can show 4-5 movies per day
  const maxMovies = Math.min(Math.floor(totalScreens * 1.5), allMovies.filter(m => m.status === "now-playing").length);
  
  // Get a consistent selection of movies for this city
  const seed = city.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const shuffledMovies = [...allMovies.filter(m => m.status === "now-playing")];
  
  // Simple seeded shuffle
  for (let i = shuffledMovies.length - 1; i > 0; i--) {
    const j = (seed + i) % (i + 1);
    [shuffledMovies[i], shuffledMovies[j]] = [shuffledMovies[j], shuffledMovies[i]];
  }
  
  return shuffledMovies.slice(0, maxMovies);
};

// Function to get assigned screen types for a theater
const getTheaterScreenTypes = (theater: Theater): Record<number, string> => {
  const screenTypes: Record<number, string> = {};
  
  // Assign screen types based on theater facilities
  let currentScreen = 1;
  
  // Regular screens first
  for (let i = 1; i <= theater.screens; i++) {
    screenTypes[i] = "Regular";
  }
  
  // Assign IMAX to the largest screen (usually the last one)
  if (theater.facilities.includes("IMAX")) {
    screenTypes[theater.screens] = "IMAX";
  }
  
  // Assign The Premiere to second-to-last screen if available
  if (theater.facilities.includes("The Premiere")) {
    const premiereScreen = theater.screens > 1 ? theater.screens - 1 : theater.screens;
    // Don't override IMAX screen
    if (screenTypes[premiereScreen] !== "IMAX") {
      screenTypes[premiereScreen] = "The Premiere";
    } else if (theater.screens > 2) {
      // Use third-to-last if second-to-last is IMAX
      screenTypes[theater.screens - 2] = "The Premiere";
    }
  }
  
  return screenTypes;
};

// Function to generate showtimes for a theater
export const generateShowtimesForTheater = (theater: Theater, availableMovies: Movie[]): TheaterShowtimes => {
  const showtimes: Showtime[] = [];
  const timeSlots = ["10:00", "13:30", "16:45", "19:20", "22:00"];
  const screenTypes = getTheaterScreenTypes(theater);
  
  // Create a schedule grid to track what's playing when and where
  const scheduleGrid: Record<number, Record<string, number | null>> = {};
  
  // Initialize schedule grid
  for (let screen = 1; screen <= theater.screens; screen++) {
    scheduleGrid[screen] = {};
    timeSlots.forEach(time => {
      scheduleGrid[screen][time] = null;
    });
  }
  
  // Determine how many movies we can realistically show
  // Most theaters don't use 100% capacity, aim for 60-80% utilization
  const maxMoviesPerSession = Math.max(1, Math.floor(theater.screens * 0.8));
  const totalUniqueMovies = Math.min(availableMovies.length, theater.screens + 2); // Can show a bit more than screens due to scheduling
  
  // Select which movies will be shown at this theater
  const selectedMovies = availableMovies.slice(0, totalUniqueMovies);
  
  // Create a more realistic schedule
  // Some movies get more showtimes (popular ones), some get fewer
  const movieSchedulePriority = selectedMovies.map((movie, index) => ({
    movie,
    priority: index < 3 ? 3 : index < 6 ? 2 : 1, // First 3 movies get 3 showtimes, next 3 get 2, rest get 1
    assignedCount: 0
  }));
  
  // Fill schedule time slot by time slot
  timeSlots.forEach(timeSlot => {
    const availableScreens = [];
    
    // Find available screens for this time slot
    for (let screen = 1; screen <= theater.screens; screen++) {
      if (scheduleGrid[screen][timeSlot] === null) {
        availableScreens.push(screen);
      }
    }
    
    // Limit screens used in this time slot (realistic utilization)
    const screensToUse = Math.min(availableScreens.length, maxMoviesPerSession);
    const selectedScreens = availableScreens.slice(0, screensToUse);
    
    // Assign movies to selected screens based on priority and format compatibility
    const moviesToAssign = movieSchedulePriority
      .filter(mp => mp.assignedCount < mp.priority)
      .sort((a, b) => {
        // Prioritize movies that need more showtimes
        const aNeedsMore = a.priority - a.assignedCount;
        const bNeedsMore = b.priority - b.assignedCount;
        return bNeedsMore - aNeedsMore;
      });
    
    selectedScreens.forEach((screen, index) => {
      if (index < moviesToAssign.length) {
        const { movie } = moviesToAssign[index];
        const screenType = screenTypes[screen];
        
        // Check format compatibility
        const movieSupportsFormat = movie.format.includes(screenType) || 
                                  (screenType === "Regular" && movie.format.length > 0) ||
                                  (screenType === "The Premiere" && movie.format.includes("Regular"));
        
        if (movieSupportsFormat) {
          // Assign this movie to this screen and time
          scheduleGrid[screen][timeSlot] = movie.id;
          
          // Determine the format to display
          let displayFormat = "Regular";
          if (screenType === "IMAX" && movie.format.includes("IMAX")) {
            displayFormat = "IMAX";
          } else if (screenType === "The Premiere") {
            displayFormat = "The Premiere";
          } else if (movie.format.includes("Dolby Atmos") && theater.facilities.includes("Dolby Atmos")) {
            displayFormat = "Dolby Atmos";
          }
          
          showtimes.push({
            movieId: movie.id,
            time: timeSlot,
            format: displayFormat,
            screen
          });
          
          // Update assigned count
          moviesToAssign[index].assignedCount++;
        }
      }
    });
  });
  
  return {
    theaterId: theater.id,
    date: new Date().toISOString().split('T')[0],
    showtimes
  };
};

// Function to get movie by ID
export const getMovieById = (id: number): Movie | undefined => {
  return allMovies.find(movie => movie.id === id);
};

// Function to get theater by ID
export const getTheaterById = (id: number): Theater | undefined => {
  return allTheaters.find(theater => theater.id === id);
};

// Function to get showtimes for a specific movie across all theaters in a city
export const getMovieShowtimesInCity = (movieId: number, city: string) => {
  const theaters = getTheatersByCity(city);
  const availableMovies = getAvailableMoviesForCity(city);
  
  // Only proceed if this movie is available in this city
  if (!availableMovies.find(m => m.id === movieId)) {
    return [];
  }
  
  return theaters.map(theater => {
    const theaterShowtimes = generateShowtimesForTheater(theater, availableMovies);
    const movieShowtimes = theaterShowtimes.showtimes.filter(showtime => showtime.movieId === movieId);
    
    return {
      theater,
      showtimes: movieShowtimes
    };
  }).filter(item => item.showtimes.length > 0);
};
