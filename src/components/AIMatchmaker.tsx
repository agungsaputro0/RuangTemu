import { useState } from 'react';
import { X, Sparkles, MapPin, Users, Calendar, DollarSign, Heart, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as SliderPrimitive from "@radix-ui/react-slider";

interface AIMatchmakerProps {
  onClose: () => void;
  onRecommendations: (venues: any[]) => void;
}

export function AIMatchmaker({ onClose, onRecommendations }: AIMatchmakerProps) {
  const [step, setStep] = useState(1);
   const [startDate, setStartDate] = useState<Date | null>(null);
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
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI recommendations with scoring
    const mockRecommendations = [
      {
        id: 1,
        name: 'The Grand Ballroom Jakarta',
        matchScore: 98,
        location: 'Jakarta Pusat',
        price: 45000000,
        capacity: 150,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?w=800',
        reasons: ['Sesuai budget', 'Kapasitas ideal', 'Lokasi strategis', 'Tema elegan'],
      },
      {
        id: 2,
        name: 'Garden Paradise Venue',
        matchScore: 95,
        location: 'Jakarta Selatan',
        price: 48000000,
        capacity: 120,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1759490821541-f78bb13a752d?w=800',
        reasons: ['Suasana outdoor', 'Dekorasi natural', 'Foto spot indah'],
      },
      {
        id: 3,
        name: 'Royal Hall & Convention',
        matchScore: 92,
        location: 'Tangerang',
        price: 42000000,
        capacity: 180,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1733761002935-244f889465b9?w=800',
        reasons: ['Budget friendly', 'Kapasitas besar', 'Fasilitas lengkap'],
      },
    ];
    
    setLoading(false);
    toast.success('AI Matchmaker menemukan 3 venue terbaik untuk Anda!');
    onRecommendations(mockRecommendations);
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
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] flex items-center justify-center">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-[#D4AF37] flex items-center justify-center gap-2">
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
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#FFB6C1]" />
                Jenis Acara
              </Label>
              <Select
                value={preferences.eventType}
                onValueChange={(value) => setPreferences({ ...preferences, eventType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis acara" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lamaran">Lamaran</SelectItem>
                  <SelectItem value="pernikahan">Pernikahan</SelectItem>
                  <SelectItem value="resepsi">Resepsi</SelectItem>
                  <SelectItem value="all">Lamaran + Pernikahan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#FFB6C1]" />
                Tanggal Acara (Perkiraan)
              </Label>
               <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  placeholderText="Pilih tanggal"
                  className="w-full bg-[#f3f3f5] rounded-lg p-2 focus:outline-none text-gray-700"
                  dayClassName={(date) =>
                    "text-gray-700 hover:bg-[#D4AF37] hover:text-white rounded-full"
                  }
                  dateFormat="dd/MM/yyyy"
                />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#FFB6C1]" />
                Lokasi Pilihan
              </Label>
              <Select
                value={preferences.location}
                onValueChange={(value) => setPreferences({ ...preferences, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                  <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
                  <SelectItem value="jakarta-utara">Jakarta Utara</SelectItem>
                  <SelectItem value="jakarta-barat">Jakarta Barat</SelectItem>
                  <SelectItem value="jakarta-timur">Jakarta Timur</SelectItem>
                  <SelectItem value="tangerang">Tangerang</SelectItem>
                  <SelectItem value="bekasi">Bekasi</SelectItem>
                  <SelectItem value="depok">Depok</SelectItem>
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
          max={500}
          step={10}
        >
          <SliderPrimitive.Track className="bg-gray-300 relative flex-1 h-1 rounded-full">
            <SliderPrimitive.Range className="absolute bg-[#D4AF37] rounded-full h-full" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-[#D4AF37] rounded-full shadow-md" />
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-[#D4AF37] rounded-full shadow-md" />
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
            <SliderPrimitive.Range className="absolute bg-[#D4AF37] rounded-full h-full" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-[#D4AF37] rounded-full shadow-md" />
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-[#D4AF37] rounded-full shadow-md" />
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
                        ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                        : 'border-gray-200 hover:border-[#FFB6C1]'
                    }`}
                  >
                    <p className={`text-sm ${preferences.theme === theme ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
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
                        ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                        : 'border-gray-200 hover:border-[#FFB6C1]'
                    }`}
                  >
                    <p className={`text-sm ${preferences.style === style ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
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
                        ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30 text-[#D4AF37]'
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
            className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
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
