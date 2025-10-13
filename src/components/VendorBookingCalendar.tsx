import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Users, DollarSign, Clock, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface Booking {
  id: number;
  venueName: string;
  coupleName: string;
  date: string;
  time: string;
  guests: number;
  amount: string;
  status: 'confirmed' | 'pending' | 'completed';
  phone: string;
  email: string;
}

const mockBookings: Booking[] = [
  // Oktober 2025 (bulan ini)
  {
    id: 1,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Siti & Bambang',
    date: '2025-10-12',
    time: '18:00',
    guests: 280,
    amount: 'Rp 62.000.000',
    status: 'confirmed',
    phone: '+62 812 3456 7890',
    email: 'siti.bambang@email.com',
  },
  {
    id: 2,
    venueName: 'Royal Garden Venue',
    coupleName: 'Putri & Reza',
    date: '2025-10-15',
    time: '17:00',
    guests: 220,
    amount: 'Rp 48.000.000',
    status: 'confirmed',
    phone: '+62 821 9876 5432',
    email: 'putri.reza@email.com',
  },
  {
    id: 3,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Maya & Fikri',
    date: '2025-10-20',
    time: '19:00',
    guests: 320,
    amount: 'Rp 70.000.000',
    status: 'pending',
    phone: '+62 813 1234 5678',
    email: 'maya.fikri@email.com',
  },
  {
    id: 4,
    venueName: 'Royal Garden Venue',
    coupleName: 'Dinda & Arif',
    date: '2025-10-26',
    time: '16:00',
    guests: 200,
    amount: 'Rp 45.000.000',
    status: 'confirmed',
    phone: '+62 822 3456 7890',
    email: 'dinda.arif@email.com',
  },
  {
    id: 5,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Ayu & Dimas',
    date: '2025-10-31',
    time: '18:00',
    guests: 300,
    amount: 'Rp 68.000.000',
    status: 'confirmed',
    phone: '+62 811 9876 5432',
    email: 'ayu.dimas@email.com',
  },
  // November 2025
  {
    id: 6,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Sarah & Ahmad',
    date: '2025-11-08',
    time: '18:00',
    guests: 300,
    amount: 'Rp 67.500.000',
    status: 'confirmed',
    phone: '+62 812 3456 7891',
    email: 'sarah.ahmad@email.com',
  },
  {
    id: 7,
    venueName: 'Royal Garden Venue',
    coupleName: 'Intan & Fadli',
    date: '2025-11-15',
    time: '17:00',
    guests: 250,
    amount: 'Rp 52.000.000',
    status: 'confirmed',
    phone: '+62 821 9876 5433',
    email: 'intan.fadli@email.com',
  },
  {
    id: 8,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Lisa & Ryan',
    date: '2025-11-22',
    time: '19:00',
    guests: 350,
    amount: 'Rp 75.000.000',
    status: 'pending',
    phone: '+62 813 1234 5679',
    email: 'lisa.ryan@email.com',
  },
  // Desember 2025
  {
    id: 9,
    venueName: 'Royal Garden Venue',
    coupleName: 'Diana & Budi',
    date: '2025-12-05',
    time: '16:00',
    guests: 200,
    amount: 'Rp 45.000.000',
    status: 'confirmed',
    phone: '+62 822 3456 7891',
    email: 'diana.budi@email.com',
  },
  {
    id: 10,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Tasya & Irfan',
    date: '2025-12-12',
    time: '18:00',
    guests: 330,
    amount: 'Rp 72.000.000',
    status: 'confirmed',
    phone: '+62 811 9876 5434',
    email: 'tasya.irfan@email.com',
  },
  {
    id: 11,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Nadia & Hadi',
    date: '2025-12-20',
    time: '17:00',
    guests: 280,
    amount: 'Rp 65.000.000',
    status: 'confirmed',
    phone: '+62 812 3456 7892',
    email: 'nadia.hadi@email.com',
  },
  {
    id: 12,
    venueName: 'Royal Garden Venue',
    coupleName: 'Wulan & Bima',
    date: '2025-12-28',
    time: '19:00',
    guests: 240,
    amount: 'Rp 50.000.000',
    status: 'pending',
    phone: '+62 821 9876 5435',
    email: 'wulan.bima@email.com',
  },
  // Januari 2026
  {
    id: 13,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Michael & Jessica',
    date: '2026-01-10',
    time: '19:00',
    guests: 400,
    amount: 'Rp 85.000.000',
    status: 'confirmed',
    phone: '+62 813 1234 5680',
    email: 'michael.jessica@email.com',
  },
  {
    id: 14,
    venueName: 'Royal Garden Venue',
    coupleName: 'Rina & Andi',
    date: '2026-01-18',
    time: '15:00',
    guests: 180,
    amount: 'Rp 42.000.000',
    status: 'confirmed',
    phone: '+62 822 3456 7892',
    email: 'rina.andi@email.com',
  },
  {
    id: 15,
    venueName: 'Grand Ballroom Elegance',
    coupleName: 'Dewi & Fajar',
    date: '2026-01-25',
    time: '18:00',
    guests: 360,
    amount: 'Rp 78.000.000',
    status: 'pending',
    phone: '+62 811 9876 5436',
    email: 'dewi.fajar@email.com',
  },
];

interface VendorBookingCalendarProps {
  onBack: () => void;
}

