import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CustomerCardProps {
  name: string;
  text: string;
  image: string;
  venue: string;
  rating: number;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  text,
  image,
  venue,
  rating,
}) => {
  return (
    <Card className="border-mainColorLite shadow-xl">
      <CardContent className="p-8"> {/* padding lebih besar */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Gambar Bulat */}
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Konten */}
          <div className="flex-1 text-center md:text-left">
            {/* Rating */}
            <div className="flex gap-1 justify-center md:justify-start mb-3"> {/* sedikit lebih besar */}
              {[...Array(rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-500 text-yellow-500"
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-700 mb-4">"{text}"</p> {/* mb-4 supaya lebih panjang ruang teks */}

            {/* Nama */}
            <p className="text-mainColor font-medium">{name}</p>

            {/* Venue */}
            <p className="text-sm text-gray-500">{venue}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
