import { Calculator, Users, MapPin, Sparkles, TrendingUp, Check, Badge } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { allVenues } from './EksplorVenue';
import { GiTheater } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

 export const SERVICE_DEFINITIONS = [
    { key: "venue", label: "Venue", desc: "Sewa tempat acara" },
    { key: "catering", label: "Catering", desc: "Makanan & minuman" },
    { key: "decoration", label: "Dekorasi", desc: "Dekorasi ruangan & tema" },
    { key: "photography", label: "Foto", desc: "Dokumentasi profesional" },
    { key: "videography", label: "Video", desc: "Perekaman video acara" },
    { key: "entertainment", label: "Hiburan", desc: "Musik, DJ, MC" },
    { key: "mc", label: "MC", desc: "Master of Ceremony" },
    { key: "sound", label: "Sound System", desc: "Audio & peralatan mic" },
    { key: "lighting", label: "Lighting", desc: "Tata cahaya profesional" },
    { key: "stage", label: "Stage", desc: "Panggung & rigging" },
    { key: "booth", label: "Booth", desc: "Stan bazaar / tenant" },
    { key: "equipment", label: "Peralatan", desc: "Peralatan acara & teknis" },
    { key: "crew", label: "Crew", desc: "Tim teknis & operasional" },
    { key: "security", label: "Keamanan", desc: "Petugas keamanan acara" },
    { key: "cleaning", label: "Cleaning", desc: "Kebersihan lokasi acara" },
    { key: "parking", label: "Parkir", desc: "Manajemen parkir" },
    { key: "registrationDesk", label: "Registrasi", desc: "Meja registrasi tamu" },
    { key: "ambulance", label: "Ambulans", desc: "Tim medis & ambulans" },
    { key: "livestream", label: "Live Streaming", desc: "Siaran langsung acara" },
    { key: "generator", label: "Genset", desc: "Backup daya listrik" },
    { key: "wifi", label: "WiFi", desc: "Internet untuk acara" },
    { key: "makeup", label: "Make Up Artist", desc: "Make up profesional" },
  ];


