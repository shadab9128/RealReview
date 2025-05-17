
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Define form schema with zod
const formSchema = z.object({
  propertyTitle: z.string().min(5, "Title must be at least 5 characters"),
  propertyType: z.string().min(1, "Please select a property type"),
  location: z.string().min(5, "Location is required"),
  description: z.string().optional(),
  rating: z.number().min(1, "Please provide a rating").max(5),
});

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyTitle: "",
      propertyType: "",
      location: "",
      description: "",
      rating: 0,
    },
  });

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: File[] = [];
    const newUrls: string[] = [];

    // Process each file
    Array.from(files).forEach(file => {
      if (file.type.startsWith("image/")) {
        newFiles.push(file);
        newUrls.push(URL.createObjectURL(file));
      }
    });

    setSelectedFiles(prev => [...prev, ...newFiles]);
    setPreviewUrls(prev => [...prev, ...newUrls]);
  };

  // Remove a selected file
  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    const updatedUrls = [...previewUrls];
    
    URL.revokeObjectURL(updatedUrls[index]);
    updatedFiles.splice(index, 1);
    updatedUrls.splice(index, 1);
    
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedUrls);
  };

  // Handle rating change
  const handleRatingChange = (value: number) => {
    setRating(value);
    form.setValue("rating", value);
  };

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Validate that at least one image is selected
    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    // Validate that a rating is provided
    if (values.rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    // Here we would normally send the data to the server
    console.log("Form values:", values);
    console.log("Selected files:", selectedFiles);
    console.log("Rating:", values.rating);
    
    // Show success message
    toast.success("Your property has been submitted for review!");
    
    // Reset form
    form.reset();
    setSelectedFiles([]);
    setPreviewUrls([]);
    setRating(0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-realreview-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Upload Property Photos</h1>
            <p className="text-center text-realreview-gray-500 mb-8">
              Share your photos and help others discover great locations
            </p>
            
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>
                  Please provide details about the property you're uploading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="propertyTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Modern Apartment in Downtown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="condo">Condo</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="studio">Studio</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Manhattan, New York" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the neighborhood, city, or address
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about this property..." 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Rating Section */}
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Rating</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <StarRating 
                                initialRating={rating}
                                onChange={handleRatingChange}
                              />
                              <span className="ml-2 text-sm text-realreview-gray-500">
                                {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Photo Upload Section */}
                    <div className="space-y-3">
                      <FormLabel>Upload Photos</FormLabel>
                      <div className="flex items-center justify-center w-full">
                        <label 
                          htmlFor="dropzone-file" 
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-realreview-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-realreview-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-realreview-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-realreview-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-realreview-gray-500">
                              PNG, JPG or WEBP (MAX. 5MB per image)
                            </p>
                          </div>
                          <Input 
                            id="dropzone-file" 
                            type="file"
                            accept="image/*" 
                            multiple 
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      
                      {/* Preview Images */}
                      {previewUrls.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                          {previewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square overflow-hidden rounded-lg">
                                <img 
                                  src={url} 
                                  alt={`Uploaded preview ${index}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <FormDescription>
                        Upload authentic photos of the property. Images will be reviewed before being published.
                      </FormDescription>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-realreview-teal hover:bg-realreview-teal/90"
                      >
                        Submit for Review
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
