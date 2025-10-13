import { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Upload, 
  DollarSign, 
  BarChart3, 
  Calendar,
  Star,
  Users,
  Edit,
  Trash2,
  Plus,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

const mockVenues = [
  {
    id: 1,
    name: 'Grand Ballroom Elegance',
    location: 'Jl. Sudirman No. 123, Jakarta Pusat',
    capacity: '200-500 tamu',
    price: 25000000,
    image: 'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviews: 127,
    bookings: 23,
    views: 2847,
    status: 'active',
  },
  {
    id: 2,
    name: 'Royal Garden Venue',
    location: 'BSD City, Tangerang',
    capacity: '150-300 tamu',
    price: 18000000,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaGFwcHl8ZW58MXx8fHwxNzU5OTc1ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviews: 89,
    bookings: 15,
    views: 1920,
    status: 'active',
  },
];

interface VendorCenterProps {
  onViewVenueDetail?: (venueId: number) => void;
  onEditVenue?: (venueId: number) => void;
  onViewBookingCalendar?: () => void;
  onNavigateToChat?: () => void;
}

export function VendorCenter({ 
  onViewVenueDetail, 
  onEditVenue,
  onViewBookingCalendar,
  onNavigateToChat,
}: VendorCenterProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);

  const handleDeleteVenue = () => {
    toast.success(`Venue "${selectedVenue?.name}" berhasil dihapus`);
    setShowDeleteDialog(false);
    setSelectedVenue(null);
  };

  if (showUploadForm) {
    return <UploadVenueForm onBack={() => setShowUploadForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Dashboard Vendor</h1>
            <p className="text-gray-600">Kelola venue dan pantau performa bisnis Anda</p>
          </div>
          <Button
            onClick={() => setShowUploadForm(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Upload Venue Baru
          </Button>
        </div>

        {/* Performance Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#F4E4C1]/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-600 border-0">+12%</Badge>
              </div>
              <p className="text-3xl mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                4,767
              </p>
              <p className="text-sm text-gray-600">Total Views Bulan Ini</p>
            </CardContent>
          </Card>

          <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#FFE4E9]/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-600 border-0">+5</Badge>
              </div>
              <p className="text-3xl mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                38
              </p>
              <p className="text-sm text-gray-600">Total Booking Aktif</p>
            </CardContent>
          </Card>

          <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#F4E4C1]/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-600 border-0">+18%</Badge>
              </div>
              <p className="text-xl mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                Rp 850jt
              </p>
              <p className="text-sm text-gray-600">Pendapatan Bulan Ini</p>
            </CardContent>
          </Card>

          <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#FFE4E9]/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-[#F4E4C1] text-[#B8941F] border-0">4.8/5</Badge>
              </div>
              <p className="text-3xl mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                216
              </p>
              <p className="text-sm text-gray-600">Total Review</p>
            </CardContent>
          </Card>
        </div>

        {/* Venue List */}
        <Card className="border-[#F4E4C1]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="w-5 h-5 text-[#D4AF37]" />
              Daftar Venue Anda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVenues.map((venue) => (
                <Card key={venue.id} className="border-[#F4E4C1]/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Venue Image */}
                      <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={venue.image}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Venue Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="mb-1">{venue.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <MapPin className="w-4 h-4" />
                              {venue.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              {venue.capacity}
                            </div>
                          </div>
                          <Badge 
                            className={
                              venue.status === 'active' 
                                ? 'bg-green-100 text-green-600 border-0' 
                                : 'bg-gray-100 text-gray-600 border-0'
                            }
                          >
                            {venue.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-3">
                          <div className="bg-[#F4E4C1]/20 rounded-lg p-2">
                            <p className="text-xs text-gray-600 mb-1">Harga</p>
                            <p className="text-sm text-[#D4AF37]">
                              Rp {(venue.price / 1000000).toFixed(0)}jt
                            </p>
                          </div>
                          <div className="bg-[#FFE4E9]/20 rounded-lg p-2">
                            <p className="text-xs text-gray-600 mb-1">Views</p>
                            <p className="text-sm">{venue.views.toLocaleString()}</p>
                          </div>
                          <div className="bg-[#F4E4C1]/20 rounded-lg p-2">
                            <p className="text-xs text-gray-600 mb-1">Booking</p>
                            <p className="text-sm">{venue.bookings}</p>
                          </div>
                          <div className="bg-[#FFE4E9]/20 rounded-lg p-2">
                            <p className="text-xs text-gray-600 mb-1">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                              <p className="text-sm">{venue.rating}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewVenueDetail?.(venue.id)}
                            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat Detail
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEditVenue?.(venue.id)}
                            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedVenue(venue);
                              setShowDeleteDialog(true);
                            }}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="border-[#F4E4C1]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
                Pesan & Inquiry Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Sarah Wijaya', venue: 'Grand Ballroom Elegance', time: '2 jam lalu', unread: true },
                  { name: 'Michael Chen', venue: 'Royal Garden Venue', time: '5 jam lalu', unread: true },
                  { name: 'Diana Putri', venue: 'Grand Ballroom Elegance', time: '1 hari lalu', unread: false },
                ].map((msg, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => onNavigateToChat?.()}
                    className="flex items-start justify-between p-3 border border-[#F4E4C1] rounded-lg hover:bg-[#FFE4E9]/10 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm mb-1">{msg.name}</p>
                      <p className="text-xs text-gray-600">{msg.venue}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">{msg.time}</p>
                      {msg.unread && (
                        <Badge className="bg-[#FFB6C1] text-white border-0 text-xs">Baru</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => onNavigateToChat?.()}
                className="w-full mt-4 border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
              >
                Lihat Semua Pesan
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#F4E4C1]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                Booking Mendatang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { couple: 'Sarah & Ahmad', venue: 'Grand Ballroom', date: '15 Des 2025', amount: 'Rp 67.5jt' },
                  { couple: 'Diana & Budi', venue: 'Royal Garden', date: '22 Des 2025', amount: 'Rp 45jt' },
                  { couple: 'Lisa & Ryan', venue: 'Grand Ballroom', date: '30 Des 2025', amount: 'Rp 75jt' },
                ].map((booking, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 border border-[#F4E4C1] rounded-lg">
                    <div>
                      <p className="text-sm mb-1">{booking.couple}</p>
                      <p className="text-xs text-gray-600 mb-1">{booking.venue}</p>
                      <p className="text-xs text-[#D4AF37]">{booking.amount}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-[#F4E4C1] text-[#B8941F] border-0">
                        {booking.date}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => onViewBookingCalendar?.()}
                className="w-full mt-4 border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
              >
                Lihat Semua Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Venue</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus venue "{selectedVenue?.name}"? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Batal
            </Button>
            <Button
              onClick={handleDeleteVenue}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Upload Venue Form Component
function UploadVenueForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    capacity: '',
    price: '',
    contactPhone: '',
    contactEmail: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Venue berhasil diupload! Tim kami akan melakukan verifikasi dalam 1-2 hari kerja.');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Kembali ke Dashboard
          </Button>
          <h1 className="mb-2">Upload Venue Baru</h1>
          <p className="text-gray-600">Lengkapi informasi venue untuk ditampilkan di platform</p>
        </div>

        <Card className="border-[#F4E4C1]">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="mb-4">Informasi Dasar</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Venue *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Grand Ballroom Elegance"
                      required
                      className="mt-2 border-[#F4E4C1]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Lokasi *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Jl. Sudirman No. 123, Jakarta"
                      required
                      className="mt-2 border-[#F4E4C1]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi Venue *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Deskripsikan venue Anda..."
                      rows={4}
                      required
                      className="mt-2 border-[#F4E4C1]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Kapasitas Tamu *</Label>
                      <Input
                        id="capacity"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        placeholder="200-500 tamu"
                        required
                        className="mt-2 border-[#F4E4C1]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Harga Sewa (Rp) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="25000000"
                        required
                        className="mt-2 border-[#F4E4C1]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="mb-4">Informasi Kontak</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+62 812 3456 7890"
                      required
                      className="mt-2 border-[#F4E4C1]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="venue@example.com"
                      required
                      className="mt-2 border-[#F4E4C1]"
                    />
                  </div>
                </div>
              </div>

              {/* Upload Images */}
              <div>
                <h3 className="mb-4">Foto Venue</h3>
                <div className="border-2 border-dashed border-[#F4E4C1] rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-[#D4AF37]" />
                  <p className="text-gray-600 mb-2">Drag & drop foto atau klik untuk upload</p>
                  <p className="text-sm text-gray-500">Upload minimal 5 foto (Max 10MB per file)</p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4 border-[#D4AF37] text-[#D4AF37]"
                  >
                    Pilih Foto
                  </Button>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="border-[#D4AF37] text-[#D4AF37]"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Venue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
