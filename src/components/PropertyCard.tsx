
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StarRating from "@/components/StarRating";
import { MapPin } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviews: number;
}

const PropertyCard = ({ id, title, location, imageUrl, rating, reviews }: PropertyCardProps) => {
  return (
    <Link to={`/property/${id}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-[4/3] w-full relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{title}</h3>
          <div className="flex items-center mt-1 text-realreview-gray-500">
            <MapPin className="h-4 w-4 mr-1 text-realreview-teal" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center">
            <StarRating initialRating={rating} readOnly className="mr-2" />
            <span className="text-sm text-realreview-gray-500">{reviews} reviews</span>
          </div>
          <span className="text-realreview-teal font-medium">View Details</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
