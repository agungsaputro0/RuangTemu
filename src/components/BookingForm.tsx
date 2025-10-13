import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  Plus,
  Minus,
  Check,
  Sparkles,
  Camera,
  Music,
  Utensils,
  Palette,
  User,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { RFQSubmission } from './RFQSubmission';

interface BookingFormProps {
  venue: any;
  onBack: () => void;
  onSubmit: (bookingData: any) => void;
}

const addOnServices = [
  {
    id: 'decoration',
    name: 'Dekorasi Premium',
    icon: Palette,
    description: 'Dekorasi tema custom sesuai request',
    price: 8000000,
  },
  {
    id: 'catering',
    name: 'Catering 500 Pax',
    icon: Utensils,
    description: 'Prasmanan Indonesia & International',
    price: 75000000,
  },
  {
    id: 'documentation',
    name: 'Dokumentasi Foto & Video',
    icon: Camera,
    description: '2 fotografer + 1 videografer',
    price: 12000000,
  },
  {
    id: 'makeup',
    name: 'Rias Pengantin',
    icon: User,
    description: 'Makeup artist profesional + busana',
    price: 15000000,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: Music,
    description: 'MC + Band / Singer',
    price: 10000000,
  },
];

export function BookingForm({ venue, onBack, onSubmit }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [showRFQSubmission, setShowRFQSubmission] = useState(false);

  // Form data
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState(venue.packages[0]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = selectedPackage.price;
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOnServices.find((a) => a.id === addOnId);
      if (addOn) total += addOn.price;
    });
    return total;
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setShowRFQSubmission(true);
    }
  };

  const handleRFQSubmit = (rfqData: any) => {
    const bookingData = {
      venue,
      eventName,
      eventDate,
      eventTime,
      guestCount,
      notes,
      selectedPackage,
      selectedAddOns: selectedAddOns.map((id) =>
        addOnServices.find((a) => a.id === id)
      ),
      totalPrice: calculateTotal(),
      ...rfqData,
    };
    onSubmit(bookingData);
  };

  if (showRFQSubmission) {
    return (
      <RFQSubmission
        bookingData={{
          venue,
          eventName,
          eventDate,
          eventTime,
          guestCount,
          notes,
          selectedPackage,
          selectedAddOns: selectedAddOns.map((id) =>
            addOnServices.find((a) => a.id === id)
          ),
          totalPrice: calculateTotal(),
        }}
        onBack={() => setShowRFQSubmission(false)}
        onSubmit={handleRFQSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={step === 1 ? onBack : () => setStep(1)}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </Button>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                1
              </div>
              <div className="w-12 h-0.5 bg-gray-200" />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                2
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Event Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2">Detail Acara</h2>
              <p className="text-gray-600">Lengkapi informasi acara pernikahan Anda</p>
            </div>

            <Card className="border-[#F4E4C1]">
              <CardContent className="p-6 space-y-6">
                {/* Venue Info */}
                <div className="p-4 bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Venue yang dipilih</p>
                  <h4>{venue.name}</h4>
                </div>

                {/* Event Name */}
                <div className="space-y-2">
                  <Label htmlFor="eventName">Nama Acara *</Label>
                  <Input
                    id="eventName"
                    placeholder="Contoh: Pernikahan Sarah & Dimas"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Tanggal Acara *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                      <Input
                        id="eventDate"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="pl-10 border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventTime">Jam Acara *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                      <Input
                        id="eventTime"
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="pl-10 border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Count */}
                <div className="space-y-2">
                  <Label htmlFor="guestCount">Jumlah Tamu *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                    <Input
                      id="guestCount"
                      type="number"
                      placeholder="Contoh: 300"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="pl-10 border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Package Selection */}
                <div className="space-y-3">
                  <Label>Pilih Paket *</Label>
                  {venue.packages.map((pkg: any, index: number) => (
                    <Card
                      key={index}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`cursor-pointer transition-all ${
                        selectedPackage.name === pkg.name
                          ? 'border-2 border-[#D4AF37] bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20'
                          : 'border border-gray-200 hover:border-[#D4AF37]'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4>{pkg.name}</h4>
                              {pkg.recommended && (
                                <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-1">
                              {pkg.features.slice(0, 3).map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <Check className="w-3 h-3 text-green-500" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                              {pkg.features.length > 3 && (
                                <p className="text-sm text-gray-500">+{pkg.features.length - 3} lainnya</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-[#D4AF37]">Rp {pkg.price.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Tambahan</Label>
                  <Textarea
                    id="notes"
                    placeholder="Sampaikan permintaan khusus atau pertanyaan Anda di sini..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleContinue}
              disabled={!eventName || !eventDate || !eventTime || !guestCount}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
            >
              Lanjut ke Add-ons
            </Button>
          </div>
        )}

        {/* Step 2: Add-ons */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2">Layanan Tambahan</h2>
              <p className="text-gray-600">Pilih layanan tambahan untuk melengkapi acara Anda</p>
            </div>

            <div className="space-y-4">
              {addOnServices.map((addOn) => {
                const Icon = addOn.icon;
                const isSelected = selectedAddOns.includes(addOn.id);
                
                // Calculate catering based on guest count
                const guests = parseInt(guestCount) || 0;
                const cateringPax = guests * 2;
                const displayName = addOn.id === 'catering' 
                  ? `Catering ${cateringPax} Pax` 
                  : addOn.name;
                
                return (
                  <Card
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn.id)}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-[#D4AF37] bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20'
                        : 'border border-gray-200 hover:border-[#D4AF37]'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1]'
                              : 'bg-gradient-to-br from-[#D4AF37]/20 to-[#FFB6C1]/20'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#D4AF37]'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1">{displayName}</h4>
                          <p className="text-sm text-gray-600">{addOn.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#D4AF37]">
                            Rp {addOn.price.toLocaleString('id-ID')}
                          </p>
                          {isSelected && (
                            <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37] mt-1">
                              <Check className="w-3 h-3 mr-1" />
                              Dipilih
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Total Price Summary */}
            <Card className="border-[#D4AF37] bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20">
              <CardContent className="p-6">
                <h4 className="mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  Ringkasan Biaya
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>{selectedPackage.name}</span>
                    <span>Rp {selectedPackage.price.toLocaleString('id-ID')}</span>
                  </div>
                  {selectedAddOns.map((addOnId) => {
                    const addOn = addOnServices.find((a) => a.id === addOnId);
                    return addOn ? (
                      <div key={addOn.id} className="flex justify-between text-gray-600">
                        <span>{addOn.name}</span>
                        <span>Rp {addOn.price.toLocaleString('id-ID')}</span>
                      </div>
                    ) : null;
                  })}
                  <Separator />
                  <div className="flex justify-between">
                    <span>Total Estimasi</span>
                    <span className="text-[#D4AF37]">
                      Rp {calculateTotal().toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
            >
              Lanjutkan ke Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}