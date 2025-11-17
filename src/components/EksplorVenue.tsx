import { Search, MapPin, DollarSign, Users, Star, Sparkles, SlidersHorizontal, Heart, Eye, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useEffect, useState } from 'react';
import { VirtualTour360 } from './VirtualTour360';
import { AIMatchmaker } from './AIMatchmaker';
import { PaymentIntegration } from './PaymentIntegration';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import LocationInputDropdown from './atoms/LocationInputDropdown';
import { Dayjs } from 'dayjs';
import { DatePicker, Input as AntdInput } from "antd";
import { GiDiamondRing, GiPartyPopper, GiShoppingBag, GiSoccerBall, GiTheater } from 'react-icons/gi';
import { MdBallot } from 'react-icons/md';
import useIsMobile from '../hooks/UseIsMobile';
import { HiOutlinePresentationChartLine } from 'react-icons/hi';
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { decryptData } from '../hooks/UseEncryptor';

const allVenues = [
  {
    id: 1,
    name: "Grand Ballroom Elegance",
    location: "Jakarta Pusat",
    type: "indoor",
    price: 25000000,
    rating: 4.9,
    reviews: 127,
    images: [
      "https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?w=1200",
      "https://images.unsplash.com/photo-1582719471137-e4b6801bd1f8?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1590490350862-6b7e8a5b0f58?w=1200",
    capacity: "200-500 tamu",
    theme: "Luxury",
    facilities: ["Parkir", "Wi-Fi", "Panggung", "Sound System", "AC", "Proyektor", "Meja & Kursi"],
    featured: true,
    purposes: ["Seremonial", "Pesta", "Meeting"],
  },
  {
    id: 2,
    name: "Royal Garden Venue",
    location: "Kota Tangerang",
    type: "outdoor",
    price: 18000000,
    rating: 4.8,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1759490821541-f78bb13a752d?w=1200",
      "https://images.unsplash.com/photo-1596749840926-7a5a57a6cc69?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1541417904950-b855846fe074?w=1200",
    capacity: "100-300 tamu",
    theme: "Garden",
    facilities: ["Parkir", "Wi-Fi", "Panggung", "Lapangan", "Dekorasi", "Pencahayaan"],
    featured: false,
    purposes: ["Seremonial", "Pesta", "Bazaar"],
  },
  {
    id: 3,
    name: "Luxury Hotel Ballroom",
    location: "Jakarta Selatan",
    type: "indoor",
    price: 35000000,
    rating: 5.0,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1733761002935-244f889465b9?w=1200",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
    capacity: "300-800 tamu",
    theme: "Luxury",
    facilities: ["Parkir", "Wi-Fi", "Panggung", "Catering", "Proyektor", "AC", "Dekorasi"],
    featured: true,
    purposes: ["Seremonial", "Meeting", "Pesta"],
  },
  {
    id: 4,
    name: "Romantic Restaurant Hall",
    location: "Jakarta Barat",
    type: "indoor",
    price: 12000000,
    rating: 4.7,
    reviews: 64,
    images: [
      "https://images.unsplash.com/photo-1680079033123-e5b22be5c523?w=1200",
      "https://images.unsplash.com/photo-1623071785886-ec6667f2e4ae?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
    capacity: "50-150 tamu",
    theme: "Intimate",
    facilities: ["Wi-Fi", "Meja & Kursi", "AC", "Pencahayaan"],
    featured: false,
    purposes: ["Seremonial", "Pesta"],
  },
  {
    id: 5,
    name: "Modern Reception Hall",
    location: "Jakarta Barat",
    type: "indoor",
    price: 20000000,
    rating: 4.6,
    reviews: 98,
    images: [
      "https://images.unsplash.com/photo-1759477274116-e3cb02d2b9d8?w=1200",
      "https://images.unsplash.com/photo-1594495894542-68e32d2a76e6?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1582719478250-65e4d0e6bd53?w=1200",
    capacity: "150-400 tamu",
    theme: "Modern",
    facilities: ["Parkir", "Wi-Fi", "Sound System", "Proyektor", "AC", "Pencahayaan"],
    featured: false,
    purposes: ["Meeting", "Pesta", "Seremonial"],
  },
  {
    id: 6,
    name: "Elegant Garden Paradise",
    location: "Kota Bekasi",
    type: "outdoor",
    price: 15000000,
    rating: 4.8,
    reviews: 112,
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200",
      "https://images.unsplash.com/photo-1759490821541-f78bb13a752d?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1594495900502-31c52a06f41c?w=1200",
    capacity: "100-250 tamu",
    theme: "Garden",
    facilities: ["Parkir", "Wi-Fi", "Lapangan", "Pencahayaan", "Dekorasi"],
    featured: true,
    purposes: ["Seremonial", "Pesta", "Bazaar"],
  },
  {
    id: 7,
    name: "Skyline Rooftop Venue",
    location: "Jakarta Utara",
    type: "mixed",
    price: 22000000,
    rating: 4.7,
    reviews: 76,
    images: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    capacity: "150-300 tamu",
    theme: "Modern",
    facilities: ["Wi-Fi", "Parkir", "Panggung", "Dekorasi", "Pencahayaan"],
    featured: false,
    purposes: ["Pesta", "Meeting"],
  },
  {
    id: 8,
    name: "Cultural Heritage Hall",
    location: "Kota Depok",
    type: "indoor",
    price: 9000000,
    rating: 4.5,
    reviews: 52,
    images: [
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1200",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1532153975070-2e9abdd64367?w=1200",
    capacity: "80-200 tamu",
    theme: "Traditional",
    facilities: ["Parkir", "Meja & Kursi", "Panggung"],
    featured: false,
    purposes: ["Seremonial", "Bazaar"],
  },
  {
    id: 9,
    name: "Minimalist Event Loft",
    location: "Jakarta Selatan",
    type: "indoor",
    price: 16000000,
    rating: 4.6,
    reviews: 73,
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    capacity: "80-250 tamu",
    theme: "Minimalist",
    facilities: ["Wi-Fi", "Parkir", "AC", "Proyektor"],
    featured: false,
    purposes: ["Meeting", "Pesta"],
  },
  {
    id: 10,
    name: "Tropical Lakeside Venue",
    location: "Kota Depok",
    type: "outdoor",
    price: 14000000,
    rating: 4.7,
    reviews: 69,
    images: [
      "https://images.unsplash.com/photo-1498601761216-3e67bac5a257?w=1200",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
    capacity: "100-300 tamu",
    theme: "Tropical",
    facilities: ["Parkir", "Lapangan", "Dekorasi", "Wi-Fi"],
    featured: true,
    purposes: ["Seremonial", "Pesta", "Olahraga"],
  },
  {
    id: 11,
    name: "Urban Creative Studio",
    location: "Jakarta Timur",
    type: "indoor",
    price: 8000000,
    rating: 4.4,
    reviews: 48,
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1514511091280-4c2e66f14cd9?w=1200",
    capacity: "30-120 tamu",
    theme: "Creative",
    facilities: ["Wi-Fi", "Proyektor", "Parkir"],
    featured: false,
    purposes: ["Meeting", "Bazaar", "Pesta"],
  },
  {
    id: 12,
    name: "Sports Arena Mini Hall",
    location: "Jakart Timur",
    type: "indoor",
    price: 10000000,
    rating: 4.3,
    reviews: 58,
    images: [
      "https://images.unsplash.com/photo-1593085511652-9e9ef6296e8d?w=1200",
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1200",
    ],
    photo360: "https://images.unsplash.com/photo-1590490350862-6b7e8a5b0f58?w=1200",
    capacity: "100-300 tamu",
    theme: "Sports",
    facilities: ["Lapangan", "Parkir", "Sound System"],
    featured: false,
    purposes: ["Olahraga", "Bazaar"],
  },
];



interface EksplorVenueProps {
  onVenueClick?: (venueId: number) => void;
}

export function EksplorVenue({ onVenueClick }: EksplorVenueProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
 useEffect(() => {
  const encrypted = searchParams.get("data");
  if (!encrypted) return;

  try {
    const decrypted = decryptData(decodeURIComponent(encrypted));
    const parsed = JSON.parse(decrypted);

    // === AUTOFILL FORM ===
    setLocation(parsed.location || "");

    if (parsed.range && Array.isArray(parsed.range)) {
      setIsRange(true);
      setRange([
        parsed.range[0] ? dayjs(parsed.range[0]) : null,
        parsed.range[1] ? dayjs(parsed.range[1]) : null,
      ]);
    } else {
      setIsRange(false);
      setDate(parsed.date ? dayjs(parsed.date) : null);
    }

    setGuest(parsed.guest || 1);

    // === INITIAL FILTER (berdasarkan data dari beranda) ===
    let hasil = [...allVenues];

    // filter location
    if (parsed.location) {
      hasil = hasil.filter(v => 
        v.location.toLowerCase() === parsed.location.toLowerCase()
      );
    }

    // filter guest capacity min requirement
    if (parsed.guest) {
      hasil = hasil.filter(v => {
        if (!v.capacity) return false;

        const [min] = v.capacity.split("-").map(x => parseInt(x));
        return min >= parsed.guest;
      });
    }

    // (opsional) filter by date or range kalau kamu punya logic spesifik


    // === SIMPAN sebagai base data (lapisan 1) ===
    setBaseVenues(hasil);

    // === filteredVenues awal = hasil lapisan pertama ===
    setFilteredVenues(hasil);

  } catch (e) {
    console.error("Failed to decrypt data:", e);
  }
}, []);

    
  const categories = [
    { name: "Semua", icon: <MdBallot className="w-6 h-6 text-mainColor" /> },
    { name: "Seremonial", icon: <GiDiamondRing className="w-6 h-6 text-mainColor" /> },
    { name: "Meeting", icon: <HiOutlinePresentationChartLine className="w-6 h-6 text-mainColor" /> },
    { name: "Olahraga", icon: <GiSoccerBall className="w-6 h-6 text-mainColor" /> },
    { name: "Bazaar", icon: <GiShoppingBag className="w-6 h-6 text-mainColor" /> },
    { name: "Pesta", icon: <GiPartyPopper className="w-6 h-6 text-mainColor" /> },
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [priceRange, setPriceRange] = useState([1000, 50000000]); // initial range
  const [showFilters, setShowFilters] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [showAIMatchmaker, setShowAIMatchmaker] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]); // wajib array
  const [explanation, setExplanations] = useState(""); 
  const [showPayment, setShowPayment] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [location, setLocation] = useState("");
  const [isRange, setIsRange] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [guest, setGuest] = useState<number | null>(null);
  const [baseVenues, setBaseVenues] = useState(allVenues); 
  const [filteredVenues, setFilteredVenues] = useState(allVenues);
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    setSelectedCategory("Semua");
  }, [location, guest]);

  useEffect(() => {
  let result = [...baseVenues];
  // ========== 🔥 1. FILTER BASED ON FORM ==========
  const hasFormValues = 
    (location && location.trim() !== "") ||
    (guest && guest > 0);

  if (hasFormValues) {
    // LOCATION
    if (location !== "") {
      result = result.filter(v =>
        v.location.toLowerCase().includes(location.toLowerCase())
      );
    } else {
      if (selectedCategory !== "Semua") {
        result = allVenues.filter(v =>
          Array.isArray(v.purposes) &&
          v.purposes.includes(selectedCategory)
        );
        setFilteredVenues(result);
        console.log(filteredVenues.length)
        return;
      } else {
        result = [...allVenues];
      }
    }

    // GUEST
    if (guest) {
      result = result.filter(v => {
        const cap = parseInt(v.capacity);
        return !isNaN(cap) && cap >= guest;
      });
    }
  } else {
    result = [...baseVenues];
  }

  

  // ========== 🔥 2. FILTER CATEGORY ==========
  if (selectedCategory !== "Semua") {
    result = result.filter(v =>
      Array.isArray(v.purposes) &&
      v.purposes.includes(selectedCategory)
    );
  }

  // ========== 🔥 FINAL ==========
  setFilteredVenues(result);

}, [location, guest, selectedCategory, baseVenues]);


  useEffect(() => {
    let sorted = [...allVenues];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;

      default:
        
    }

    setFilteredVenues(sorted);
  }, [sortBy]);



    // FROM FILTERS
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

    const parseCapacity = (capStr?: string): [number, number] => {
      if (!capStr) return [0, Infinity];
      const nums = (capStr.match(/\d+/g) || []).map(Number);
      if (capStr.includes("+") && nums.length >= 1) {
        return [nums[0], Infinity];
      }
      if (nums.length === 2) {
        return [nums[0], nums[1]];
      }
      if (nums.length === 1) {
        // misal "150 tamu" -> kita anggap max = that number
        return [0, nums[0]];
      }
      return [0, Infinity];
    };

    useEffect(() => {
    let results = allVenues;

    // LOCATION
    if (location) {
      results = results.filter(v =>
        v.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // GUEST
    if (guest) {
      results = results.filter(v => {
        const [minCap, maxCap] = parseCapacity(v.capacity);
        return guest <= maxCap;
      });
}

    // TYPE
    if (selectedType) {
      results = results.filter(v => v.type.toLowerCase() === selectedType);
    }

    // FACILITIES
    if (selectedFacilities.length > 0) {
      results = results.filter(v =>
        selectedFacilities.every(f => v.facilities.includes(f))
      );
    }

    // RATING
    if (rating > 0) {
      results = results.filter(v => v.rating >= rating);
    }

    // PRICE RANGE
    results = results.filter(
      v => v.price >= priceRange[0] && v.price <= priceRange[1]
    );

    setFilteredVenues(results);
  }, [
    location,
    guest,
    selectedType,
    selectedFacilities,
    rating,
    priceRange,
    date,
    range,
    isRange
  ]);


  
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
   <div className="relative min-h-screen z-0 overflow-visible">
      {/* Background Header Gradient — pakai z-0 (bukan negative z) */}
      {/* Ganti bg-mainColor sementara dengan bg-blue-500 untuk test; kembalikan ke bg-mainColor setelah terlihat */}
      <div
        aria-hidden
        className="absolute top-16 left-0 w-full h-[32vh] md:h-[28vh] bg-ruangTemuBold z-0"
      />

      {/* CONTENT wrapper — harus berada di atas background (z-10) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mt-16"></div>
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-dancingScript font-bold text-white">Eksplor Venue</h1>
          <p className="text-white">Temukan venue impian dengan filter dan AI Matchmaker</p>
        </div>

        {/* Search & AI Matchmaker */}
        <div className="flex flex-col gap-4 mb-8 bg-ruangTemu p-10 rounded-xl">
          {/* ROW 1: Location, Date, Guest */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
  {/* LOCATION */}
  <div className="w-full">
    <LocationInputDropdown
      location={location}
      setLocation={setLocation}
    />
  </div>

  {/* DATE */}
  <div className="w-full flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
    <div className="flex items-center gap-2 w-full overflow-hidden">
      <Calendar className="w-5 h-5 text-mainColor flex-shrink-0" />

      {!isRange && (
        <DatePicker
          format="DD-MM-YYYY"
          value={date}
          onChange={(d) => setDate(d)}
          placeholder="Tanggal"
          className="w-full border-none bg-transparent h-full text-sm"
          popupClassName="scale-95 origin-top"
        />
      )}

      {isRange && (
        <DatePicker.RangePicker
          format="DD-MM-YYYY"
          value={range}
          onChange={(val) => setRange(val)}
          placeholder={["Mulai", "Selesai"]}
          className="w-full border-none bg-transparent h-full text-sm"
          popupClassName="scale-95 origin-top"
        />
      )}
    </div>

    {/* Toggle Range */}
    <div
      onClick={() => setIsRange(!isRange)}
      className={`ml-3 w-12 h-5 rounded-full p-1 flex items-center cursor-pointer transition-all ${
        isRange ? "bg-mainColor" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
          isRange ? "translate-x-6 bg-white" : "translate-x-0 bg-mainColor"
        }`}
      />
    </div>
  </div>

  {/* GUEST */}
  <div className="w-full flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
    <Users className="w-5 h-5 text-mainColor" />
    <AntdInput
      placeholder="Jumlah Tamu"
      type="number"
      min={1}
      value={guest ?? ""}
      onChange={(e) => setGuest(Number(e.target.value))}
      className="border-none bg-transparent p-0 text-sm focus:ring-0 w-full"
    />
  </div>
</div>


          {/* ROW 2: Filter + AI Matchmaker */}
          <div className="flex flex-col md:flex-row gap-3 mt-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 bg-ruangTemuPremier text-white hover:bg-ruangTemuLight hover:border-mainColor hover:text-mainColor h-12 flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filter
            </Button>

            <Button 
              onClick={() => setShowAIMatchmaker(true)}
              className="flex-1 bg-ruangTemuSecond hover:brightness-90 text-white h-12 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              AI Matchmaker
            </Button>
          </div>
          <div className="w-full max-w-5xl mx-auto">

  {isMobile ? (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((cat) => {
        const active = selectedCategory === cat.name;
        return (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`
              flex items-center justify-center gap-2 
              w-full h-12 rounded-full border
              border-gray-200 shadow-sm transition-all duration-200

             ${active 
                ? "bg-mainColorLite border-mainColorLite shadow" 
                : " bg-white hover:bg-mainColorLite hover:border-mainColorLite hover:shadow"
              }

            `}
          >
            <span className="text-mainColor text-lg">{cat.icon}</span>
            <span className="text-sm font-medium text-gray-700">{cat.name}</span>
          </button>
        );
      })}
    </div>
  ) : (

    <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory hide-scrollbar justify-center">
      {categories.map((cat) => {
        const active = selectedCategory === cat.name;
        return (
          <div key={cat.name} className="snap-start flex-shrink-0">
            <button
              onClick={() => setSelectedCategory(cat.name)}
              className={`
                flex items-center justify-center gap-2 
                w-40 h-12 rounded-full border
                border-gray-200 shadow-sm transition-all duration-200

                ${active 
                  ? "bg-mainColorLite border-mainColorLite shadow" 
                  : "bg-white hover:bg-mainColorLite hover:border-mainColorLite hover:shadow"
                }

              `}
            >
              <span className="text-mainColor text-lg">{cat.icon}</span>
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </button>
          </div>
        );
      })}
    </div>
  )}
</div>

        </div>



                {/* Filters */}
                {showFilters && (
                <Card className="mb-8 border border-[#F4E4C1] rounded-2xl shadow-sm bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">

              {/* TIPE VENUE */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tipe Venue</label>
                <Select onValueChange={setSelectedType}>
                  <SelectTrigger className="border border-[#F4E4C1] rounded-lg h-10">
                    <SelectValue placeholder="Pilih Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="mixed">Indoor + Outdoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* FASILITAS */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">Fasilitas</label>
                <div className="flex flex-wrap gap-2">
                  {["Parkir",
                    "Wi-Fi",
                    "Panggung",
                    "Catering",
                    "Akses Difabel",
                    "Lapangan",
                    "Proyektor",
                    "Meja & Kursi",
                    "Sound System",
                    "AC",
                    "Booth / Stand",
                    "Listrik",
                    "Dekorasi",
                    "Pencahayaan"].map((f) => (
                    <label 
                      key={f} 
                      className="flex items-center gap-2 cursor-pointer text-md"
                    >
                      <input 
                        type="checkbox" 
                        className="hidden peer"
                        checked={selectedFacilities.includes(f)}
                        onChange={() => {
                          setSelectedFacilities((prev) =>
                            prev.includes(f)
                              ? prev.filter(x => x !== f)
                              : [...prev, f]
                          );
                        }}
                      />
                      <span className="px-3 py-1 rounded-full border border-gray-300 peer-checked:bg-secondColor peer-checked:text-white transition-all cursor-pointer">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* RATING */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const value = hover ?? rating;
                    let icon;
                    if (value >= star) icon = <FaStar size={20} className="text-yellow-400" />;
                    else if (value + 0.5 >= star) icon = <FaStarHalfAlt size={20} className="text-yellow-400" />;
                    else icon = <FaRegStar size={30} className="text-gray-300" />;
                    return (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onMouseMove={(e) => handleMouseMove(e, star)}
                        onClick={(e) => handleClick(e, star)}
                        onMouseLeave={() => setHover(null)}
                      >
                        {icon}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1 text-xs text-gray-500">Rating: {rating} Bintang</p>
              </div>

            </div>

            {/* RENTANG HARGA */}
            <div className="mt-6">
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Rentang Harga:{" "}
                <span className="text-secondColor font-semibold">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </span>
              </label>
              <SliderPrimitive.Root
                className="relative flex items-center select-none touch-none w-full h-4"
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={50000000}
                step={1000000}
              >
                <SliderPrimitive.Track className="bg-gray-200 relative flex-1 h-1 rounded-full">
                  <SliderPrimitive.Range className="absolute bg-secondColor rounded-full h-full" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb className="block w-5 h-5 bg-secondColor rounded-full shadow-md ring-2 ring-white" />
                <SliderPrimitive.Thumb className="block w-5 h-5 bg-secondColor rounded-full shadow-md ring-2 ring-white" />
              </SliderPrimitive.Root>
            </div>
          </CardContent>
                </Card>

        )}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">{filteredVenues.length} venue ditemukan</p>
          <Select value={sortBy} onValueChange={setSortBy}>
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
  <div className="mb-10">
    <div className="flex items-center gap-2 mb-4">
      <Sparkles className="w-6 h-6 text-secondColor" />
      <h2 className="text-secondColor font-semibold text-lg">
        Rekomendasi AI untuk Anda
      </h2>
    </div>

    {/* Penjelasan hasil analisis AI */}
    {explanation && (
      <div className="mb-6 p-4 rounded-xl bg-[#FFF4F6] border border-[#FFD3DD] text-sm text-gray-700">
        <span className="font-medium text-secondColor">
          Berdasarkan analisis preferensi Anda:
        </span>
        <br />
        {explanation}
      </div>
    )}

    <div className="grid md:grid-cols-3 gap-6">
      {aiRecommendations.map((venue) => (
        <Card
          key={venue.id}
          onClick={() => onVenueClick?.(venue.id)}
          className="overflow-hidden border-2 border-secondColor shadow-lg cursor-pointer"
        >
          <div className="relative h-48">
            <ImageWithFallback
              src={venue.image}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-ruangTemuBold text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                {venue.matchScore}% Match
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <h4 className="mb-2 font-semibold">{venue.name}</h4>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 text-secondColor" />
              {venue.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Users className="w-4 h-4 text-secondColor" />
                  {venue.capacity}
                </div>
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                <Sparkles className="w-4 h-4 text-secondColor mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {venue.purposes?.map((p: any, i: any) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 bg-secondColor/10 text-secondColor rounded-full text-xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Kenapa cocok:</p>
              <div className="flex flex-wrap gap-1">
                {venue.reasons.slice(0, 3).map((reason: string, idx: number) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-white bg-secondColor text-xs"
                  >
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <p className="text-secondColor font-bold">
                {formatPrice(venue.price)} 
              </p>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onVenueClick?.(venue.id);
                }}
                className="bg-ruangTemuSecond text-white"
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
          {filteredVenues.map((venue) => (
            <Card 
              key={venue.id} 
              onClick={() => onVenueClick?.(venue.id)}
              className="overflow-hidden hover:shadow-xl transition-all border-[#F4E4C1] group cursor-pointer"
            >
              <div className="relative h-56">
                <ImageWithFallback
                  src={venue.images[0]}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {venue.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-ruangTemuBold text-white border-0">
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
                    <Eye className="w-5 h-5 text-secondColor" />
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#FFE4E9] transition-colors"
                  >
                    <Heart className="w-5 h-5 text-[#FFB6C1]" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-bold text-mainColor">{venue.rating}</span>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="mb-2">{venue.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 text-secondColor" />
                  {venue.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Users className="w-4 h-4 text-secondColor" />
                  {venue.capacity}
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                <Sparkles className="w-4 h-4 text-secondColor mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {venue.purposes?.map((p, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 bg-secondColor/10 text-secondColor rounded-full text-xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
                {/* RATING + FASILITAS (max 3, lalu ...) */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <GiTheater className="w-4 h-4 fill-secondColor text-secondColor" />
                  </div>

                  {/* Fasilitas (max 3) */}
                  <span className="truncate max-w-[160px]">
                    {venue.facilities
                      .slice(0, 3)
                      .join(", ")}
                    {venue.facilities.length > 4 && "…"}
                  </span>

                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Mulai dari</p>
                    <p className="text-secondColor font-bold text-xl">{formatPrice(venue.price)}</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onVenueClick?.(venue.id);
                    }}
                    className="bg-ruangTemuSecond hover:brightness-90 text-white"
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
          onRecommendations={(venues, explanation) => {
            setAiRecommendations(venues);
            setExplanations(explanation);
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
