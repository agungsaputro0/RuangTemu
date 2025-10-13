import { useState } from 'react';
import { ArrowLeft, Upload, MapPin, Phone, Mail, Users, DollarSign, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VenueEditPageProps {
  venueId: number;
  onBack: () => void;
}

export function VenueEditPage({ venueId, onBack }: VenueEditPageProps) {
  // Mock venue data based on venueId
  const venueData = {
    1: {
      id: 1,
      name: 'Grand Ballroom Elegance',
      location: 'Jl. Sudirman No. 123, Jakarta Pusat',
      description: 'Ballroom mewah dengan kapasitas besar dan fasilitas lengkap. Dilengkapi dengan sound system profesional, dekorasi elegan, dan catering berkualitas tinggi.',
      capacity: '200-500 tamu',
      price: '25000000',
      contactPhone: '+62 812 3456 7890',
      contactEmail: 'info@grandballroom.com',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    2: {
      id: 2,
      name: 'Royal Garden Venue',
      location: 'BSD City, Tangerang',
      description: 'Venue outdoor dengan konsep taman yang indah. Cocok untuk pernikahan dengan tema garden dan natural. Dilengkapi dengan gazebo, kolam hias, dan area foto instagramable.',
      capacity: '150-300 tamu',
      price: '18000000',
      contactPhone: '+62 821 9876 5432',
      contactEmail: 'info@royalgarden.com',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaGFwcHl8ZW58MXx8fHwxNzU5OTc1ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  };

  const initialData = venueData[venueId as keyof typeof venueData] || venueData[1];

  const [formData, setFormData] = useState({
    name: initialData.name,
    location: initialData.location,
    description: initialData.description,
    capacity: initialData.capacity,
    price: initialData.price,
    contactPhone: initialData.contactPhone,
    contactEmail: initialData.contactEmail,
    status: initialData.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Perubahan venue berhasil disimpan!');
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="mb-4 hover:bg-[#F4E4C1]/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
          <h1 className="mb-2">Edit Venue</h1>
          <p className="text-gray-600">Perbarui informasi venue Anda</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Preview */}
          <div className="lg:col-span-1">
            <Card className="border-[#F4E4C1] sticky top-4">
              <CardHeader>
                <CardTitle className="text-sm">Preview Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={initialData.image}
                      alt={formData.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm mb-2">{formData.name}</h3>
                    <div className="flex items-start gap-2 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{formData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Users className="w-3 h-3" />
                      <span>{formData.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <DollarSign className="w-3 h-3 text-[#D4AF37]" />
                      <span className="text-[#D4AF37]">
                        Rp {(parseInt(formData.price) / 1000000).toFixed(0)}jt
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-[#F4E4C1]">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="mb-4 pb-2 border-b border-[#F4E4C1]">Informasi Dasar</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nama Venue *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Contoh: Grand Ballroom Elegance"
                          required
                          className="mt-2 border-[#F4E4C1]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Lokasi Lengkap *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
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
                          onChange={(e) => handleChange('description', e.target.value)}
                          placeholder="Deskripsikan venue Anda secara detail..."
                          rows={5}
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
                            onChange={(e) => handleChange('capacity', e.target.value)}
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
                            onChange={(e) => handleChange('price', e.target.value)}
                            placeholder="25000000"
                            required
                            className="mt-2 border-[#F4E4C1]"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="status">Status Venue *</Label>
                        <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                          <SelectTrigger className="mt-2 border-[#F4E4C1]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="inactive">Tidak Aktif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="mb-4 pb-2 border-b border-[#F4E4C1]">Informasi Kontak</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Nomor Telepon *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => handleChange('contactPhone', e.target.value)}
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
                          onChange={(e) => handleChange('contactEmail', e.target.value)}
                          placeholder="venue@example.com"
                          required
                          className="mt-2 border-[#F4E4C1]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Images */}
                  <div>
                    <h3 className="mb-4 pb-2 border-b border-[#F4E4C1]">Foto Venue</h3>
                    <div className="border-2 border-dashed border-[#F4E4C1] rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-[#D4AF37]" />
                      <p className="text-gray-600 mb-2">Drag & drop foto atau klik untuk upload</p>
                      <p className="text-sm text-gray-500 mb-4">Upload minimal 5 foto (Max 10MB per file)</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                      >
                        Pilih Foto
                      </Button>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 justify-end pt-4 border-t border-[#F4E4C1]">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onBack}
                      className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
