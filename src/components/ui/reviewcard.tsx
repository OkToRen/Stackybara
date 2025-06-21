import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { Star } from "lucide-react";

// Define the shape of a review object
export type Review = {
  id: number;
  customerName: string;
  customerImage?: string;
  rating: number; // A number from 1 to 5
  comment: string;
  date: string;
};

// A helper component to render the stars
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="border-amber-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={review.customerImage} alt={review.customerName} />
            <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <div>
                <p className="font-semibold text-amber-900">{review.customerName}</p>
                <p className="text-xs text-amber-600">{review.date}</p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-amber-800">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}