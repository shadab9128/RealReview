
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReviewForm from "@/components/ReviewForm";
import { errorHandler } from "@/utils/errorHandler";
import { ArrowLeft } from "lucide-react";

const ReviewPage = () => {
  const [searchParams] = useSearchParams();
  const imageUrl = searchParams.get('imageUrl');
  const navigate = useNavigate();
  
  // If no image URL is provided, redirect back to home
  useEffect(() => {
    if (!imageUrl) {
      errorHandler.handleError('No image found. Please upload an image first.');
      navigate('/');
    }
  }, [imageUrl, navigate]);
  
  if (!imageUrl) {
    return null; // Will redirect in effect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 bg-white shadow">
        <div className="container mx-auto px-4 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Review Your Image</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={imageUrl} 
              alt="Uploaded" 
              className="w-full h-auto max-h-[500px] object-contain bg-gray-100"
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Add Your Review</h2>
            <ReviewForm imageUrl={imageUrl} />
          </div>
        </div>
      </main>
      
      <footer className="py-4 bg-gray-100">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RealReview. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ReviewPage;
