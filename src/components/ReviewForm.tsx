
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { imageController } from "@/controllers/imageController";
import { errorHandler } from "@/utils/errorHandler";
import { ImageReview } from "@/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ReviewFormProps {
  imageUrl: string;
}

const reviewSchema = z.object({
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  location: z.string().min(2, { message: "Location must be at least 2 characters" }),
  review: z.string().min(10, { message: "Review must be at least 10 characters" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const ReviewForm: React.FC<ReviewFormProps> = ({ imageUrl }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      description: "",
      location: "",
      review: "",
    },
  });
  
  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    
    try {
      const reviewData: ImageReview = {
        imageUrl,
        description: data.description,
        location: data.location,
        review: data.review
      };
      
      const result = await imageController.submitReview(reviewData);
      
      if (result) {
        toast.success('Review submitted successfully');
        navigate('/gallery');
      }
    } catch (error) {
      errorHandler.handleError(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your image..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
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
                  <Input
                    placeholder="Where was this photo taken?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your review..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ReviewForm;
