
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 bg-white shadow">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 flex items-center">
            <Image className="mr-2" /> RealReview
          </h1>
          <Link to="/gallery">
            <Button variant="outline">View Gallery</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Share Your Images</h2>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              Upload an image, add your description and review, then share it with the world.
            </p>
          </div>
          
          <div className="py-8">
            <ImageUpload />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-xl mb-4">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                  <span className="font-bold text-blue-700">1</span>
                </div>
                <h4 className="font-medium">Upload your image</h4>
                <p className="text-sm text-gray-500">Select any image from your device</p>
              </div>
              <div className="p-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                  <span className="font-bold text-blue-700">2</span>
                </div>
                <h4 className="font-medium">Add your review</h4>
                <p className="text-sm text-gray-500">Describe the image and its location</p>
              </div>
              <div className="p-4">
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                  <span className="font-bold text-blue-700">3</span>
                </div>
                <h4 className="font-medium">View in gallery</h4>
                <p className="text-sm text-gray-500">See your image with others in the gallery</p>
              </div>
            </div>
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

export default Index;
