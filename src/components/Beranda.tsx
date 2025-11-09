import { Search, MapPin, Calendar, Users, Star, ChevronLeft, ChevronRight, Sparkles, Eye, Wand2, CreditCard, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { LoginModal } from './LoginModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LandingCurtain from './LandingCurtain';


const venues = [
  {
    id: 1,
    name: 'Grand Ballroom Elegance',
    location: 'Jakarta Pusat',
    price: 'Rp 25.000.000',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '200-500 tamu',
  },
  {
    id: 2,
    name: 'Royal Garden Venue',
    location: 'Tangerang',
    price: 'Rp 18.000.000',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1759490821541-f78bb13a752d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwd2VkZGluZ3xlbnwxfHx8fDE3NTk5MzYyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '100-300 tamu',
  },
  {
    id: 3,
    name: 'Luxury Hotel Ballroom',
    location: 'Jakarta Selatan',
    price: 'Rp 35.000.000',
    rating: 5.0,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1733761002935-244f889465b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJhbGxyb29tfGVufDF8fHx8MTc1OTkzMzkwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '300-800 tamu',
  },
  {
    id: 4,
    name: 'Romantic Restaurant Hall',
    location: 'BSD City',
    price: 'Rp 12.000.000',
    rating: 4.7,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1680079033123-e5b22be5c523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk5NzU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: '50-150 tamu',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Dimas',
    text: 'Platform yang sangat membantu! Kami menemukan venue impian dalam 2 hari. Proses negosiasi juga transparan.',
    rating: 5,
    venue: 'Grand Ballroom Elegance',
    image: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU5OTA2NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Rina & Ahmad',
    text: 'Budget estimator sangat akurat dan membantu kami merencanakan anggaran dengan tepat. Highly recommended!',
    rating: 5,
    venue: 'Royal Garden Venue',
    image: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU5OTA2NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Maya & Rizky',
    text: 'Kontrak digital membuat semuanya lebih aman dan profesional. Terima kasih Ruang Temu!',
    rating: 5,
    venue: 'Luxury Hotel Ballroom',
    image: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU5OTA2NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

interface BerandaProps {
  onVenueClick?: (venueId: number) => void;
  onNavigate?: (page: string) => void;
}

export function Beranda({ onVenueClick, onNavigate }: BerandaProps) {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      
      {/* Hero Banner */}
      <section className="relative min-h-[80dvh] pb-10 mt-[-3em] sm:mt-0 sm:h-[500px] bg-ruangTemu overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Wedding venue"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-16"></div>
        <div className="relative mt-28 sm:mt-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-mainColor" />
            <span className="text-sm text-gray-600">Platform #1 untuk Venue Pernikahan</span>
          </div>
          <h1 className="text-4xl font-dancingScript md:text-5xl lg:text-6xl mb-6 max-w-4xl bg-ruangTemuBold bg-clip-text text-mainColor">
            Temukan Venue Lamaran & <br></br> Pernikahan Impianmu
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
            Transparansi harga, negosiasi mudah, dan kontrak digital aman <br></br> semua dalam satu platform
          </p>

          {/* Search Bar */}
          <Card className="w-full max-w-4xl shadow-xl border-mainColorLite">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-mainColor" />
                    <Input
                      placeholder="Lokasi"
                      className="border-0 bg-transparent p-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-mainColor" />
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Pilih tanggal"
                      className="w-full p-2 focus:outline-none "
                      dayClassName={(date) =>
                        'text-gray-700 hover:bg-mainColor hover:text-white rounded-full'
                      }
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-mainColor" />
                    <Input
                      placeholder="Jumlah Tamu"
                      type="number"
                      className="border-0 bg-transparent p-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <Button 
                    onClick={() => onNavigate?.('eksplor')}
                    className="w-full h-full bg-ruangTemuLight hover:brightness-90  text-mainColor"
                  >
                    <Search className="w-5 h-5 mr-2 text-mainColor" />
                    Cari Venue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="mb-2">Fitur Unggulan Ruang Temu</h2>
          <p className="text-gray-600">Teknologi terkini untuk memudahkan perjalanan pernikahan Anda</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-mainColorLite hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mainColorLitest flex items-center justify-center">
                <Eye className="w-8 h-8 text-mainColor" />
              </div>
              <h4 className="mb-2">Virtual Tour 360°</h4>
              <p className="text-sm text-gray-600">Jelajahi venue secara interaktif dari rumah Anda</p>
            </CardContent>
          </Card>
          
          <Card className="border-mainColorLite hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mainColorLitest flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-mainColor" />
              </div>
              <h4 className="mb-2">AI Matchmaker</h4>
              <p className="text-sm text-gray-600">Rekomendasi venue sempurna dengan teknologi AI</p>
            </CardContent>
          </Card>
          
          <Card className="border-mainColorLite hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mainColorLitest flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-mainColor" />
              </div>
              <h4 className="mb-2">Pembayaran Fleksibel</h4>
              <p className="text-sm text-gray-600">DP, cicilan, atau bayar penuh dengan berbagai metode</p>
            </CardContent>
          </Card>
          
          <Card className="border-mainColorLite hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mainColorLitest flex items-center justify-center">
                <Shield className="w-8 h-8 text-mainColor" />
              </div>
              <h4 className="mb-2">Kontrak Digital Aman</h4>
              <p className="text-sm text-gray-600">E-signature legal dan perlindungan transaksi</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-mainColor to-[#FFB6C1] rounded-2xl p-8 text-white text-center">
          <h3 className="mb-2">🎉 Promo Spesial Bulan Ini!</h3>
          <p className="mb-4">Dapatkan diskon hingga 20% untuk booking venue di bulan Oktober 2025</p>
          <Button variant="secondary" className="bg-white text-mainColor hover:bg-gray-100">
            Lihat Promo
          </Button>
        </div>
      </section>

      {/* Vendor Banner Ads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2>Iklan dari Vendor Partner</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-mainColorLite hover:shadow-xl transition-shadow">
            <div className="relative h-48">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Vendor Ad"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-mainColor text-white px-3 py-1 rounded-full text-xs">
                Sponsored
              </div>
            </div>
            <CardContent className="p-5">
              <h4 className="mb-2">Grand Ballroom Elegance - Diskon 15%</h4>
              <p className="text-sm text-gray-600 mb-3">
                Book sekarang dan dapatkan diskon spesial hingga 15% untuk paket venue + catering
              </p>
              <Button 
                onClick={() => onVenueClick?.(1)}
                variant="outline" 
                className="w-full border-mainColor text-mainColor hover:bg-mainColorLite/30"
              >
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-mainColorLite hover:shadow-xl transition-shadow">
            <div className="relative h-48">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759490821541-f78bb13a752d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwd2VkZGluZ3xlbnwxfHx8fDE3NTk5MzYyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Vendor Ad"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-mainColor text-white px-3 py-1 rounded-full text-xs">
                Sponsored
              </div>
            </div>
            <CardContent className="p-5">
              <h4 className="mb-2">Royal Garden - Promo Wedding Package</h4>
              <p className="text-sm text-gray-600 mb-3">
                Paket lengkap venue outdoor dengan dekorasi romantic garden theme. Free foto prewedding!
              </p>
              <Button 
                onClick={() => onVenueClick?.(2)}
                variant="outline" 
                className="w-full border-mainColor text-mainColor hover:bg-mainColorLite/30"
              >
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recommended Venues */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="mb-2">Rekomendasi Venue Terdekat</h2>
            <p className="text-gray-600">Venue terpopuler di area Anda</p>
          </div>
          <Button variant="outline" className="border-mainColor text-mainColor hover:bg-mainColorLite/30">
            Lihat Semua
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue) => (
            <Card 
              key={venue.id} 
              onClick={() => onVenueClick?.(venue.id)}
              className="overflow-hidden hover:shadow-xl transition-shadow border-mainColorLite cursor-pointer"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-mainColor text-mainColor" />
                  <span className="text-sm">{venue.rating}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="mb-2">{venue.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  {venue.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Users className="w-4 h-4" />
                  {venue.capacity}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-mainColor font-bold text-xl">{venue.price}</span>
                  <span className="text-sm text-gray-500">({venue.reviews} review)</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-gradient-to-r from-mainColorLite/30 to-[#FFE4E9]/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Apa Kata Mereka?</h2>
          <div className="relative">
            <Card className="border-mainColorLite shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex gap-1 justify-center md:justify-start mb-3">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-mainColor text-mainColor" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">"{testimonials[currentTestimonial].text}"</p>
                    <p className="text-mainColor">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[currentTestimonial].venue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-mainColor text-mainColor hover:bg-mainColorLite/30"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-mainColor text-mainColor hover:bg-mainColorLite/30"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
