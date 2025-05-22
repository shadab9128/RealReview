
import { Database } from "@/integrations/supabase/types";

// Type for the image reviews from Supabase
export type SupabaseImageReview = Database['public']['Tables']['image_reviews']['Row'];

// Type for inserting a new image review into Supabase
export type InsertImageReview = Database['public']['Tables']['image_reviews']['Insert'];
