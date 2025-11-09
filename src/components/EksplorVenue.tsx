import { Search, MapPin, DollarSign, Users, Star, Sparkles, SlidersHorizontal, Heart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useState } from 'react';
import { VirtualTour360 } from './VirtualTour360';
import { AIMatchmaker } from './AIMatchmaker';
import { PaymentIntegration } from './PaymentIntegration';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const allVenues = [
  {
    id: 1,
    name: 'Grand Ballroom Elegance',
    location: 'Jakarta Pusat',
    price: 25000000,
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '200-500 tamu',
    theme: 'Luxury',
    featured: true,
  },
  {
    id: 2,
    name: 'Royal Garden Venue',
    location: 'Tangerang',
    price: 18000000,
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1759490821541-f78bb13a752d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwd2VkZGluZ3xlbnwxfHx8fDE3NTk5MzYyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '100-300 tamu',
    theme: 'Garden',
    featured: false,
  },
  {
    id: 3,
    name: 'Luxury Hotel Ballroom',
    location: 'Jakarta Selatan',
    price: 35000000,
    rating: 5.0,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1733761002935-244f889465b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJhbGxyb29tfGVufDF8fHx8MTc1OTkzMzkwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '300-800 tamu',
    theme: 'Luxury',
    featured: true,
  },
  {
    id: 4,
    name: 'Romantic Restaurant Hall',
    location: 'BSD City',
    price: 12000000,
    rating: 4.7,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1680079033123-e5b22be5c523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk5NzU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '50-150 tamu',
    theme: 'Intimate',
    featured: false,
  },
  {
    id: 5,
    name: 'Modern Reception Hall',
    location: 'Jakarta Barat',
    price: 20000000,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1759477274116-e3cb02d2b9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwaGFsbHxlbnwxfHx8fDE3NTk5NzU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '150-400 tamu',
    theme: 'Modern',
    featured: false,
  },
  {
    id: 6,
    name: 'Elegant Garden Paradise',
    location: 'Bekasi',
    price: 15000000,
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1759490821541-f78bb13a752d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwd2VkZGluZ3xlbnwxfHx8fDE3NTk5MzYyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '100-250 tamu',
    theme: 'Garden',
    featured: true,
  },
];

interface EksplorVenueProps {
  onVenueClick?: (venueId: number) => void;
}

