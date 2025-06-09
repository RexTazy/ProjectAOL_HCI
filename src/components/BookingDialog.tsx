
import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Star, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movie: {
    id: number;
    title: string;
    genre: string;
    rating: string;
    duration: string;
  };
  selectedTime?: string;
  selectedFormat?: string;
  selectedTheater?: string;
}

const BookingDialog = ({ isOpen, onClose, movie, selectedTime = "10:00", selectedFormat = "Regular", selectedTheater = "Cinema XXI" }: BookingDialogProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [email, setEmail] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);

  const showTimes = ["10:00", "13:30", "16:45", "19:20", "22:00"];
  
  const seatRows = [
    { row: 1, seats: 9 },
    { row: 2, seats: 9 },
    { row: 3, seats: 9 },
    { row: 4, seats: 9 },
    { row: 5, seats: 11 },
    { row: 6, seats: 11 },
    { row: 7, seats: 11 },
  ];

  const bookedSeats = ["1-3", "1-4", "2-5", "3-7", "4-2", "5-8", "6-6"];

  const totalPeople = adults + children;

  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      // Select the seat, but limit to total number of people
      if (selectedSeats.length < totalPeople) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        // Replace the oldest selected seat with the new one
        const newSelectedSeats = [...selectedSeats];
        newSelectedSeats.shift(); // Remove the first seat
        newSelectedSeats.push(seatId); // Add the new seat
        setSelectedSeats(newSelectedSeats);
      }
    }
  };

  const handleAdultsChange = (newAdults: number) => {
    setAdults(newAdults);
    const newTotal = newAdults + children;
    // If we have more selected seats than people, remove excess seats
    if (selectedSeats.length > newTotal) {
      setSelectedSeats(selectedSeats.slice(0, newTotal));
    }
  };

  const handleChildrenChange = (newChildren: number) => {
    setChildren(newChildren);
    const newTotal = adults + newChildren;
    // If we have more selected seats than people, remove excess seats
    if (selectedSeats.length > newTotal) {
      setSelectedSeats(selectedSeats.slice(0, newTotal));
    }
  };

  const getSeatStatus = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return "booked";
    if (selectedSeats.includes(seatId)) return "selected";
    return "available";
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 1.6));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.8));
  };

  const ticketPrice = 50000;
  const studentDiscount = 0.25;
  const totalTickets = selectedSeats.length;
  const subtotal = totalTickets * ticketPrice;
  const discount = subtotal * studentDiscount;
  const total = subtotal - discount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[95vh] bg-gray-900/95 backdrop-blur-md text-white border border-white/20 rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="p-4 sm:p-6 pb-4 border-b border-white/10">
          <DialogTitle className="text-base sm:text-lg md:text-xl font-bold text-white">
            Book Tickets for {movie.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Book tickets for {movie.title} at {selectedTheater} for {selectedTime}
          </DialogDescription>
          
          <div className="flex flex-col gap-2 mt-2">
            <Button 
              variant="ghost" 
              className="text-white/70 hover:bg-white/10 hover:text-white p-2 rounded-xl w-fit text-xs sm:text-sm"
              onClick={onClose}
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Change Time
            </Button>
            <div className="flex flex-col gap-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
                <span className="text-white/80">{selectedTime} - {selectedFormat}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
                <span className="text-white/80">{selectedTheater}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(95vh-160px)]">
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {/* Booking Info */}
                <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl border border-white/20">
                  <h3 className="font-semibold mb-2 text-xs sm:text-sm md:text-base text-white">Booking for: John Doe</h3>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 rounded-xl text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Student Discount: 25% off applied!
                  </Badge>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-white">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl text-xs sm:text-sm h-8 sm:h-10"
                  />
                </div>

                {/* Ticket Quantity - Stacked on mobile */}
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <div className="flex-1">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-white">Adults</label>
                    <Input
                      type="number"
                      min="0"
                      value={adults}
                      onChange={(e) => handleAdultsChange(parseInt(e.target.value) || 0)}
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-xl text-xs sm:text-sm h-8 sm:h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-white">Children</label>
                    <Input
                      type="number"
                      min="0"
                      value={children}
                      onChange={(e) => handleChildrenChange(parseInt(e.target.value) || 0)}
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-xl text-xs sm:text-sm h-8 sm:h-10"
                    />
                  </div>
                </div>

                {/* Seat Selection */}
                <div>
                  <div className="flex flex-col gap-2 mb-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                      Select {totalPeople} Seat(s) ({selectedSeats.length}/{totalPeople} selected)
                    </h3>
                    
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.8}
                        className="p-1 h-6 w-6 sm:p-2 sm:h-8 sm:w-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <ZoomOut className="h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                      <span className="text-xs text-white/70 min-w-[30px] sm:min-w-[40px] text-center">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 1.6}
                        className="p-1 h-6 w-6 sm:p-2 sm:h-8 sm:w-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <ZoomIn className="h-2 w-2 sm:h-3 sm:w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Screen */}
                  <div className="text-center mb-2 sm:mb-4 md:mb-6">
                    <div className="text-xs md:text-sm text-white/50 mb-1 sm:mb-2">SCREEN</div>
                    <div className="h-1 sm:h-2 bg-gradient-to-r from-white/30 to-white/20 rounded-full mx-auto max-w-xs sm:max-w-lg"></div>
                  </div>

                  {/* Seat Map Container */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 sm:p-2 md:p-4 border border-white/20">
                    <div className="h-[250px] sm:h-[300px] md:h-[350px] overflow-auto">
                      <div 
                        className="inline-block min-w-full transition-transform duration-300 ease-out px-4"
                        style={{ 
                          transform: `scale(${zoomLevel})`,
                          transformOrigin: 'center top',
                        }}
                      >
                        <div className="space-y-1 md:space-y-2 py-4">
                          {seatRows.map((rowData) => (
                            <div key={rowData.row} className="flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2">
                              <span className="w-3 sm:w-4 md:w-6 text-xs md:text-sm text-white/50 flex-shrink-0">{rowData.row}</span>
                              
                              <div className="flex gap-0.5 sm:gap-1">
                                {Array.from({ length: rowData.seats }, (_, i) => {
                                  const seatNumber = i + 1;
                                  const seatId = `${rowData.row}-${seatNumber}`;
                                  const status = getSeatStatus(seatId);
                                  
                                  return (
                                    <button
                                      key={seatId}
                                      onClick={() => handleSeatClick(seatId)}
                                      disabled={status === "booked"}
                                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-xs md:text-sm rounded-lg transition-all touch-manipulation font-semibold ${
                                        status === "available"
                                          ? "bg-gray-600/80 hover:bg-gray-500/80 text-white/90 active:scale-95 border border-gray-400/50"
                                          : status === "selected"
                                          ? "bg-emerald-500 hover:bg-emerald-400 text-white active:scale-95 border-2 border-emerald-300 shadow-lg shadow-emerald-500/20"
                                          : "bg-red-500/80 text-white/80 cursor-not-allowed border border-red-400/50"
                                      }`}
                                    >
                                      <span className="text-xs">{seatNumber}</span>
                                    </button>
                                  );
                                })}
                              </div>
                              
                              <span className="w-3 sm:w-4 md:w-6 text-xs md:text-sm text-white/50 flex-shrink-0">{rowData.row}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-2 sm:gap-3 md:gap-6 text-xs md:text-sm mb-3 sm:mb-4 md:mb-6 mt-2 sm:mt-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gray-600/80 border border-gray-400/50 rounded-lg"></div>
                      <span className="text-white/80">Available</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-emerald-500 border-2 border-emerald-300 rounded-lg shadow-sm shadow-emerald-500/20"></div>
                      <span className="text-white/80">Selected</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-red-500/80 border border-red-400/50 rounded-lg"></div>
                      <span className="text-white/80">Booked</span>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl border border-white/20">
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm md:text-base text-white">
                      <span>Tickets ({totalTickets}x)</span>
                      <span>IDR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-300 text-xs sm:text-sm md:text-base">
                      <span>Student Discount (25%)</span>
                      <span>-IDR {discount.toLocaleString()}</span>
                    </div>
                    <hr className="border-white/20" />
                    <div className="flex justify-between font-semibold text-sm sm:text-base md:text-lg text-white">
                      <span>Total</span>
                      <span>IDR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 py-2 sm:py-3 rounded-xl text-xs sm:text-sm backdrop-blur-sm"
                  disabled={selectedSeats.length !== totalPeople}
                >
                  Submit Booking ({selectedSeats.length}/{totalPeople} seats selected)
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
