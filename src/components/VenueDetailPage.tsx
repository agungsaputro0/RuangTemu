import { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Calendar,
  Check,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Coffee,
  Music,
  Camera,
  Utensils,
  Car,
  Wind,
  Sparkles,
  Eye,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VirtualTour360 } from './VirtualTour360';
import { BookingForm } from './BookingForm';
import { useAuth } from './AuthContext';
import { LoginModal } from './LoginModal';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

interface VenueDetailPageProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

const venueDetails = {
  1: {
    id: 1,
    name: 'Grand Ballroom Elegance',
    location: 'Jl. Sudirman No. 123, Jakarta Pusat',
    price: 25000000,
    rating: 4.9,
    reviewsCount: 127,
    capacity: '200-500 tamu',
    description:
      'Grand Ballroom Elegance adalah venue pernikahan mewah dengan desain interior klasik Eropa. Dilengkapi dengan crystal chandelier yang megah, panggung luas, dan sistem audio-visual modern. Lokasi strategis di pusat kota Jakarta memudahkan akses tamu dari berbagai area.',
    images: [
      '/assets/img/StreetView/1.jpg',
      '/assets/img/StreetView/2.jpg',
      '/assets/img/StreetView/3.jpg',
     'https://images.unsplash.com/photo-1478146059745-aabe4545d3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc1OTk3NTg5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    facilities: [
      { icon: Wind, name: 'AC', available: true },
      { icon: Car, name: 'Parkir Luas', available: true },
      { icon: Wifi, name: 'WiFi Gratis', available: true },
      { icon: Music, name: 'Sound System', available: true },
      { icon: Camera, name: 'Lighting Pro', available: true },
      { icon: Utensils, name: 'Catering Area', available: true },
      { icon: Coffee, name: 'Backstage', available: true },
      { icon: Sparkles, name: 'Dekorasi', available: false },
    ],
    packages: [
      {
        name: 'Paket Basic',
        price: 25000000,
        features: [
          'Sewa venue 8 jam',
          'Kapasitas 200 tamu',
          'Sound system standar',
          'Meja & kursi',
          'Basic lighting',
        ],
      },
      {
        name: 'Paket Premium',
        price: 35000000,
        features: [
          'Sewa venue 10 jam',
          'Kapasitas 500 tamu',
          'Sound system premium',
          'Meja & kursi VIP',
          'Premium lighting & LED',
          'Dekorasi pelaminan',
          'Backdrop foto',
        ],
        recommended: true,
      },
      {
        name: 'Paket All-In',
        price: 50000000,
        features: [
          'Sewa venue full day',
          'Kapasitas unlimited',
          'Sound & lighting premium',
          'Full dekorasi',
          'Catering 500 pax',
          'Dokumentasi foto & video',
          'MC & Entertainer',
          'Wedding organizer',
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: 'Sarah & Dimas',
        rating: 5,
        date: '15 Sep 2025',
        text: 'Venue sangat bagus dan pelayanan memuaskan! Tim vendor sangat profesional dan membantu kami di hari H. Dekorasi sesuai dengan request dan tamu-tamu kami sangat puas.',
        images: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaGFwcHl8ZW58MXx8fHwxNzU5OTc1ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        ],
      },
      {
        id: 2,
        name: 'Rina & Ahmad',
        rating: 5,
        date: '28 Agu 2025',
        text: 'Harga sesuai dengan kualitas yang diberikan. Ballroom-nya luas dan megah. Sangat recommended untuk acara pernikahan besar!',
        images: [],
      },
      {
        id: 3,
        name: 'Maya & Rizky',
        rating: 4,
        date: '10 Jul 2025',
        text: 'Overall bagus, cuma parkir agak terbatas kalau weekend. Tapi venue dan pelayanan top!',
        images: [],
      },
    ],
    vendorInfo: {
      name: 'PT Grand Ballroom Indonesia',
      responseTime: '< 1 jam',
      confirmationRate: '98%',
      verified: true,
    },
  },
  // Add more venues as needed
};

