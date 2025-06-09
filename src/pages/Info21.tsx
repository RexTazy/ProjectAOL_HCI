
import { Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InteractiveBackground from "@/components/InteractiveBackground";
import Footer from "@/components/Footer";

const Info21 = () => {
  const articles = [
    {
      id: 1,
      title: "New IMAX Theater Opens in Central Jakarta",
      category: "News",
      excerpt: "Experience movies like never before with our latest IMAX theater featuring the most advanced projection and sound technology.",
      date: "June 3, 2025",
      readTime: "3 min read",
      image: "bg-gradient-to-br from-blue-500 to-purple-600",
      isLatest: true
    },
    {
      id: 2,
      title: "Avatar 3: Everything We Know So Far",
      category: "Movie Reviews",
      excerpt: "James Cameron's highly anticipated third installment in the Avatar franchise promises even more spectacular visuals and storytelling.",
      date: "June 2, 2025",
      readTime: "5 min read",
      image: "bg-gradient-to-br from-cyan-500 to-blue-600",
      isLatest: true
    },
    {
      id: 3,
      title: "How to Get the Best Movie Experience",
      category: "Tips & Tricks",
      excerpt: "From choosing the perfect seat to selecting the right format, here's your guide to the ultimate cinema experience.",
      date: "May 30, 2025",
      readTime: "4 min read",
      image: "bg-gradient-to-br from-green-500 to-teal-600",
      isLatest: false
    },
    {
      id: 4,
      title: "Summer Blockbuster Preview 2025",
      category: "News",
      excerpt: "Get ready for an exciting summer with these must-watch blockbusters coming to theaters this season.",
      date: "May 28, 2025",
      readTime: "6 min read",
      image: "bg-gradient-to-br from-orange-500 to-red-600",
      isLatest: false
    },
    {
      id: 5,
      title: "Behind the Scenes: Theater Technology",
      category: "Features",
      excerpt: "Discover the cutting-edge technology that makes your movie experience unforgettable, from projectors to sound systems.",
      date: "May 25, 2025",
      readTime: "7 min read",
      image: "bg-gradient-to-br from-purple-500 to-pink-600",
      isLatest: false
    },
    {
      id: 6,
      title: "Interview: Directors Discuss Cinema Evolution",
      category: "Features",
      excerpt: "Leading filmmakers share their thoughts on how cinema technology has evolved and what the future holds.",
      date: "May 22, 2025",
      readTime: "8 min read",
      image: "bg-gradient-to-br from-indigo-500 to-purple-600",
      isLatest: false
    }
  ];

  const categories = ["All", "News", "Movie Reviews", "Features", "Tips & Tricks"];
  const latestArticles = articles.filter(article => article.isLatest);
  const olderArticles = articles.filter(article => !article.isLatest);

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20">
              <h1 className="text-4xl font-bold text-white mb-4">Info 21</h1>
              <p className="text-white/80 text-lg">Latest news, reviews, and updates from the world of cinema</p>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search news & reviews..."
                  className="w-full border-2 border-white/20 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60"
                />
              </div>
              <div className="md:w-48">
                <Select defaultValue="all">
                  <SelectTrigger className="border-2 border-white/20 bg-white/20 backdrop-blur-sm text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.toLowerCase().replace(/\s+/g, '-')} value={category.toLowerCase().replace(/\s+/g, '-')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Latest Articles */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestArticles.map((article, index) => (
                  <Card 
                    key={article.id} 
                    className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer bg-white/95 backdrop-blur-sm border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`h-48 ${article.image} flex items-center justify-center relative`}>
                      <Megaphone size={48} className="text-white opacity-50" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500 hover:bg-red-600">
                          Latest
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{article.date}</span>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Older Articles */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">More Articles</h2>
              <div className="space-y-6">
                {olderArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white/95 backdrop-blur-sm border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                      <div className={`${article.image} h-48 md:h-32 flex items-center justify-center`}>
                        <Megaphone size={32} className="text-white opacity-50" />
                      </div>
                      <div className="md:col-span-3 p-6">
                        <div className="flex flex-wrap justify-between items-start mb-3">
                          <div className="flex gap-2 mb-2 md:mb-0">
                            <Badge variant="outline">{article.category}</Badge>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>{article.date}</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <Megaphone size={48} className="mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
                <p className="text-lg mb-6 opacity-90">
                  Get the latest movie news, reviews, and exclusive content delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white"
                  />
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
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

export default Info21;
