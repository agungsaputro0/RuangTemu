import { useState } from 'react';
import { X, Sparkles, MapPin, Users, Calendar, DollarSign, Heart, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { DatePicker } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import * as SliderPrimitive from "@radix-ui/react-slider";
import { GiDiamondRing, GiPartyPopper, GiShoppingBag, GiSoccerBall } from 'react-icons/gi';
import { HiOutlinePresentationChartLine } from 'react-icons/hi';
import { Dayjs } from 'dayjs';

interface AIMatchmakerProps {
  onClose: () => void;
  onRecommendations: (venues: any[], explanation: string) => void;
}

export function AIMatchmaker({ onClose, onRecommendations }: AIMatchmakerProps) {
  const [step, setStep] = useState(1);
  const categories = [
      { name: "Seremonial", icon: <GiDiamondRing className="w-6 h-6 text-mainColor" /> },
      { name: "Meeting", icon: <HiOutlinePresentationChartLine className="w-6 h-6 text-mainColor" /> },
      { name: "Olahraga", icon: <GiSoccerBall className="w-6 h-6 text-mainColor" /> },
      { name: "Bazaar", icon: <GiShoppingBag className="w-6 h-6 text-mainColor" /> },
      { name: "Pesta", icon: <GiPartyPopper className="w-6 h-6 text-mainColor" /> },
  ];
   const [isRange, setIsRange] = useState(false);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [rangeDate, setRangeDate] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    eventType: '',
    location: '',
    guestCount: [50, 200],
    budget: [10000000, 50000000],
    theme: '',
    date: '',
    amenities: [] as string[],
    style: '',
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
  setLoading(true);

  // Simulasi "AI berpikir"
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock data allVenues
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

  // Hitung skor dan alasan (reasons) tiap venue
  const scored = allVenues.map((venue) => {
    let score = 0;
    const reasons: string[] = [];

    if (preferences.eventType && venue.purposes.includes(preferences.eventType)) {
      score += 5;
      reasons.push("Cocok dengan jenis acara");
    }
    if (preferences.location && venue.location === preferences.location) {
      score += 1;
      reasons.push("Lokasi sesuai pilihan");
    }
    const [minBudget, maxBudget] = preferences.budget;
    if (venue.price >= minBudget && venue.price <= maxBudget) {
      score += 2;
      reasons.push("Budget sesuai");
    }
    const guestMin = preferences.guestCount[0];
    const guestMax = preferences.guestCount[1];
    const nums = (venue.capacity.match(/\d+/g) || []).map(Number);
    if (nums.length >= 2) {
      const [venueMin, venueMax] = nums;
      if (venueMax >= guestMin && venueMin <= guestMax) {
        score += 1;
        reasons.push("Kapasitas sesuai jumlah tamu");
      }
    }
    if (preferences.theme && venue.theme.toLowerCase() === preferences.theme.toLowerCase()) {
      score += 1;
      reasons.push("Tema sesuai pilihan");
    }
    if (preferences.style && venue.type.toLowerCase() === preferences.style.toLowerCase()) {
      score += 1;
      reasons.push("Gaya venue sesuai");
    }
    if (preferences.amenities.length > 0) {
      const matches = preferences.amenities.filter(a =>
        venue.facilities.some(f => f.toLowerCase().includes(a.toLowerCase()))
      );
      score += matches.length;
      if (matches.length > 0) reasons.push("Fasilitas cocok");
    }

    return { venue, score, reasons };
  });

  const unmetCriteria: string[] = [];

  // lokasi
  if (preferences.location) {
    const anyMatch = allVenues.some(v => v.location === preferences.location);
    if (!anyMatch) unmetCriteria.push("lokasi yang Anda inginkan");
  }

  // budget
  const [minBudget, maxBudget] = preferences.budget;
  const anyBudget = allVenues.some(v => v.price >= minBudget && v.price <= maxBudget);
  if (!anyBudget) unmetCriteria.push("rentang budget yang Anda tetapkan");

  // kapasitas/tamu
  const guestMin = preferences.guestCount[0];
  const guestMax = preferences.guestCount[1];
  const anyCapacity = allVenues.some(v => {
    const nums = (v.capacity.match(/\d+/g) || []).map(Number);
    if (nums.length < 2) return false;
    const [vMin, vMax] = nums;
    return vMax >= guestMin && vMin <= guestMax;
  });
  if (!anyCapacity) unmetCriteria.push("kapasitas tamu yang Anda butuhkan");

  // tema
  if (preferences.theme) {
    const anyTheme = allVenues.some(
      v => v.theme.toLowerCase() === preferences.theme.toLowerCase()
    );
    if (!anyTheme) unmetCriteria.push("tema venue pilihan Anda");
  }

  // style
  if (preferences.style) {
    const anyStyle = allVenues.some(
      v => v.type.toLowerCase() === preferences.style.toLowerCase()
    );
    if (!anyStyle) unmetCriteria.push("jenis venue (indoor/outdoor) yang Anda pilih");
  }

  // fasilitas
  if (preferences.amenities.length > 0) {
    const anyAmenities = allVenues.some(v =>
      preferences.amenities.some(a =>
        v.facilities.some(f => f.toLowerCase().includes(a.toLowerCase()))
      )
    );
    if (!anyAmenities) unmetCriteria.push("fasilitas yang Anda pilih");
  }


  // Ambil top 3 berdasarkan skor
  const top3 = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => ({
      ...s.venue,
      matchScore: Math.round((s.score / 10) * 100), // skala 0-100
      reasons: s.reasons,
      image: s.venue.images[0] || "",
    }));

  let explanation = "";

  if (unmetCriteria.length === 0) {
    explanation = "Semua preferensi Anda cocok dengan sebagian venue yang tersedia.";
  } else {
    explanation =
      "Berdasarkan analisis, kami menemukan 3 rekomendasi terbaik. Namun beberapa preferensi Anda tidak sepenuhnya terpenuhi, yaitu: " +
      unmetCriteria.join(", ") +
      ".";
  }


  setLoading(false);
  toast.success("AI Matchmaker menemukan 3 venue terbaik untuk Anda!");
  onRecommendations(
    top3,
    explanation,
  );
  onClose();
};


  const toggleAmenity = (amenity: string) => {
    setPreferences({
      ...preferences,
      amenities: preferences.amenities.includes(amenity)
        ? preferences.amenities.filter(a => a !== amenity)
        : [...preferences.amenities, amenity],
    });
  };

  const progressPercent = (step / 4) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative my-8  overflow-x-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-ruangTemuBold flex items-center justify-center">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-mainColor font-bold font-dancingScript flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            AI Matchmaker
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Biarkan AI kami menemukan venue sempurna untuk Anda
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Langkah {step} dari 4</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 text-" />
        </div>

        {/* Step 1: Event Details */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">

            {/* JENIS ACARA */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#FFB6C1]" />
                Jenis Acara
              </Label>

              <Select
                value={preferences.eventType}
                onValueChange={(value) => setPreferences({ ...preferences, eventType: value })}
              >
                <SelectTrigger
                  style={{height: "3.5rem"}}
                  className="
                    w-full h-[3.5rem] rounded-xl bg-gray-50 border border-gray-200
                    flex items-center px-4 text-gray-700 shadow-sm
                    focus:ring-2 focus:ring-mainColor/40
                  "
                >
                  <SelectValue placeholder="Pilih jenis acara" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name.toLowerCase()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* TANGGAL ACARA */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#FFB6C1]" />
                Tanggal Acara (Perkiraan)
              </Label>

              <div
                className="
                  grid grid-cols-[1fr_auto]
                  items-center gap-2
                  bg-gray-50
                  px-4 h-14
                  rounded-xl
                  border border-gray-200
                  shadow-sm
                "
              >
                {/* PICKER */}
                <div className="flex items-center gap-2 w-full overflow-hidden h-full">
                  {!isRange && (
                    <DatePicker
                      format="DD-MM-YYYY"
                      value={date}
                      onChange={(d) => setDate(d)}
                      placeholder="Pilih tanggal"
                      className="
                        w-full border-0 bg-transparent h-full
                        [&_.ant-picker-input>input]:h-14
                        [&_.ant-picker-input>input]:leading-[56px]
                        [&_.ant-picker-suffix]:hidden 
                        [&_.ant-picker-clear]:hidden
                        [&>.ant-picker-input>input]:text-sm
                      "
                      popupClassName="scale-95 origin-top"
                      style={{ background: "transparent", border: "none" }}
                    />
                  )}

                  {isRange && (
                    <DatePicker.RangePicker
                      format="DD-MM-YYYY"
                      value={rangeDate}
                      onChange={(val) => setRangeDate(val)}
                      placeholder={["Mulai", "Selesai"]}
                      className="
                        w-full border-0 bg-transparent h-full
                        [&_.ant-picker-input>input]:h-14
                        [&_.ant-picker-input>input]:leading-[56px]
                        [&_.ant-picker-suffix]:hidden 
                        [&_.ant-picker-clear]:hidden
                        [&>.ant-picker-input>input]:text-sm
                      "
                      popupClassName="scale-95 origin-top"
                      style={{ background: "transparent", border: "none" }}
                    />
                  )}
                </div>

                {/* TOGGLE MODE */}
                <div className="flex flex-col items-center justify-center ml-1">
                  <span className="text-[9px] leading-none text-gray-500 mb-1">Mode</span>

                  <div
                    onClick={() => setIsRange(!isRange)}
                    className={`
                      w-12 h-5 rounded-full p-1 cursor-pointer transition-all
                      flex items-center
                      ${isRange ? "bg-mainColor" : "bg-gray-300"}
                    `}
                  >
                    <div
                      className={`
                        w-3.5 h-3.5 rounded-full transition-all duration-300
                        ${isRange ? "translate-x-6 bg-white" : "translate-x-0 bg-mainColor"}
                      `}
                    />
                  </div>

                  <span className="text-[9px] leading-none text-gray-500 mt-1">
                    {isRange ? "Range" : "Single"}
                  </span>
                </div>
              </div>
            </div>

            {/* LOKASI */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#FFB6C1]" />
                Lokasi Pilihan
              </Label>

              <Select
                value={preferences.location}
                onValueChange={(value) => setPreferences({ ...preferences, location: value })}
              >
                <SelectTrigger
                  style={{height: "3.5rem"}}
                  className="
                    w-full h-14 rounded-xl bg-gray-50 border border-gray-200
                    flex items-center px-4 text-gray-700 shadow-sm
                    focus:ring-2 focus:ring-mainColor/40
                  "
                >
                  <SelectValue placeholder="Pilih lokasi" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Jakarta Pusat">Jakarta Pusat</SelectItem>
                  <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                  <SelectItem value="Jakarta Utara">Jakarta Utara</SelectItem>
                  <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
                  <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                  <SelectItem value="Kota Tangerang">Kota Tangerang</SelectItem>
                  <SelectItem value="Kota Bekasi">Kota Bekasi</SelectItem>
                  <SelectItem value="Kota Depok">Kota Depok</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        )}



        {/* Step 2: Capacity & Budget */}
        {step === 2 && (
           <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
      {/* Slider Jumlah Tamu */}
      <div>
        <Label className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-[#FFB6C1]" />
          Jumlah Tamu: {preferences.guestCount[0]} - {preferences.guestCount[1]} orang
        </Label>

        <SliderPrimitive.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={preferences.guestCount}
          onValueChange={(value) =>
            setPreferences({ ...preferences, guestCount: value })
          }
          min={50}
          max={1000}
          step={10}
        >
          <SliderPrimitive.Track className="bg-gray-300 relative flex-1 h-1 rounded-full">
            <SliderPrimitive.Range className="absolute bg-secondColor rounded-full h-full" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-secondColor rounded-full shadow-md" />
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-secondColor rounded-full shadow-md" />
        </SliderPrimitive.Root>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>50</span>
          <span>500</span>
        </div>
      </div>

      {/* Slider Budget */}
      <div>
        <Label className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-[#FFB6C1]" />
          Budget: Rp {(preferences.budget[0] / 1000000).toFixed(0)} -{" "}
          {(preferences.budget[1] / 1000000).toFixed(0)} Juta
        </Label>

        <SliderPrimitive.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={preferences.budget}
          onValueChange={(value) =>
            setPreferences({ ...preferences, budget: value })
          }
          min={10000000}
          max={200000000}
          step={5000000}
        >
          <SliderPrimitive.Track className="bg-gray-300 relative flex-1 h-1 rounded-full">
            <SliderPrimitive.Range className="absolute bg-secondColor rounded-full h-full" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-secondColor rounded-full shadow-md" />
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-secondColor rounded-full shadow-md" />
        </SliderPrimitive.Root>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Rp 10 Jt</span>
          <span>Rp 200 Jt</span>
        </div>
      </div>
    </div>
        )}

        {/* Step 3: Theme & Style */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <Label className="mb-3 block">Tema Acara</Label>
              <div className="grid grid-cols-2 gap-3">
                {['Modern', 'Tradisional', 'Garden', 'Rustic', 'Minimalis', 'Mewah'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setPreferences({ ...preferences, theme })}
                    className={`p-2 rounded-xl border-2 transition-all ${
                      preferences.theme === theme
                        ? 'border-secondColor bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                        : 'border-gray-200 hover:border-[#FFB6C1]'
                    }`}
                  >
                    <p className={`text-sm ${preferences.theme === theme ? 'text-secondColor' : 'text-gray-600'}`}>
                      {theme}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Gaya Venue</Label>
              <div className="grid grid-cols-2 gap-3">
                {['Indoor', 'Outdoor', 'Rooftop', 'Ballroom'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setPreferences({ ...preferences, style })}
                    className={`p-2 rounded-xl border-2 transition-all ${
                      preferences.style === style
                        ? 'border-secondColor bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                        : 'border-gray-200 hover:border-[#FFB6C1]'
                    }`}
                  >
                    <p className={`text-sm ${preferences.style === style ? 'text-secondColor' : 'text-gray-600'}`}>
                      {style}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Amenities */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <Label className="mb-3 block">Fasilitas yang Diinginkan (Pilih minimal 3)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Parkir Luas',
                  'AC',
                  'Sound System',
                  'Lighting',
                  'Dekorasi',
                  'Katering',
                  'Ruang Ganti',
                  'Foto Booth',
                  'Wifi',
                ].map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-3 rounded-lg border-2 transition-all text-sm ${
                      preferences.amenities.includes(amenity)
                        ? 'border-secondColor bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30 text-secondColor'
                        : 'border-gray-200 hover:border-[#FFB6C1] text-gray-600'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="flex-1"
            >
              Kembali
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={loading}
            className="flex-1 bg-ruangTemuBold hover:brightness-90 text-white"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Memproses...
              </span>
            ) : step === 4 ? (
              'Temukan Venue'
            ) : (
              'Lanjut'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
