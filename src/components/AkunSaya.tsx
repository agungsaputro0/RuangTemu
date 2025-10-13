import { User, Heart, FileText, Gift, Settings, Bell, CreditCard, LogOut, Award, Calendar, Building2, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const bookingHistory = [
  {
    id: 1,
    venueName: 'Grand Ballroom Elegance',
    date: '15 Desember 2025',
    status: 'confirmed',
    amount: 'Rp 67.500.000',
    type: 'upcoming',
  },
  {
    id: 2,
    venueName: 'Royal Garden Venue',
    date: '10 November 2025',
    status: 'completed',
    amount: 'Rp 45.000.000',
    type: 'past',
  },
  {
    id: 3,
    venueName: 'Luxury Hotel Ballroom',
    date: '5 Oktober 2025',
    status: 'completed',
    amount: 'Rp 85.000.000',
    type: 'past',
  },
];

const wishlist = [
  {
    id: 1,
    venueName: 'Romantic Restaurant Hall',
    location: 'BSD City',
    price: 'Rp 12.000.000',
    image: 'https://images.unsplash.com/photo-1680079033123-e5b22be5c523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk5NzU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    venueName: 'Modern Reception Hall',
    location: 'Jakarta Barat',
    price: 'Rp 20.000.000',
    image: 'https://images.unsplash.com/photo-1759477274116-e3cb02d2b9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwaGFsbHxlbnwxfHx8fDE3NTk5NzU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function AkunSaya() {
  const { user } = useAuth();
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: 'Dikonfirmasi', className: 'bg-[#F4E4C1] text-[#B8941F]' },
      completed: { label: 'Selesai', className: 'bg-green-100 text-green-600' },
      pending: { label: 'Pending', className: 'bg-gray-100 text-gray-600' },
      cancelled: { label: 'Dibatalkan', className: 'bg-red-100 text-red-600' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={`${config.className} border-0`}>{config.label}</Badge>;
  };

  const handleReviewSubmit = () => {
    if (rating === 0) {
      toast.error('Mohon pilih rating terlebih dahulu');
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Mohon isi review Anda');
      return;
    }
    toast.success('Review berhasil dikirim! Terima kasih atas feedback Anda.');
    setShowReviewDialog(false);
    setRating(0);
    setReviewText('');
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Akun Saya</h1>
          <p className="text-gray-600">Kelola profil dan pengaturan akun Anda</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Profile */}
          <div className="lg:col-span-1">
            <Card className="border-[#F4E4C1] shadow-lg">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] text-white">
                    {user?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mb-1">{user?.name || 'User'}</h3>
                <p className="text-sm text-gray-600 mb-4">{user?.email || 'user@email.com'}</p>
                <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white border-0 mb-4">
                  {user?.role === 'vendor' ? (
                    <>
                      <Building2 className="w-3 h-3 mr-1" />
                      Vendor Account
                    </>
                  ) : (
                    <>
                      <Award className="w-3 h-3 mr-1" />
                      Calon Pengantin
                    </>
                  )}
                </Badge>
                <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30">
                  Edit Profil
                </Button>
              </CardContent>
            </Card>

            {/* Reward Points */}
            <Card className="mt-4 border-[#F4E4C1] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reward Points</p>
                    <p className="text-[#D4AF37]">2,450 pts</p>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white">
                  Tukar Poin
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-[#FFE4E9]/30 p-1 w-full grid grid-cols-4">
                <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#FFB6C1] data-[state=active]:text-white">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </TabsTrigger>
                <TabsTrigger value="bookings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#FFB6C1] data-[state=active]:text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Booking
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#FFB6C1] data-[state=active]:text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#FFB6C1] data-[state=active]:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Pengaturan
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="border-[#F4E4C1]">
                  <CardHeader>
                    <CardTitle>Informasi Profil</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Nama Lengkap</Label>
                        <Input
                          defaultValue="Sarah Wijaya"
                          className="mt-2 border-[#F4E4C1]"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          defaultValue="sarah.wijaya@email.com"
                          className="mt-2 border-[#F4E4C1]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Nomor Telepon</Label>
                        <Input
                          type="tel"
                          defaultValue="+62 812 3456 7890"
                          className="mt-2 border-[#F4E4C1]"
                        />
                      </div>
                      <div>
                        <Label>Tanggal Lahir</Label>
                        <Input
                          type="date"
                          defaultValue="1995-06-15"
                          className="mt-2 border-[#F4E4C1]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Alamat</Label>
                      <Input
                        defaultValue="Jl. Sudirman No. 123, Jakarta Selatan"
                        className="mt-2 border-[#F4E4C1]"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30">
                        Batal
                      </Button>
                      <Button className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white">
                        Simpan Perubahan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <Card className="border-[#F4E4C1]">
                  <CardHeader>
                    <CardTitle>Riwayat Booking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookingHistory.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 border border-[#F4E4C1] rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-sm">{booking.venueName}</h4>
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <Calendar className="w-4 h-4 text-[#D4AF37]" />
                              {booking.date}
                            </div>
                            <p className="text-sm text-[#D4AF37]">{booking.amount}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30">
                              <FileText className="w-4 h-4 mr-1" />
                              Detail
                            </Button>
                            {booking.status === 'confirmed' && (
                              <Button size="sm" className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white">
                                Kelola
                              </Button>
                            )}
                            {booking.status === 'completed' && user?.role === 'couple' && (
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setShowReviewDialog(true);
                                }}
                                className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white"
                              >
                                <Star className="w-4 h-4 mr-1" />
                                Tulis Review
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card className="border-[#F4E4C1]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#FFB6C1]" />
                      Venue Favorit Saya
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="border border-[#F4E4C1] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="h-40 bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.venueName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="text-sm mb-2">{item.venueName}</h4>
                            <p className="text-sm text-gray-600 mb-3">{item.location}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-[#D4AF37]">{item.price}</span>
                              <Button size="sm" className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white">
                                Lihat Detail
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="border-[#F4E4C1]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-[#D4AF37]" />
                      Notifikasi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 hover:bg-[#FFE4E9]/30 rounded-lg transition-colors">
                      <div>
                        <p className="text-sm mb-1">Email Notifikasi</p>
                        <p className="text-xs text-gray-600">
                          Terima update booking dan promo via email
                        </p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-[#FFE4E9]/30 rounded-lg transition-colors">
                      <div>
                        <p className="text-sm mb-1">Push Notification</p>
                        <p className="text-xs text-gray-600">
                          Notifikasi langsung di perangkat Anda
                        </p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-[#FFE4E9]/30 rounded-lg transition-colors">
                      <div>
                        <p className="text-sm mb-1">Promo & Penawaran</p>
                        <p className="text-xs text-gray-600">
                          Dapatkan info promo terbaru
                        </p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#F4E4C1]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                      Metode Pembayaran
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-[#F4E4C1] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] rounded flex items-center justify-center text-white text-xs">
                            VISA
                          </div>
                          <div>
                            <p className="text-sm">•••• •••• •••• 4242</p>
                            <p className="text-xs text-gray-600">Exp: 12/25</p>
                          </div>
                        </div>
                        <Badge className="bg-[#F4E4C1] text-[#B8941F] border-0">Default</Badge>
                      </div>
                      <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30">
                        + Tambah Kartu Baru
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#F4E4C1]">
                  <CardHeader>
                    <CardTitle>Keamanan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30">
                      Ubah Password
                    </Button>
                    <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Tulis Review untuk {selectedBooking?.venueName}</DialogTitle>
            <DialogDescription>
              Bagikan pengalaman Anda untuk membantu calon pengantin lainnya
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Rating */}
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? 'fill-[#D4AF37] text-[#D4AF37]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600">
                  {rating === 5 && 'Luar biasa!'}
                  {rating === 4 && 'Sangat baik'}
                  {rating === 3 && 'Baik'}
                  {rating === 2 && 'Cukup'}
                  {rating === 1 && 'Kurang memuaskan'}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <Label htmlFor="reviewText">Review Anda</Label>
              <Textarea
                id="reviewText"
                placeholder="Ceritakan pengalaman Anda menggunakan venue ini..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={5}
                className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
              />
            </div>

            {/* Event Details */}
            <div className="bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>{selectedBooking?.date}</span>
              </div>
              <p className="text-sm text-[#D4AF37]">{selectedBooking?.amount}</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowReviewDialog(false);
                setRating(0);
                setReviewText('');
                setSelectedBooking(null);
              }}
            >
              Batal
            </Button>
            <Button
              onClick={handleReviewSubmit}
              className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Kirim Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
