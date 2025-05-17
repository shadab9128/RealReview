
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, User, Check } from "lucide-react";

// Mock data for a single property
const propertyData = {
  id: "1",
  title: "Modern Apartment in Downtown",
  location: "Manhattan, New York",
  description: "This modern apartment is located in the heart of Manhattan, offering easy access to restaurants, shops, and public transportation. The building features a gym, rooftop terrace, and 24/7 concierge service.",
  rating: 4.5,
  reviews: 28,
  images: [
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80"
  ],
  features: [
    "Central air conditioning",
    "In-unit laundry",
    "Hardwood floors",
    "Stainless steel appliances",
    "Walk-in closets",
    "Floor-to-ceiling windows"
  ],
  userReviews: [
    {
      id: "r1",
      user: "John Doe",
      date: "2023-08-15",
      rating: 5,
      content: "Amazing property! The location is perfect and the amenities are top-notch. I've been living here for 6 months and couldn't be happier with my choice."
    },
    {
      id: "r2",
      user: "Jane Smith",
      date: "2023-07-22",
      rating: 4,
      content: "Great apartment with beautiful views. The building staff is very friendly and responsive. The only downside is that the gym is a bit small."
    }
  ]
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("photos");
  
  // In a real app, we would fetch the property data based on the id
  const property = propertyData;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              
              <div className="flex items-center gap-2 text-realreview-gray-500 mb-6">
                <MapPin className="h-5 w-5 text-realreview-teal" />
                <span>{property.location}</span>
                
                <div className="mx-2 h-1 w-1 rounded-full bg-realreview-gray-300"></div>
                
                <div className="flex items-center">
                  <StarRating initialRating={property.rating} readOnly className="mr-2" />
                  <span>{property.rating} ({property.reviews} reviews)</span>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="photos" className="mt-0">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4">
                    <img
                      src={property.images[activeImageIndex]}
                      alt={`${property.title} - Image ${activeImageIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    {property.images.map((image, index) => (
                      <div 
                        key={index}
                        className={`aspect-[4/3] overflow-hidden rounded-lg cursor-pointer border-2 ${
                          index === activeImageIndex 
                            ? "border-realreview-teal" 
                            : "border-transparent"
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`${property.title} - Thumbnail ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="description" className="mt-0">
                  <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold mb-4">About this property</h2>
                    <p className="text-realreview-gray-700 mb-6">{property.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 mr-2 text-realreview-teal" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-0">
                  <div className="space-y-6">
                    {property.userReviews.map((review) => (
                      <Card key={review.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-realreview-gray-200 flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-realreview-gray-500" />
                              </div>
                              <div>
                                <h4 className="font-medium">{review.user}</h4>
                                <div className="flex items-center text-sm text-realreview-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <StarRating initialRating={review.rating} readOnly />
                          </div>
                          <p className="text-realreview-gray-700">{review.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="pt-6 flex justify-center">
                      <Button className="bg-realreview-teal hover:bg-realreview-teal/90">
                        Write a Review
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <p className="mb-6 text-realreview-gray-500">
                    Want to know more about this property? Get in touch with the owner or management.
                  </p>
                  
                  <Button className="w-full bg-realreview-teal hover:bg-realreview-teal/90 mb-3">
                    Request More Info
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Share Property
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Similar Properties</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-20 h-20 bg-realreview-gray-200 rounded-md flex-shrink-0">
                          <img 
                            src={`https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=200&q=80&random=${i}`}
                            alt="Property thumbnail"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Beautiful Studio in Manhattan</h4>
                          <p className="text-realreview-gray-500 text-sm">Manhattan, New York</p>
                          <div className="flex items-center mt-1">
                            <StarRating initialRating={4} readOnly className="scale-75 -ml-1" />
                            <span className="text-xs text-realreview-gray-500">4.0 (15 reviews)</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
