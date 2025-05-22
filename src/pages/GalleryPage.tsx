
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ImageGallery from "@/components/ImageGallery";
import { ArrowLeft } from "lucide-react";

import { useEffect, useState } from "react";
import { apiService } from "@/services/apiService";
import { ImageReview } from "@/types";


const GalleryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 bg-white shadow">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Image Gallery</h1>
          </div>
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Upload New Image
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Review Gallery</h2>
          <p className="text-gray-600">Browse all submitted image reviews</p>
        </div>
        
        <ImageGallery />
      </main>
      
      <footer className="py-4 bg-gray-100">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RealReview. All rights reserved.
        </div>
      </footer>
    </div>
  );


  // const [reviews, setReviews] = useState<ImageReview[]>([]);

  // useEffect(() => {
  //   apiService.getReviews().then(res => {
  //     if (res.success && res.data) setReviews(res.data);
  //   });
  // }, []);

  // return (
  //   <pre>{JSON.stringify(reviews, null, 2)}</pre>
  // );
};

export default GalleryPage;
