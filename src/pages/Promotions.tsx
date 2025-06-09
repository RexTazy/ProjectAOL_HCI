
import { Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InteractiveBackground from "@/components/InteractiveBackground";
import Footer from "@/components/Footer";

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: "Student Discount 50%",
      category: "Ticket Discounts",
      description: "Get 50% off on all movie tickets with valid student ID. Valid for all showtimes Monday to Thursday.",
      validUntil: "June 30, 2025",
      image: "bg-gradient-to-br from-blue-500 to-purple-600",
      isAlmostEnding: false,
      isNew: true
    },
    {
      id: 2,
      title: "Family Combo Deal",
      category: "Food Combos",
      description: "4 movie tickets + 2 large popcorns + 4 drinks for only $45. Perfect for family movie nights!",
      validUntil: "June 15, 2025",
      image: "bg-gradient-to-br from-orange-500 to-red-600",
      isAlmostEnding: true,
      isNew: false
    },
    {
      id: 3,
      title: "IMAX Experience Package",
      category: "Premium",
      description: "Enjoy IMAX movies with premium seating, gourmet snacks, and exclusive collectible items.",
      validUntil: "July 20, 2025",
      image: "bg-gradient-to-br from-purple-500 to-pink-600",
      isAlmostEnding: false,
      isNew: false
    },
    {
      id: 4,
      title: "Flash Sale Weekend",
      category: "Flash Sale",
      description: "All movie tickets only $5 this weekend! Limited time offer for selected showtimes.",
      validUntil: "June 8, 2025",
      image: "bg-gradient-to-br from-yellow-500 to-orange-600",
      isAlmostEnding: true,
      isNew: true
    },
    {
      id: 5,
      title: "Birthday Special",
      category: "Special Offers",
      description: "Celebrate your birthday with us! Free movie ticket and birthday cake on your special day.",
      validUntil: "December 31, 2025",
      image: "bg-gradient-to-br from-pink-500 to-rose-600",
      isAlmostEnding: false,
      isNew: false
    },
    {
      id: 6,
      title: "Loyalty Program",
      category: "Membership",
      description: "Join our loyalty program and earn points with every purchase. Redeem points for free tickets and snacks!",
      validUntil: "Ongoing",
      image: "bg-gradient-to-br from-green-500 to-teal-600",
      isAlmostEnding: false,
      isNew: false
    }
  ];

  const categories = ["All", "Ticket Discounts", "Food Combos", "Premium", "Flash Sale", "Special Offers", "Membership"];

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20">
              <h1 className="text-4xl font-bold text-white mb-4">Promotions</h1>
              <p className="text-white/80 text-lg">Discover amazing deals and exclusive offers</p>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white/30 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Promotions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {promotions.map((promotion, index) => (
                <Card 
                  key={promotion.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer relative bg-white/95 backdrop-blur-sm border-white/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {promotion.isNew && (
                      <Badge className="bg-green-500 hover:bg-green-600 animate-pulse">
                        New
                      </Badge>
                    )}
                    {promotion.isAlmostEnding && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 animate-pulse">
                        Almost Ending
                      </Badge>
                    )}
                  </div>

                  <div className={`h-48 ${promotion.image} flex items-center justify-center relative`}>
                    <Gift size={48} className="text-white opacity-50" />
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="mb-2">
                        {promotion.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Valid until {promotion.validUntil}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{promotion.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{promotion.description}</p>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Redeem Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Never Miss a Deal!</h3>
                <p className="text-lg mb-6 opacity-90">
                  Subscribe to our newsletter and be the first to know about exclusive promotions and flash sales.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-white"
                  />
                  <Button variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Promotions;
