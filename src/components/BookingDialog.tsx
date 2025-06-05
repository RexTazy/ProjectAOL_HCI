import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Star, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
      <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto bg-white text-gray-900 border-0 rounded-2xl p-3 sm:p-4 md:p-6">
        <DialogHeader className="space-y-2 sm:space-y-4">
          <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold">
            Book Tickets for {movie.title}
          </DialogTitle>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-xl w-fit text-xs sm:text-sm"
              onClick={onClose}
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Change Time
            </Button>
            <div className="flex flex-col gap-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{selectedTime} - {selectedFormat}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{selectedTheater}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Booking Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-2 sm:p-3 md:p-4 rounded-xl border border-emerald-100">
            <h3 className="font-semibold mb-2 text-xs sm:text-sm md:text-base">Booking for: John Doe</h3>
            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl text-xs">
              <Star className="h-3 w-3 mr-1" />
              Student Discount: 25% off applied!
            </Badge>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl text-xs sm:text-sm h-8 sm:h-10"
            />
          </div>

          {/* Ticket Quantity - Stacked on mobile */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Adults</label>
              <Input
                type="number"
                min="0"
                value={adults}
                onChange={(e) => handleAdultsChange(parseInt(e.target.value) || 0)}
                className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl text-xs sm:text-sm h-8 sm:h-10"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Children</label>
              <Input
                type="number"
                min="0"
                value={children}
                onChange={(e) => handleChildrenChange(parseInt(e.target.value) || 0)}
                className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl text-xs sm:text-sm h-8 sm:h-10"
              />
            </div>
          </div>

          {/* Seat Selection */}
          <div>
            <div className="flex flex-col gap-2 mb-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                Select {totalPeople} Seat(s) ({selectedSeats.length}/{totalPeople} selected)
              </h3>
              
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.8}
                  className="p-1 h-6 w-6 sm:p-2 sm:h-8 sm:w-8"
                >
                  <ZoomOut className="h-2 w-2 sm:h-3 sm:w-3" />
                </Button>
                <span className="text-xs text-gray-500 min-w-[30px] sm:min-w-[40px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 1.6}
                  className="p-1 h-6 w-6 sm:p-2 sm:h-8 sm:w-8"
                >
                  <ZoomIn className="h-2 w-2 sm:h-3 sm:w-3" />
                </Button>
              </div>
            </div>
            
            {/* Screen */}
            <div className="text-center mb-2 sm:mb-4 md:mb-6">
              <div className="text-xs md:text-sm text-gray-400 mb-1 sm:mb-2">SCREEN</div>
              <div className="h-1 sm:h-2 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full mx-auto max-w-xs sm:max-w-lg"></div>
            </div>

            {/* Seat Map Container - Enhanced for better panning */}
            <div className="bg-gray-50 rounded-xl p-1 sm:p-2 md:p-4 border">
              <div 
                className="relative max-h-[200px] sm:max-h-[250px] md:max-h-[350px] overflow-auto"
                style={{
                  // Enable smooth scrolling and better touch handling
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth'
                }}
              >
                <div 
                  className="inline-block min-w-full transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center top',
                    // Ensure the scaled content has proper dimensions for scrolling
                    minWidth: `${100 * zoomLevel}%`,
                    minHeight: `${100 * zoomLevel}%`
                  }}
                >
                  <div className="space-y-1 md:space-y-2 p-2 sm:p-4">
                    {seatRows.map((rowData) => (
                      <div key={rowData.row} className="flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2">
                        <span className="w-3 sm:w-4 md:w-6 text-xs md:text-sm text-gray-400 flex-shrink-0">{rowData.row}</span>
                        
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
                                className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-xs md:text-sm rounded-lg transition-all touch-manipulation ${
                                  status === "available"
                                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700 active:scale-95"
                                    : status === "selected"
                                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white active:scale-95"
                                    : "bg-gray-900 text-white cursor-not-allowed"
                                }`}
                              >
                                <span className="text-xs">{seatNumber}</span>
                              </button>
                            );
                          })}
                        </div>
                        
                        <span className="w-3 sm:w-4 md:w-6 text-xs md:text-sm text-gray-400 flex-shrink-0">{rowData.row}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-6 text-xs md:text-sm mb-3 sm:mb-4 md:mb-6 mt-2 sm:mt-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gray-200 rounded-lg"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gray-900 rounded-lg"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-2 sm:p-3 md:p-4 rounded-xl border border-gray-200">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm md:text-base">
                <span>Tickets ({totalTickets}x)</span>
                <span>IDR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600 text-xs sm:text-sm md:text-base">
                <span>Student Discount (25%)</span>
                <span>-IDR {discount.toLocaleString()}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between font-semibold text-sm sm:text-base md:text-lg">
                <span>Total</span>
                <span>IDR {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 sm:py-3 rounded-xl text-xs sm:text-sm"
            disabled={selectedSeats.length !== totalPeople}
          >
            Submit Booking ({selectedSeats.length}/{totalPeople} seats selected)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