export function VenueDetailPage({ onBack, onBookingComplete }: VenueDetailPageProps) {
  const { id } = useParams();
  const venueId = Number(id);
  const { user, isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const venue = venueDetails[venueId as keyof typeof venueDetails] || venueDetails[1];
  const [selectedPackage, setSelectedPackage] = useState(venue.packages[0]);
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);
  };

  if (showBookingForm) {
    return (
      <BookingForm
        venue={venue}
        onBack={() => setShowBookingForm(false)}
        onSubmit={onBookingComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? 'text-red-500 border-red-500' : ''}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-[500px] bg-gray-100">
        <ImageWithFallback
          src={venue.images[currentImageIndex]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Virtual Tour Button */}
        <Button
          onClick={() => setShowVirtualTour(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900"
        >
          <Eye className="w-5 h-5 mr-2" />
          Virtual Tour 360°
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white rounded-full text-sm">
          {currentImageIndex + 1} / {venue.images.length}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Section */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1>{venue.name}</h1>
                <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white">
                  Verified Vendor
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-[#D4AF37]">{venue.rating}</span>
                  <span>({venue.reviews.length} review)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{venue.location}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="packages">Paket & Harga</TabsTrigger>
                <TabsTrigger value="facilities">Fasilitas</TabsTrigger>
                <TabsTrigger value="reviews">Review ({venue.reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Description */}
                <div>
                  <h3 className="mb-3">Deskripsi Venue</h3>
                  <p className="text-gray-600 leading-relaxed">{venue.description}</p>
                </div>

                {/* Key Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-[#F4E4C1]">
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
                      <p className="text-sm text-gray-600 mb-1">Kapasitas</p>
                      <p>{venue.capacity}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-[#F4E4C1]">
                    <CardContent className="p-4 text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
                      <p className="text-sm text-gray-600 mb-1">Lokasi</p>
                      <p>Jakarta Pusat</p>
                    </CardContent>
                  </Card>
                  <Card className="border-[#F4E4C1]">
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
                      <p className="text-sm text-gray-600 mb-1">Response Time</p>
                      <p>{venue.vendorInfo.responseTime}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Vendor Info */}
                <Card className="border-[#F4E4C1] bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20">
                  <CardContent className="p-6">
                    <h4 className="mb-3">Tentang Vendor</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nama Vendor:</span>
                        <span>{venue.vendorInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tingkat Konfirmasi:</span>
                        <span className="text-green-600">{venue.vendorInfo.confirmationRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="packages" className="space-y-4 mt-6">
                {venue.packages.map((pkg, index) => (
                  <Card
                    onClick={() => setSelectedPackage(pkg)}
                    key={index}
                    className={`border-2 ${
                      selectedPackage === pkg
                        ? 'border-[#D4AF37] bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20'
                        : 'border-gray-200'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="mb-1">{pkg.name}</h4>
                          {pkg.recommended && (
                            <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Mulai dari</p>
                          <p className="text-[#D4AF37] font-bold text-xl">
                            Rp {pkg.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="facilities" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {venue.facilities.map((facility, index) => {
                    const Icon = facility.icon;
                    return (
                      <Card
                        key={index}
                        className={`border ${
                          facility.available ? 'border-[#F4E4C1]' : 'border-gray-200 opacity-50'
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              facility.available
                                ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#FFB6C1]/20'
                                : 'bg-gray-100'
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 ${
                                facility.available ? 'text-[#D4AF37]' : 'text-gray-400'
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className={facility.available ? '' : 'text-gray-400'}>
                              {facility.name}
                            </p>
                            {facility.available && (
                              <p className="text-sm text-green-600">Tersedia</p>
                            )}
                            {!facility.available && (
                              <p className="text-sm text-gray-400">Tidak tersedia</p>
                            )}
                          </div>
                          {facility.available && (
                            <Check className="w-5 h-5 text-green-500" />
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 mt-6">
                {/* Rating Summary */}
                <Card className="border-[#F4E4C1] bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-5xl mb-2">{venue.rating}</div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{venue.reviews.length} review</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-2">
                          {venue.vendorInfo.confirmationRate} customer puas dengan venue ini
                        </p>
                        <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                          Verified Reviews
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                {venue.reviews.map((review) => (
                  <Card key={review.id} className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="mb-1">{review.name}</p>
                          <div className="flex gap-1 mb-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <p className="text-gray-600 mb-3">{review.text}</p>
                      {review.images.length > 0 && (
                        <div className="flex gap-2">
                          {review.images.map((img, idx) => (
                            <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden">
                              <ImageWithFallback
                                src={img}
                                alt="Review photo"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-[#F4E4C1] sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Harga mulai dari</p>
                  <h2 className="text-3xl font-bold text-[#D4AF37]">
                    Rp {selectedPackage.price.toLocaleString('id-ID')}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedPackage.name}</p>
                  <p className="text-sm text-gray-500 mt-2">per hari</p>
                </div>

                <Separator />

                {/* Hide booking buttons if vendor is viewing their own venue */}
                {!(user?.role === 'vendor' && venueId === 1) && (
                  <>
                    <div className="space-y-3">
                      <Button
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast.error('Silakan login sebagai Calon Pengantin terlebih dahulu untuk melakukan pemesanan');
                            setShowLoginModal(true);
                            return;
                          }
                          if (user?.role !== 'couple') {
                            toast.error('Hanya Calon Pengantin yang dapat melakukan pemesanan');
                            return;
                          }
                          setShowBookingForm(true);
                        }}
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
                      >
                        Pesan Sekarang
                      </Button>
                      <Button
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast.error('Silakan login sebagai Calon Pengantin terlebih dahulu untuk melakukan pemesanan');
                            setShowLoginModal(true);
                            return;
                          }
                          if (user?.role !== 'couple') {
                            toast.error('Hanya Calon Pengantin yang dapat melakukan pemesanan');
                            return;
                          }
                          setShowBookingForm(true);
                        }}
                        variant="outline"
                        className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                      >
                        Kirim Permintaan Penawaran
                      </Button>
                    </div>

                    <Separator />
                  </>
                )}

                {/* Show info for vendor viewing their own venue */}
                {user?.role === 'vendor' && venueId === 1 && (
                  <div className="p-4 bg-gradient-to-r from-[#F4E4C1]/30 to-[#FFE4E9]/30 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Ini adalah venue Anda</p>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Konfirmasi dalam {venue.vendorInfo.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Pembatalan gratis 7 hari sebelum acara</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Kontrak digital aman</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <VirtualTour360
          venueName={venue.name}
          tourImages={venue.images}
          onClose={() => setShowVirtualTour(false)}
        />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}