
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock data for properties
const allProperties = [
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
  },
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

const Properties = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 1000000]);
  const [propertyType, setPropertyType] = React.useState("");
  const [filteredProperties, setFilteredProperties] = React.useState(allProperties);

  React.useEffect(() => {
    // Filter properties based on search term and other filters
    const filtered = allProperties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // In a real app, properties would have price and type properties to filter on
      return matchesSearch;
    });
    
    setFilteredProperties(filtered);
  }, [searchTerm, priceRange, propertyType]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-realreview-teal/10 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-realreview-gray-900 mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-realreview-gray-600 text-center max-w-2xl mx-auto mb-8">
              Browse through our extensive collection of properties across the country
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by location, property name..."
                  className="pl-10 pr-4 py-3 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-realreview-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Properties Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Property Type</h4>
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Property Types</SelectLabel>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Price Range</h4>
                      <div className="space-y-6">
                        <Slider 
                          value={priceRange} 
                          min={0} 
                          max={1000000} 
                          step={10000} 
                          onValueChange={setPriceRange}
                          className="mt-6"
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-realreview-gray-600">
                            ${priceRange[0].toLocaleString()}
                          </p>
                          <p className="text-sm text-realreview-gray-600">
                            ${priceRange[1].toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Features</h4>
                      <div className="space-y-2">
                        {["Pool", "Gym", "Parking", "Garden", "Balcony"].map(feature => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox id={feature.toLowerCase()} />
                            <Label htmlFor={feature.toLowerCase()}>{feature}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-realreview-teal hover:bg-realreview-teal/90"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Property Grid */}
              <div className="col-span-1 md:col-span-3">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {filteredProperties.length} Properties Found
                  </h2>
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard key={property.id} {...property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-realreview-gray-500">
                      No properties found matching your criteria. Try adjusting your filters.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setPriceRange([0, 1000000]);
                        setPropertyType("");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}

                {filteredProperties.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Button variant="outline" className="mx-1">Previous</Button>
                    {[1, 2, 3].map(page => (
                      <Button 
                        key={page} 
                        variant={page === 1 ? "default" : "outline"} 
                        className="mx-1"
                      >
                        {page}
                      </Button>
                    ))}
                    <Button variant="outline" className="mx-1">Next</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
