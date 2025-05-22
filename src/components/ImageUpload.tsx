
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { imageController } from "@/controllers/imageController";
import { errorHandler } from "@/utils/errorHandler";
import { toast } from "sonner";

const ImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      errorHandler.handleError('Please select an image file');
      return;
    }
    
    setIsUploading(true);
    try {
      const imageUrl = await imageController.uploadImage(file);
      
      if (imageUrl) {
        toast.success('Image uploaded successfully');
        // Navigate to review page with the image URL
        navigate(`/review?imageUrl=${encodeURIComponent(imageUrl)}`);
      }
    } catch (error) {
      errorHandler.handleError(error as Error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleUploadClick = () => {
    document.getElementById('image-upload')?.click();
  };
  
  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button
        onClick={handleUploadClick}
        disabled={isUploading}
        className="text-lg px-8 py-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        <Upload className="w-5 h-5" />
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </Button>
      <p className="text-gray-500 mt-2 text-sm">
        Click to select an image to upload
      </p>
    </div>
  );
};

export default ImageUpload;