export function VendorBookingCalendar({ onBack }: VendorBookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const venues = [
    { value: 'all', label: 'Semua Venue' },
    { value: 'Grand Ballroom Elegance', label: 'Grand Ballroom Elegance' },
    { value: 'Royal Garden Venue', label: 'Royal Garden Venue' },
  ];

  const filteredBookings = selectedVenue === 'all' 
    ? mockBookings 
    : mockBookings.filter(b => b.venueName === selectedVenue);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getBookingsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return filteredBookings.filter(booking => booking.date === dateString);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailDialog(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-700 border-green-200' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      completed: { label: 'Completed', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={`${config.className} border`}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="mb-4 hover:bg-[#F4E4C1]/30"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Kalender Booking</h1>
              <p className="text-gray-600">Lihat semua jadwal booking venue Anda</p>
            </div>
            <div className="w-64">
              <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                <SelectTrigger className="border-[#F4E4C1]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {venues.map(venue => (
                    <SelectItem key={venue.value} value={venue.value}>
                      {venue.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="border-[#F4E4C1]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={previousMonth}
                      className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextMonth}
                      className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {/* Day headers */}
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                    <div key={day} className="text-center text-sm text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square p-2" />
                  ))}
                  
                  {/* Calendar days */}
                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const bookings = getBookingsForDate(date);
                    const isToday = 
                      date.getDate() === new Date().getDate() &&
                      date.getMonth() === new Date().getMonth() &&
                      date.getFullYear() === new Date().getFullYear();

                    return (
                      <div
                        key={day}
                        className={`aspect-square p-2 border rounded-lg ${
                          isToday 
                            ? 'border-[#D4AF37] bg-[#F4E4C1]/20' 
                            : 'border-gray-200 hover:border-[#F4E4C1] hover:bg-[#FFE4E9]/10'
                        } transition-colors cursor-pointer`}
                      >
                        <div className="text-sm mb-1">{day}</div>
                        {bookings.length > 0 && (
                          <div className="space-y-1">
                            {bookings.map(booking => (
                              <div
                                key={booking.id}
                                onClick={() => handleBookingClick(booking)}
                                className="text-xs p-1 rounded bg-gradient-to-r from-[#D4AF37]/20 to-[#FFB6C1]/20 hover:from-[#D4AF37]/30 hover:to-[#FFB6C1]/30 transition-colors truncate cursor-pointer"
                                title={booking.coupleName}
                              >
                                {booking.coupleName}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Bookings List */}
          <div className="lg:col-span-1">
            <Card className="border-[#F4E4C1]">
              <CardHeader>
                <CardTitle className="text-sm">Booking Mendatang</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredBookings
                    .filter(booking => new Date(booking.date) >= new Date())
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 10)
                    .map(booking => (
                      <div
                        key={booking.id}
                        onClick={() => handleBookingClick(booking)}
                        className="p-3 border border-[#F4E4C1] rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm">{booking.coupleName}</p>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{booking.venueName}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {new Date(booking.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })} • {booking.time}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <Card className="border-[#F4E4C1] mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Ringkasan Bulan Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20 rounded-lg">
                    <span className="text-sm text-gray-600">Total Booking</span>
                    <span className="text-[#D4AF37]">
                      {filteredBookings.filter(b => {
                        const bookingDate = new Date(b.date);
                        return bookingDate.getMonth() === currentDate.getMonth() &&
                               bookingDate.getFullYear() === currentDate.getFullYear();
                      }).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20 rounded-lg">
                    <span className="text-sm text-gray-600">Confirmed</span>
                    <span className="text-green-600">
                      {filteredBookings.filter(b => {
                        const bookingDate = new Date(b.date);
                        return b.status === 'confirmed' &&
                               bookingDate.getMonth() === currentDate.getMonth() &&
                               bookingDate.getFullYear() === currentDate.getFullYear();
                      }).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20 rounded-lg">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-yellow-600">
                      {filteredBookings.filter(b => {
                        const bookingDate = new Date(b.date);
                        return b.status === 'pending' &&
                               bookingDate.getMonth() === currentDate.getMonth() &&
                               bookingDate.getFullYear() === currentDate.getFullYear();
                      }).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detail Booking</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang booking ini
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="mb-1">{selectedBooking.coupleName}</h3>
                  <p className="text-sm text-gray-600">{selectedBooking.venueName}</p>
                </div>
                {getStatusBadge(selectedBooking.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#F4E4C1]/20 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Tanggal</p>
                  <p className="text-sm">
                    {new Date(selectedBooking.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="p-3 bg-[#FFE4E9]/20 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Waktu</p>
                  <p className="text-sm">{selectedBooking.time} WIB</p>
                </div>
                <div className="p-3 bg-[#F4E4C1]/20 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Jumlah Tamu</p>
                  <p className="text-sm flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {selectedBooking.guests} orang
                  </p>
                </div>
                <div className="p-3 bg-[#FFE4E9]/20 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Total Pembayaran</p>
                  <p className="text-sm text-[#D4AF37]">{selectedBooking.amount}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#F4E4C1]">
                <h4 className="text-sm">Informasi Kontak</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{selectedBooking.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{selectedBooking.email}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                  onClick={() => setShowDetailDialog(false)}
                >
                  Tutup
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
                >
                  Hubungi Client
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
