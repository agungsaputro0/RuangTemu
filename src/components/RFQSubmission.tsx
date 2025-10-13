import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  MapPin,
  Check,
  Sparkles,
  Send,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface RFQSubmissionProps {
  bookingData: any;
  onBack: () => void;
  onSubmit: (rfqData: any) => void;
}

export function RFQSubmission({ bookingData, onBack, onSubmit }: RFQSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitRFQ = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const rfqData = {
      rfqId: `RFQ-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      estimatedResponse: '< 1 jam',
    };

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Show success toast
    toast.success('Request for Quotation berhasil dikirim!', {
      description: 'Vendor akan merespons permintaan Anda dalam waktu < 1 jam',
    });

    // Wait a bit then submit
    setTimeout(() => {
      onSubmit(rfqData);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-[#F4E4C1]">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="mb-3">RFQ Berhasil Dikirim!</h2>
            <p className="text-gray-600 mb-6">
              Permintaan penawaran Anda telah dikirim ke <span className="text-[#D4AF37]">{bookingData.venue.name}</span>. 
              Vendor akan merespons dalam waktu kurang dari 1 jam.
            </p>
            
            <div className="p-4 bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Nomor RFQ Anda</p>
              <p className="text-[#D4AF37]">RFQ-{Date.now()}</p>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Notifikasi telah dikirim ke vendor</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Anda akan mendapat email konfirmasi</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Chat room telah disiapkan untuk negosiasi</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Sedang mengarahkan Anda ke halaman negosiasi...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="mb-2">Review & Kirim Permintaan Penawaran</h2>
            <p className="text-gray-600">
              Periksa kembali detail pemesanan Anda sebelum mengirim permintaan ke vendor
            </p>
          </div>

          {/* Venue Info */}
          <Card className="border-[#F4E4C1] overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-1 h-48 md:h-auto">
                <ImageWithFallback
                  src={bookingData.venue.images[0]}
                  alt={bookingData.venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-2 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="mb-1">{bookingData.venue.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{bookingData.venue.location}</span>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{bookingData.venue.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Response &lt; 1 jam</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Event Details */}
          <Card className="border-[#F4E4C1]">
            <CardContent className="p-6">
              <h4 className="mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                Detail Acara
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Nama Acara</p>
                  <p>{bookingData.eventName}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Tanggal & Waktu</p>
                  <p>
                    {new Date(bookingData.eventDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                    - {bookingData.eventTime}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Jumlah Tamu</p>
                  <p>{bookingData.guestCount} orang</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Paket Dipilih</p>
                  <p>{bookingData.selectedPackage.name}</p>
                </div>
              </div>
              {bookingData.notes && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <p className="text-gray-600 mb-1 text-sm">Catatan Tambahan</p>
                    <p className="text-sm">{bookingData.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Selected Package */}
          <Card className="border-[#F4E4C1]">
            <CardContent className="p-6">
              <h4 className="mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#D4AF37]" />
                Paket & Layanan
              </h4>
              
              {/* Main Package */}
              <div className="p-4 bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h5>{bookingData.selectedPackage.name}</h5>
                  <p className="text-[#D4AF37]">
                    Rp {bookingData.selectedPackage.price.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="space-y-1">
                  {bookingData.selectedPackage.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {bookingData.selectedAddOns && bookingData.selectedAddOns.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">Layanan Tambahan:</p>
                  <div className="space-y-2">
                    {bookingData.selectedAddOns.map((addOn: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm p-3 border border-[#F4E4C1] rounded-lg"
                      >
                        <span>{addOn.name}</span>
                        <span className="text-[#D4AF37]">
                          Rp {addOn.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="border-[#D4AF37] bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20">
            <CardContent className="p-6">
              <h4 className="mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                Total Estimasi Biaya
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Paket {bookingData.selectedPackage.name}</span>
                  <span>Rp {bookingData.selectedPackage.price.toLocaleString('id-ID')}</span>
                </div>
                {bookingData.selectedAddOns?.map((addOn: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm text-gray-600">
                    <span>{addOn.name}</span>
                    <span>Rp {addOn.price.toLocaleString('id-ID')}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Grand Total</span>
                  <span className="text-[#D4AF37]">
                    Rp {bookingData.totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  * Harga di atas adalah estimasi. Harga final akan dikonfirmasi oleh vendor setelah
                  negosiasi.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h5 className="mb-3 text-blue-900">Penting untuk Diketahui:</h5>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>
                    Setelah mengirim RFQ, vendor akan menghubungi Anda dalam waktu &lt; 1 jam untuk
                    konfirmasi dan negosiasi harga.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>
                    Anda dapat melakukan negosiasi harga dan detail layanan melalui fitur chat dengan
                    vendor.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>
                    Setelah kesepakatan tercapai, kontrak digital akan dibuat otomatis untuk
                    ditandatangani kedua belah pihak.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>
                    Pembayaran dapat dilakukan dengan berbagai metode: DP, cicilan, atau lunas dengan
                    berbagai payment gateway.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleSubmitRFQ}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white h-12"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Mengirim RFQ...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Kirim Permintaan Penawaran (RFQ)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}