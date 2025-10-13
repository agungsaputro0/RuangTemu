import { Calculator, Users, MapPin, Sparkles, TrendingUp, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function BudgetEstimator() {
  const [guests, setGuests] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState({
    venue: true,
    catering: false,
    decoration: false,
    photography: false,
    entertainment: false,
    makeup: false,
  });
  const [showEstimate, setShowEstimate] = useState(false);

  const calculateEstimate = () => {
    const guestCount = parseInt(guests) || 0;
    let total = 0;

    if (services.venue) total += guestCount * 50000; // Base venue cost
    if (services.catering) total += guestCount * 150000;
    if (services.decoration) total += 15000000;
    if (services.photography) total += 10000000;
    if (services.entertainment) total += 8000000;
    if (services.makeup) total += 5000000;

    return total;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCalculate = () => {
    if (guests && eventType && location) {
      setShowEstimate(true);
    }
  };

  const allVenues = [
    {
      id: 1,
      name: 'Romantic Restaurant Hall',
      price: 12000000,
      image: 'https://images.unsplash.com/photo-1680079033123-e5b22be5c523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk5NzU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Modern Reception Hall',
      price: 20000000,
      image: 'https://images.unsplash.com/photo-1759477274116-e3cb02d2b9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwaGFsbHxlbnwxfHx8fDE3NTk5NzU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: 'Royal Garden Venue',
      price: 18000000,
      image: 'https://images.unsplash.com/photo-1759490821541-f78bb13a752d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwd2VkZGluZ3xlbnwxfHx8fDE3NTk5MzYyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      name: 'Grand Ballroom Elegance',
      price: 25000000,
      image: 'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 5,
      name: 'Luxury Hotel Ballroom',
      price: 35000000,
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxscm9vbSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU5OTc1ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // Filter venues based on budget (within 20% of venue cost)
  const getRecommendedVenues = () => {
    const venueBudget = services.venue ? parseInt(guests) * 50000 : estimate * 0.4; // Assume 40% of total budget for venue
    return allVenues
      .filter((venue) => {
        const diff = Math.abs(venue.price - venueBudget) / venueBudget;
        return diff <= 0.5; // Within 50% range
      })
      .map((venue) => {
        const match = Math.max(50, Math.min(100, 100 - (Math.abs(venue.price - venueBudget) / venueBudget) * 100));
        return { ...venue, match: Math.round(match) };
      })
      .sort((a, b) => b.match - a.match)
      .slice(0, 3);
  };

  const recommendedVenues = getRecommendedVenues();

  const estimate = calculateEstimate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F4E4C1] to-[#FFE4E9] rounded-full mb-4">
            <Calculator className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-gray-700">Hitung Budget Acara Anda</span>
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
            Budget Estimator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dapatkan estimasi biaya yang akurat untuk lamaran atau pernikahan Anda, plus rekomendasi venue sesuai budget
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="border-[#F4E4C1] shadow-lg">
            <CardHeader>
              <CardTitle>Detail Acara</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block mb-2">Jenis Acara</label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="border-[#F4E4C1]">
                    <SelectValue placeholder="Pilih jenis acara" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement">Lamaran</SelectItem>
                    <SelectItem value="wedding">Pernikahan</SelectItem>
                    <SelectItem value="reception">Resepsi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2">Lokasi</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="border-[#F4E4C1]">
                    <SelectValue placeholder="Pilih lokasi" />
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
                <label className="block mb-2">Jumlah Tamu</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Masukkan jumlah tamu"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-10 border-[#F4E4C1]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-3">Paket Layanan</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#FFE4E9]/30 transition-colors">
                    <Checkbox
                      checked={services.venue}
                      onCheckedChange={(checked) =>
                        setServices({ ...services, venue: checked as boolean })
                      }
                      className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="text-sm">Venue</p>
                      <p className="text-xs text-gray-500">Sewa tempat acara</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#FFE4E9]/30 transition-colors">
                    <Checkbox
                      checked={services.catering}
                      onCheckedChange={(checked) =>
                        setServices({ ...services, catering: checked as boolean })
                      }
                      className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="text-sm">Catering</p>
                      <p className="text-xs text-gray-500">Makanan & minuman</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#FFE4E9]/30 transition-colors">
                    <Checkbox
                      checked={services.decoration}
                      onCheckedChange={(checked) =>
                        setServices({ ...services, decoration: checked as boolean })
                      }
                      className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="text-sm">Dekorasi</p>
                      <p className="text-xs text-gray-500">Dekorasi pelaminan & ruangan</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#FFE4E9]/30 transition-colors">
                    <Checkbox
                      checked={services.photography}
                      onCheckedChange={(checked) =>
                        setServices({ ...services, photography: checked as boolean })
                      }
                      className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="text-sm">Foto & Video</p>
                      <p className="text-xs text-gray-500">Dokumentasi profesional</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#FFE4E9]/30 transition-colors">
                    <Checkbox
                      checked={services.entertainment}
                      onCheckedChange={(checked) =>
                        setServices({ ...services, entertainment: checked as boolean })
                      }
                      className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="text-sm">Hiburan</p>
                      <p className="text-xs text-gray-500">Musik & MC</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#FFE4E9]/30 transition-colors">
                    <Checkbox
                      checked={services.makeup}
                      onCheckedChange={(checked) =>
                        setServices({ ...services, makeup: checked as boolean })
                      }
                      className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37]"
                    />
                    <div className="flex-1">
                      <p className="text-sm">Make Up Artist</p>
                      <p className="text-xs text-gray-500">Tata rias pengantin</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Hitung Estimasi
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="border-[#F4E4C1] shadow-lg bg-gradient-to-br from-white to-[#FFE4E9]/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                  Hasil Estimasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showEstimate && guests && eventType && location ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-white rounded-xl">
                      <p className="text-sm text-gray-600 mb-2">Total Estimasi Biaya</p>
                      <p className="text-4xl bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent mb-2">
                        {formatPrice(estimate)}
                      </p>
                      <p className="text-sm text-gray-500">Untuk {guests} tamu</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm">Rincian Biaya:</p>
                      {services.venue && (
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm">Venue</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {formatPrice(parseInt(guests) * 50000)}
                          </span>
                        </div>
                      )}
                      {services.catering && (
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm">Catering</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {formatPrice(parseInt(guests) * 150000)}
                          </span>
                        </div>
                      )}
                      {services.decoration && (
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm">Dekorasi</span>
                          </div>
                          <span className="text-sm text-gray-600">{formatPrice(15000000)}</span>
                        </div>
                      )}
                      {services.photography && (
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm">Foto & Video</span>
                          </div>
                          <span className="text-sm text-gray-600">{formatPrice(10000000)}</span>
                        </div>
                      )}
                      {services.entertainment && (
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm">Hiburan</span>
                          </div>
                          <span className="text-sm text-gray-600">{formatPrice(8000000)}</span>
                        </div>
                      )}
                      {services.makeup && (
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-sm">Make Up Artist</span>
                          </div>
                          <span className="text-sm text-gray-600">{formatPrice(5000000)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Isi form untuk melihat estimasi biaya</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommended Venues */}
            {showEstimate && (
              <Card className="border-[#F4E4C1] shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    Venue Sesuai Budget
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedVenues.map((venue) => (
                    <div
                      key={venue.id}
                      className="flex gap-4 p-3 rounded-lg hover:bg-[#FFE4E9]/30 transition-colors cursor-pointer"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={venue.image}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">{venue.name}</p>
                        <p className="text-sm text-[#D4AF37] mb-1">{formatPrice(venue.price)}</p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 bg-gray-200 rounded-full flex-1 max-w-[100px]">
                            <div
                              className="h-2 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] rounded-full"
                              style={{ width: `${venue.match}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{venue.match}% match</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
