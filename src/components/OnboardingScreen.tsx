import { useState } from 'react';
import { ChevronRight, Sparkles, Shield, CreditCard, MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Sparkles,
    title: 'Selamat Datang di Ruang Temu',
    description: 'Platform #1 untuk menemukan venue lamaran dan pernikahan impian Anda dengan mudah dan aman',
    tagline: '#SeMudahItu, #SeAmanItu',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaGFwcHl8ZW58MXx8fHwxNzU5OTc1ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Sparkles,
    title: 'AI Matchmaker Cerdas',
    description: 'Teknologi AI kami akan merekomendasikan venue yang sempurna sesuai preferensi dan budget Anda',
    tagline: 'Temukan venue impian dalam hitungan menit',
    image: 'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Shield,
    title: 'Kontrak Digital Aman',
    description: 'Semua transaksi dilindungi dengan kontrak digital dan e-signature legal untuk keamanan maksimal',
    tagline: 'Transparansi dan keamanan terjamin',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY29udHJhY3QlMjBzaWduaW5nfGVufDF8fHx8MTc1OTk3NTg5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: CreditCard,
    title: 'Pembayaran Fleksibel',
    description: 'Bayar dengan DP, cicilan, atau lunas dengan berbagai pilihan payment gateway yang aman',
    tagline: 'Sesuaikan dengan kemampuan Anda',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwY2FyZCUyMG9ubGluZXxlbnwxfHx8fDE3NTk5NzU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: MessageCircle,
    title: 'Chat & Negosiasi Langsung',
    description: 'Berkomunikasi langsung dengan vendor untuk negosiasi harga dan diskusi detail acara Anda',
    tagline: 'Komunikasi mudah, transaksi cepat',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0JTIwY29udmVyc2F0aW9uJTIwcGhvbmV8ZW58MXx8fHwxNzU5OTc1ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Close/Skip Button */}
      <Button
        variant="ghost"
        onClick={handleSkip}
        className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900"
      >
        <X className="w-5 h-5 mr-2" />
        Lewati
      </Button>

      <div className="h-full flex flex-col">
        {/* Image Section */}
        <div className="h-1/2 relative overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 to-[#FFB6C1]/10">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="h-1/2 flex flex-col justify-between p-8">
          <div className="text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h1 className="mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
              {step.title}
            </h1>

            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#FFB6C1]/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-gray-700">{step.tagline}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 max-w-md mx-auto">
              {step.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            {/* Progress Dots */}
            <div className="flex justify-center gap-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1]'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
            >
              {currentStep === onboardingSteps.length - 1 ? (
                'Mulai Sekarang'
              ) : (
                <>
                  Lanjut
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}