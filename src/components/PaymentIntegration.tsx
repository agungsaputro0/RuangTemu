import { useState } from 'react';
import { X, CreditCard, Building2, Wallet, QrCode, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

interface PaymentIntegrationProps {
  venueName: string;
  totalAmount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentIntegration({ venueName, totalAmount, onClose, onSuccess }: PaymentIntegrationProps) {
  const [paymentMethod, setPaymentMethod] = useState<'full' | 'dp' | 'installment'>('dp');
  const [selectedGateway, setSelectedGateway] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [installmentMonths, setInstallmentMonths] = useState(3);
  
  const calculatePayment = () => {
    switch (paymentMethod) {
      case 'full':
        return { amount: totalAmount, description: 'Pembayaran Penuh' };
      case 'dp':
        return { amount: totalAmount * 0.3, description: 'DP 30% (Sisa akan dibayar H-7)' };
      case 'installment':
        return {
          amount: totalAmount / installmentMonths,
          description: `Cicilan ${installmentMonths}x pembayaran`,
        };
      default:
        return { amount: 0, description: '' };
    }
  };

  const handlePayment = async () => {
    if (!selectedGateway) {
      toast.error('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    toast.success('Pembayaran berhasil! Kontrak akan segera diproses.');
    onSuccess();
  };

  const payment = calculatePayment();

  const paymentGateways = [
    { id: 'bca', name: 'BCA Virtual Account', icon: Building2, fee: 4000 },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: Building2, fee: 4000 },
    { id: 'gopay', name: 'GoPay', icon: Wallet, fee: 0 },
    { id: 'ovo', name: 'OVO', icon: Wallet, fee: 0 },
    { id: 'dana', name: 'DANA', icon: Wallet, fee: 0 },
    { id: 'qris', name: 'QRIS', icon: QrCode, fee: 0 },
    { id: 'cc', name: 'Credit Card', icon: CreditCard, fee: totalAmount * 0.029 },
  ];

  const selectedGatewayObj = paymentGateways.find(g => g.id === selectedGateway);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[#D4AF37]">Pembayaran</h2>
          <p className="text-sm text-gray-600 mt-1">{venueName}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Payment Options */}
          <div className="space-y-6">
            <div>
              <Label className="mb-3 block">Pilih Metode Pembayaran</Label>
              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="space-y-3">
                  <div
                    className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'full'
                        ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                        : 'border-gray-200 hover:border-[#FFB6C1]'
                    }`}
                    onClick={() => setPaymentMethod('full')}
                  >
                    <RadioGroupItem value="full" id="full" />
                    <div className="flex-1">
                      <Label htmlFor="full" className="cursor-pointer">
                        Pembayaran Penuh
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Rp {totalAmount.toLocaleString('id-ID')}
                      </p>
                      <p className="text-xs text-green-600 mt-1">💎 Diskon 5% untuk pembayaran penuh</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'dp'
                        ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                        : 'border-gray-200 hover:border-[#FFB6C1]'
                    }`}
                    onClick={() => setPaymentMethod('dp')}
                  >
                    <RadioGroupItem value="dp" id="dp" />
                    <div className="flex-1">
                      <Label htmlFor="dp" className="cursor-pointer">
                        Down Payment (DP) 30%
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Rp {(totalAmount * 0.3).toLocaleString('id-ID')}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Sisa Rp {(totalAmount * 0.7).toLocaleString('id-ID')} dibayar H-7 acara
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'installment'
                        ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                        : 'border-gray-200 hover:border-[#FFB6C1]'
                    }`}
                    onClick={() => setPaymentMethod('installment')}
                  >
                    <RadioGroupItem value="installment" id="installment" />
                    <div className="flex-1">
                      <Label htmlFor="installment" className="cursor-pointer flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Pembayaran Cicilan
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Rp {(totalAmount / installmentMonths).toLocaleString('id-ID')} / bulan
                      </p>
                      {paymentMethod === 'installment' && (
                        <div className="mt-3">
                          <Label className="text-xs">Pilih Tenor:</Label>
                          <select
                            value={installmentMonths}
                            onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                            className="w-full mt-1 p-2 border rounded-lg text-sm"
                          >
                            <option value={3}>3 Bulan</option>
                            <option value={6}>6 Bulan</option>
                            <option value={12}>12 Bulan</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Gateway Selection */}
            <div>
              <Label className="mb-3 block">Pilih Metode Pembayaran</Label>
              <div className="grid grid-cols-2 gap-2">
                {paymentGateways.map((gateway) => {
                  const Icon = gateway.icon;
                  return (
                    <button
                      key={gateway.id}
                      onClick={() => setSelectedGateway(gateway.id)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                        selectedGateway === gateway.id
                          ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                          : 'border-gray-200 hover:border-[#FFB6C1]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${selectedGateway === gateway.id ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                      <span className={`text-xs ${selectedGateway === gateway.id ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
                        {gateway.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30 rounded-xl p-6 border-2 border-[#F4E4C1]">
              <h3 className="text-[#D4AF37] mb-4">Ringkasan Pembayaran</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Venue</span>
                  <span>{venueName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Harga</span>
                  <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Metode</span>
                  <span className="text-right">{payment.description}</span>
                </div>
                {paymentMethod === 'full' && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Diskon 5%</span>
                    <span>- Rp {(totalAmount * 0.05).toLocaleString('id-ID')}</span>
                  </div>
                )}
                 {selectedGatewayObj && selectedGatewayObj.fee > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Biaya Admin</span>
                      <span>Rp {selectedGatewayObj.fee.toLocaleString('id-ID')}</span>
                    </div>
                  )}
              </div>

              <div className="border-t-2 border-[#D4AF37] pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#D4AF37]">Total Bayar Sekarang</span>
                  <span className="text-[#D4AF37]">
                    Rp {(paymentMethod === 'full' ? payment.amount * 0.95 : payment.amount).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 mb-4 text-xs text-gray-600 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <p>Pembayaran aman dengan enkripsi SSL</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <p>Kontrak digital akan dikirim setelah pembayaran</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <p>Refund 100% jika venue membatalkan</p>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!selectedGateway || processing}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:from-[#B8941F] hover:to-[#FF9EAF] text-white"
              >
                {processing ? 'Memproses Pembayaran...' : 'Bayar Sekarang'}
              </Button>

              <p className="text-center text-xs text-gray-500 mt-3">
                Dengan melanjutkan, Anda menyetujui <a href="#" className="text-[#D4AF37] underline">Syarat & Ketentuan</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