export function EksplorVenue({ onVenueClick }: EksplorVenueProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([1000, 10000000]); // initial range
  const [showFilters, setShowFilters] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [showAIMatchmaker, setShowAIMatchmaker] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
 
  
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>, star: number) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left; // posisi klik dalam tombol
    const newRating = x < width / 2 ? star - 0.5 : star;
    setRating(newRating);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>, star: number) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const newHover = x < width / 2 ? star - 0.5 : star;
    setHover(newHover);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mt-16"></div>
        <div className="mb-8">
          <h1 className="mb-2">Eksplor Venue</h1>
          <p className="text-gray-600">Temukan venue impian dengan filter dan AI Matchmaker</p>
        </div>

        {/* Search & AI Matchmaker */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Cari venue berdasarkan nama atau lokasi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#F4E4C1]"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          <Button 
            onClick={() => setShowAIMatchmaker(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            AI Matchmaker
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-8 border-[#F4E4C1]">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block mb-2 text-sm">Lokasi</label>
                  <Select>
                    <SelectTrigger className="border-[#F4E4C1]">
                      <SelectValue placeholder="Pilih Lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                      <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
                      <SelectItem value="jakarta-barat">Jakarta Barat</SelectItem>
                      <SelectItem value="tangerang">Tangerang</SelectItem>
                      <SelectItem value="bekasi">Bekasi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2 text-sm">Kapasitas</label>
                  <Select>
                    <SelectTrigger className="border-[#F4E4C1]">
                      <SelectValue placeholder="Jumlah Tamu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50-100">50-100 tamu</SelectItem>
                      <SelectItem value="100-200">100-200 tamu</SelectItem>
                      <SelectItem value="200-500">200-500 tamu</SelectItem>
                      <SelectItem value="500+">500+ tamu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-2 text-sm">Tema</label>
                  <Select>
                    <SelectTrigger className="border-[#F4E4C1]">
                      <SelectValue placeholder="Pilih Tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="garden">Garden</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="intimate">Intimate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

               <div>
      <label className="block mb-2 text-sm">Rating</label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const value = hover ?? rating; // kalau hover null, gunakan rating
          let icon;
          if (value >= star) icon = <FaStar size={24} className="text-yellow-400" />;
          else if (value + 0.5 >= star) icon = <FaStarHalfAlt size={24} className="text-yellow-400" />;
          else icon = <FaRegStar size={24} className="text-gray-300" />;

          return (
            <button
              key={star}
              type="button"
              className="focus:outline-none"
              onMouseMove={(e) => handleMouseMove(e, star)}
              onClick={(e) => handleClick(e, star)}
              onMouseLeave={() => setHover(null)} // reset hover
            >
              {icon}
            </button>
          );
        })}
      </div>
      <p className="mt-1 text-sm text-gray-500">Rating: {rating} Bintang</p>
    </div>
                
                </div>
              <div className="mt-6">
                <label className="block mb-3 text-sm">
                  Rentang Harga: 
                  <span className="text-[#D4AF37]">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </span>
                </label>
                <SliderPrimitive.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={50000000}
                  step={1000000}
                >
                  <SliderPrimitive.Track className="bg-gray-300 relative flex-1 h-1 rounded-full">
                    <SliderPrimitive.Range className="absolute bg-[#D4AF37] rounded-full h-full" />
                  </SliderPrimitive.Track>
                  <SliderPrimitive.Thumb className="block w-5 h-5 bg-[#D4AF37] rounded-full shadow-md" />
                  <SliderPrimitive.Thumb className="block w-5 h-5 bg-[#D4AF37] rounded-full shadow-md" />
                </SliderPrimitive.Root>

              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{allVenues.length} venue ditemukan</p>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-[200px] border-[#F4E4C1]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Rekomendasi</SelectItem>
              <SelectItem value="price-low">Harga Terendah</SelectItem>
              <SelectItem value="price-high">Harga Tertinggi</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-[#D4AF37]">Rekomendasi AI untuk Anda</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {aiRecommendations.map((venue) => (
                <Card 
                  key={venue.id} 
                  onClick={() => onVenueClick?.(venue.id)}
                  className="overflow-hidden border-2 border-[#D4AF37] shadow-lg cursor-pointer"
                >
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {venue.matchScore}% Match
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="mb-2">{venue.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      {venue.location}
                    </div>
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Kenapa cocok:</p>
                      <div className="flex flex-wrap gap-1">
                        {venue.reasons.slice(0, 3).map((reason: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="border-[#FFB6C1] text-[#FFB6C1] text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <p className="text-[#D4AF37]">Rp {(venue.price / 1000000).toFixed(0)} Jt</p>
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onVenueClick?.(venue.id);
                        }}
                        className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white"
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Venue Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allVenues.map((venue) => (
            <Card 
              key={venue.id} 
              onClick={() => onVenueClick?.(venue.id)}
              className="overflow-hidden hover:shadow-xl transition-all border-[#F4E4C1] group cursor-pointer"
            >
              <div className="relative h-56">
                <ImageWithFallback
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {venue.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVenue(venue);
                      setShowVirtualTour(true);
                    }}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#F4E4C1] transition-colors"
                    title="Virtual Tour 360°"
                  >
                    <Eye className="w-5 h-5 text-[#D4AF37]" />
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#FFE4E9] transition-colors"
                  >
                    <Heart className="w-5 h-5 text-[#FFB6C1]" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-sm">{venue.rating}</span>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="mb-2">{venue.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  {venue.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  {venue.capacity}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                    {venue.theme}
                  </Badge>
                  <span className="text-xs text-gray-500">({venue.reviews} reviews)</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Mulai dari</p>
                    <p className="text-[#D4AF37] font-bold text-xl">{formatPrice(venue.price)}</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onVenueClick?.(venue.id);
                    }}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Modals */}
      {showVirtualTour && selectedVenue && (
        <VirtualTour360
          venueName={selectedVenue.name}
          tourImages={[
            selectedVenue.image,
            'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?w=1200',
            'https://images.unsplash.com/photo-1759490821541-f78bb13a752d?w=1200',
            'https://images.unsplash.com/photo-1733761002935-244f889465b9?w=1200',
          ]}
          onClose={() => {
            setShowVirtualTour(false);
            setSelectedVenue(null);
          }}
        />
      )}
      
      {showAIMatchmaker && (
        <AIMatchmaker
          onClose={() => setShowAIMatchmaker(false)}
          onRecommendations={(venues) => {
            setAiRecommendations(venues);
          }}
        />
      )}
      
      {showPayment && selectedVenue && (
        <PaymentIntegration
          venueName={selectedVenue.name}
          totalAmount={selectedVenue.price}
          onClose={() => {
            setShowPayment(false);
            setSelectedVenue(null);
          }}
          onSuccess={() => {
            setShowPayment(false);
            setSelectedVenue(null);
          }}
        />
      )}
    </div>
  );
}
