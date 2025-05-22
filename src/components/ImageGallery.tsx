
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageReview } from "@/types";
import { imageController } from "@/controllers/imageController";
import { errorHandler } from "@/utils/errorHandler";

const ImageGallery = () => {
  const [reviews, setReviews] = useState<ImageReview[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await imageController.getReviews();
        setReviews(fetchedReviews);
      } catch (error) {
        errorHandler.handleError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden flex flex-col">
            <div className="h-64 bg-gray-200">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-12 w-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews found. Upload an image to add a review!</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden flex flex-col">
          <div className="h-64 overflow-hidden">
            <img 
              src={review.imageUrl} 
              alt={review.description} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold truncate">{review.description}</h3>
            <p className="text-sm text-gray-500 mb-2">📍 {review.location}</p>
            <p className="text-sm line-clamp-3 flex-1">{review.review}</p>
            <p className="text-xs text-gray-400 mt-2">
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Just now'}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ImageGallery;