export function BudgetEstimator() {
  const [guests, setGuests] = useState('');
  const navigate = useNavigate();
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

  type ServiceRangeFn = (guest: number) => { min: number; max: number };

  const SERVICE_COST_RANGE: Record<string, ServiceRangeFn> = {
    venue: (g = 1, type?: string) => {
      switch (type) {
        case "Olahraga":
          return { min: 3_000_000, max: 15_000_000 };
        case "Meeting":
          return { min: 5_000_000, max: 30_000_000 };
        case "Bazaar":
          return { min: 15_000_000, max: 150_000_000 };
        case "Seremonial":
          return { min: 25_000_000, max: 150_000_000 };
        case "Pesta":
          return { min: 25_000_000, max: 150_000_000 };
        default:
          return { min: 5_000_000, max: 40_000_000 }; 
      }
    },
    catering: (g = 1) => ({ min: 60000 * g, max: 250000 * g }),    // menu standar Jakarta
    decoration: () => ({ min: 3000000, max: 12000000 }),           // dekorasi standar Jakarta
    photography: () => ({ min: 4000000, max: 10000000 }),          // dokumentasi standar Jakarta
    videography: () => ({ min: 4000000, max: 10000000 }),
    entertainment: () => ({ min: 1500000, max: 6000000 }),         // hiburan Jakarta
    mc: () => ({ min: 1000000, max: 4000000 }),                    // MC skala Jakarta
    sound: () => ({ min: 750000, max: 5000000 }),                  // sound system besar
    lighting: () => ({ min: 750000, max: 5000000 }),
    stage: () => ({ min: 1500000, max: 5000000 }),
    booth: () => ({ min: 750000, max: 3000000 }),
    equipment: () => ({ min: 750000, max: 3000000 }),
    crew: () => ({ min: 0, max: 3000000 }),
    security: () => ({ min: 0, max: 2500000 }),
    cleaning: () => ({ min: 750000, max: 2500000 }),
    parking: () => ({ min: 0, max: 0 }),                           // diasumsikan gratis
    registrationDesk: () => ({ min: 750000, max: 2500000 }),
    ambulance: () => ({ min: 0, max: 0 }),
    livestream: () => ({ min: 1500000, max: 5000000 }),
    generator: () => ({ min: 750000, max: 2500000 }),
    wifi: () => ({ min: 0, max: 1500000 }),
    makeup: () => ({ min: 1000000, max: 7000000 }),
  };


  const getDefaultServices = (type: string) => {
    const base = {
      venue: false,
      catering: false,
      sound: false,
      lighting: false,
      decoration: false,
      stage: false,
      booth: false,
      equipment: false,
      crew: false,
      security: false,
      cleaning: false,
      photography: false,
      videography: false,
      mc: false,
      entertainment: false,
      parking: false,
      registrationDesk: false,
      ambulance: false,
      livestream: false,
      generator: false,
      wifi: false,
      makeup: false,
    };

    switch (type) {
      case "Meeting":
        return {
          ...base,
          venue: true,
          catering: true,
          sound: true,
          lighting: false,
          decoration: false,
          wifi: true,
          equipment: true,
          crew: true,
          registrationDesk: true,
        };

      case "Olahraga":
        return {
          ...base,
          venue: true,
          equipment: true,
          crew: true,
          sound: false,
          decoration: false,
          security: true,
          cleaning: true,
          ambulance: true,
        };

      case "Bazaar":
        return {
          ...base,
          venue: true,
          booth: true,
          lighting: true,
          security: true,
          cleaning: true,
          sound: false,
          decoration: false,
          generator: true,
        };

      case "Pesta":
        return {
          ...base,
          venue: true,
          catering: true,
          sound: true,
          lighting: true,
          decoration: true,
          entertainment: true,
          mc: true,
          photography: true,
          videography: true,
          generator: true,
          parking: true,
        };

      case "Seremonial":
        return {
          ...base,
          venue: true,
          stage: true,
          sound: true,
          lighting: true,
          decoration: true,
          catering: true,
          photography: true,
          videography: true,
          mc: true,
          livestream: true,
          security: true,
          parking: true,
        };

      default:
        return base;
    }
  };

  const getVenueRange = (location: string, eventType: string) => {
    const venues = allVenues.filter((v) =>
      v.location.includes(location) &&
      v.purposes.some((p) =>
        p.toLowerCase().includes(eventType.toLowerCase())
      )
    );

    if (venues.length === 0) {
      return { min: 0, max: 0 };
    }

    const prices = venues.map((v) => v.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  };


  const calculateEstimate = () => {
    const g = parseInt(guests) || 0;
    let min = 0;
    let max = 0;

    for (const key of Object.keys(services)) {
      if (services[key as keyof typeof services]) {
        const fn = SERVICE_COST_RANGE[key];
        if (fn) {
          const { min: svcMin, max: svcMax } = fn(g);
          min += svcMin;
          max += svcMax;
        }
      }
    }

    // Venue sekarang bisa digabung dengan data real dari allVenues
    const venueRange = getVenueRange(location, eventType); // dari function sebelumnya
    min += venueRange.min;
    max += venueRange.max;

    return { min, max };
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

  
  // Filter venues based on budget (within 20% of venue cost)
 interface GetRecommendedOptions {
  guests: number;
  estimateMAX: number;
  purpose: string;  // ini dari eventType
  location: string;
  services: { venue?: boolean };
}

const parseCapacity = (capacity: string) => {
  const [minStr, maxStr] = capacity.replace(/\D/g, " ").trim().split(/\s+/);
  return { min: parseInt(minStr), max: parseInt(maxStr) };
};

  const getRecommendedVenues = ({ guests, estimateMAX, purpose, location, services }: GetRecommendedOptions) => {
  const venueBudget = services.venue ? guests * 50000 : estimateMAX * 0.4;

  const scoreVenue = (venue: typeof allVenues[number]) => {
    const { min, max } = parseCapacity(venue.capacity);

    // Budget score
    const budgetDiff = Math.abs(venue.price - venueBudget) / venueBudget;
    const budgetScore = Math.max(0, 100 - budgetDiff * 100);

    // Capacity score
    let capacityScore = 100;
    if (guests > max) capacityScore = Math.max(50, 100 - ((guests - max) / max) * 100);
    if (guests < min) capacityScore = Math.max(50, 100 - ((min - guests) / min) * 100);

    // Purpose score
    const purposeScore = purpose
      ? venue.purposes.some(p => p.toLowerCase() === purpose.toLowerCase())
        ? 100
        : 0
      : 100;

    // Location score
    const locationScore = location
      ? venue.location.toLowerCase().includes(location.toLowerCase())
        ? 100
        : 50
      : 100;

    // Weighted: purpose diutamakan
    const match = Math.round(
      budgetScore * 0.3 +
      capacityScore * 0.2 +
      purposeScore * 0.4 +
      locationScore * 0.1
    );

    return { ...venue, match };
  };

  // Helper untuk sorting: match desc, kalau sama price asc
  const sortByMatchAndPrice = (a: typeof allVenues[number] & { match: number }, b: typeof allVenues[number] & { match: number }) => {
    if (b.match !== a.match) return b.match - a.match;  // match descending
    return a.price - b.price;                           // price ascending
  };

  // Level 1: purpose + lokasi
  let level1 = allVenues.filter(v =>
    v.purposes.some(p => p.toLowerCase() === purpose.toLowerCase()) &&
    v.location.toLowerCase().includes(location.toLowerCase())
  ).map(scoreVenue);

  if (level1.length >= 3) return level1.sort(sortByMatchAndPrice).slice(0, 3);

  // Level 2: purpose sesuai, lokasi fleksibel
  let level2 = allVenues.filter(v =>
    v.purposes.some(p => p.toLowerCase() === purpose.toLowerCase()) &&
    !v.location.toLowerCase().includes(location.toLowerCase())
  ).map(scoreVenue);

  let combined = [...level1, ...level2];
  if (combined.length >= 3) return combined.sort(sortByMatchAndPrice).slice(0, 3);

  // Level 3: sisanya
  let level3 = allVenues
    .filter(v => !combined.some(c => c.id === v.id))
    .map(scoreVenue);

  combined = [...combined, ...level3];
  return combined.sort(sortByMatchAndPrice).slice(0, 3);
};



  const estimate = calculateEstimate();

  const g = parseInt(guests) || 0;
  const estimateMAX = calculateEstimate().max;

  const recommendedVenues = getRecommendedVenues({
    guests: g,
    estimateMAX,
    purpose: eventType,  // <-- ini sekarang cocok dengan array purposes
    location,
    services: { venue: services.venue },
  });

  const [showAllServices, setShowAllServices] = useState(false);
  const activeServices = Object.keys(services).filter(key => services[key as keyof typeof services]);

  return (
    <div className="relative min-h-screen z-0 overflow-visible">
      <div
        aria-hidden
        className="absolute top-16 left-0 w-full h-[40dvh] md:h-[35dvh] bg-[url('/assets/img/blob.png')] 
             bg-no-repeat  
             bg-[length:360%] 
             md:bg-[length:200%]
             bg-center
             z-0"
      />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mt-16"></div>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F4E4C1] to-[#FFE4E9] rounded-full mb-4">
            <Calculator className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-gray-700">Hitung Budget Acara Anda</span>
          </div>
          <h1 className="mb-3 text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-white font-dancingScript">
            Budget Estimator
          </h1>
          <p className="text-white max-w-2xl mx-auto">
            Dapatkan estimasi biaya yang akurat untuk lamaran atau pernikahan Anda, plus rekomendasi venue sesuai budget
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="border-[#F4E4C1] shadow-lg">
            <CardHeader>
              <CardTitle className="font-dancingScript text-2xl text-center text-mainColor font-bold">Detail Acara</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block mb-2">Jenis Acara</label>
                <Select value={eventType} onValueChange={(val) => {
                    setEventType(val);
                    setServices(getDefaultServices(val)); 
                  }}>
                  <SelectTrigger className="border-[#F4E4C1]">
                    <SelectValue placeholder="Pilih jenis acara" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Seremonial">Seremonial</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Olahraga">Olahraga</SelectItem>
                    <SelectItem value="Bazaar">Bazaar</SelectItem>
                    <SelectItem value="Pesta">Pesta</SelectItem>
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
                    <SelectItem value="Jakarta Pusat">Jakarta Pusat</SelectItem>
                    <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                    <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                    <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
                    <SelectItem value="Jakarta Utara">Jakarta Utara</SelectItem>
                    <SelectItem value="Kota Bekasi">Kota Bekasi</SelectItem>
                    <SelectItem value="Kota Depok">Kota Depok</SelectItem>
                    <SelectItem value="Kota Tangerang">Kota Tangerang</SelectItem>
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
                <label className="block mb-3 font-medium">Paket Layanan</label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">

                  {SERVICE_DEFINITIONS.map((svc) => {
                    const active = services[svc.key as keyof typeof services];

                    return (
                      <button
                        key={svc.key}
                        type="button"
                        onClick={() =>
                          setServices({
                            ...services,
                            [svc.key as keyof typeof services]: !active,
                          })
                        }
                        className={`
                          flex flex-col items-start p-3 rounded-xl border transition 
                          text-left
                          ${active
                            ? "bg-secondColor text-white"
                            : "bg-white border-gray-300 hover:bg-appBoldPeach"
                          }
                        `}
                      >
                        <span className="text-sm font-medium">{svc.label}</span>
                        <span className="text-xs opacity-80">{svc.desc}</span>
                      </button>
                    );
                  })}

                </div>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-ruangTemuBold hover:brightness-90 text-white"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Hitung Estimasi
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="border-[#F4E4C1] shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex text-mainColor font-bold font-dancingScript text-xl items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Hasil Estimasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showEstimate && guests && eventType && location ? (
                  <div className="space-y-6">
                    {/* Total Estimasi */}
                    <div className="text-center p-6 bg-white rounded-xl">
                      <p className="text-sm text-gray-600 mb-2">Total Estimasi Biaya</p>
                      <p className="text-3xl bg-secondColor font-bold bg-clip-text text-transparent mb-2">
                        {formatPrice(estimate.min)} - {formatPrice(estimate.max)}
                      </p>
                      <p className="text-sm text-gray-500">Untuk {guests} tamu</p>
                    </div>

                  <div className="space-y-3">
            <p className="text-sm font-medium">Perkiraan Rincian Biaya:</p>
            
            {(showAllServices ? activeServices : activeServices.slice(0, 3)).map((key) => {
              const fn = SERVICE_COST_RANGE[key];
              if (!fn) return null;

              const { min, max } = fn(parseInt(guests));

              return (
                <div key={key} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm">{SERVICE_DEFINITIONS.find(s => s.key === key)?.label || key}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatPrice(min)} - {formatPrice(max)}
                  </span>
                </div>
              );
            })}

            {activeServices.length > 3 && (
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="text-sm text-secondColor p-2 rounded-full hover:bg-greyColor justify-self-center mt-1"
              >
                {showAllServices ? "Sembunyikan" : "Tampilkan Semua"}
              </button>
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
         Rekomendasi Venue Paling Relevan
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {recommendedVenues.map((venue) => (
        <div
          key={venue.id}
          className="flex gap-4 p-3 bg-greyColor rounded-lg hover:bg-greyColor/60 transition-colors cursor-pointer"
          onClick={() => navigate(`/venue/${venue.id}`)}
        >
          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={venue.images[0]}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Nama & Harga */}
              <p className="mb-1 font-semibold">{venue.name}</p>
              <p className="text-md text-secondColor font-bold mb-1">{formatPrice(venue.price)}</p>

              {/* Lokasi */}
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                <MapPin className="w-3 h-3 text-secondColor" />
                <span>{venue.location}</span>
              </div>

              {/* Kapasitas */}
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                <Users className="w-3 h-3 text-secondColor" />
                <span>{venue.capacity}</span>
              </div>

              {/* Fasilitas (max 3) */}
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                <GiTheater className="w-3 h-3 text-secondColor" />
                <span className="truncate max-w-[150px]">
                  {venue.facilities.slice(0, 3).join(", ")}
                  {venue.facilities.length > 3 ? "…" : ""}
                </span>
              </div>
            </div>

            {/* Match bar */}
            <div className="flex items-center gap-2 mt-2">
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
