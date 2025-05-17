import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for featured properties
const featuredProperties = [
  {
    id: "1",
    title: "Modern Apartment in Downtown",
    location: "Manhattan, New York",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviews: 28
  },
  {
    id: "2",
    title: "Cozy Family Home",
    location: "Brooklyn, New York",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 42
  },
  {
    id: "3",
    title: "Luxury Villa with Pool",
    location: "Miami, Florida",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 35
  },
  {
    id: "4",
    title: "Urban Loft with Views",
    location: "Chicago, Illinois",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    reviews: 19
  }
];

// Mock data for popular locations
const popularLocations = [
  {
    id: "5",
    title: "Central Park Vicinity",
    location: "Manhattan, New York",
    imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 124
  },
  {
    id: "6",
    title: "Beachfront Community",
    location: "San Diego, California",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviews: 87
  },
  {
    id: "7",
    title: "Tech Hub Neighborhood",
    location: "San Francisco, California",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    reviews: 56
  },
  {
    id: "8",
    title: "Historic District",
    location: "Boston, Massachusetts",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviews: 63
  }
];

// Mock categories
const categories = [
  "Apartments", "Houses", "Condos", "Townhouses", "Studios", "Lofts"
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("featured");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Categories Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-realreview-gray-900">Browse by Category</h2>
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant="outline" 
                  className="rounded-full hover:bg-realreview-teal/10 hover:text-realreview-teal"
                  onClick={() => window.location.href = `/properties?category=${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Properties Section */}
        <section className="py-12 bg-realreview-gray-100">
          <div className="container mx-auto px-4">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-realreview-gray-900">Explore Properties</h2>
                <TabsList>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="popular">Popular Locations</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="featured" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <Link to="/properties">
                    <Button variant="outline" className="rounded-full px-8">
                      View All Properties
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularLocations.map((location) => (
                    <PropertyCard key={location.id} {...location} />
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <Link to="/properties">
                    <Button variant="outline" className="rounded-full px-8">
                      View All Locations
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-realreview-gray-900">How RealReview Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-realreview-teal/10 flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-realreview-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Search Locations</h3>
                <p className="text-realreview-gray-500">
                  Browse through our vast collection of properties, neighborhoods and facilities.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-realreview-amber/10 flex items-center justify-center mb-6">
                  <Star className="h-8 w-8 text-realreview-amber" />
                </div>
                <h3 className="text-xl font-semibold mb-3">View Honest Reviews</h3>
                <p className="text-realreview-gray-500">
                  Read authentic reviews and ratings from real users and locals.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-realreview-sky/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-realreview-sky">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Contribute Photos & Reviews</h3>
                <p className="text-realreview-gray-500">
                  Share your experience by uploading photos and writing reviews.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-realreview-teal to-realreview-sky text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Find Your Perfect Location?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join our community and get access to authentic reviews and photos from real users.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" className="bg-white text-realreview-teal hover:bg-white/90 hover:text-realreview-teal border-white">
                Sign Up
              </Button>
              <Button variant="outline" className="border-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
