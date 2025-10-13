import { useState } from 'react';
import { X, Heart, Building2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'couple' | 'vendor'>('couple');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password, selectedRole);
        toast.success('Login berhasil! Selamat datang di Ruang Temu');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Password tidak cocok');
          setLoading(false);
          return;
        }
        await register(formData.name, formData.email, formData.password, selectedRole);
        toast.success('Registrasi berhasil! Akun Anda telah dibuat');
      }
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Variants animasi slide + fade kecil agar tidak keluar modal
  const formVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="max-h-[100dvh] bg-white rounded-2xl max-w-md w-full p-6 relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo + Heading */}
        <div className="text-center mb-4 mt-4">
          <div className="w-15 h-10 mx-auto mb-3 flex items-center justify-center">
            <img
              src="/assets/img/logo-icon.png"
              alt="Ruang Temu Logo"
              className="h-10 w-15"
            />
          </div>
          <h2 className="text-[#D4AF37]">{isLogin ? 'Selamat Datang Kembali' : 'Daftar Akun Baru'}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {isLogin ? 'Masuk untuk melanjutkan' : 'Bergabung dengan Ruang Temu'}
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <Label className="mb-3 block text-center text-gray-700">Saya adalah:</Label>
          <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedRole('couple')}
            className={`py-2 px-4 rounded-xl border-2 transition-all ${
              selectedRole === 'couple'
                ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                : 'border-gray-200 hover:border-[#FFB6C1]'
            }`}
          >
            <Heart className={`w-5 h-5 mx-auto mb-1 ${selectedRole === 'couple' ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
            <p className={`text-sm ${selectedRole === 'couple' ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
              Calon Pengantin
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('vendor')}
            className={`py-2 px-4 rounded-xl border-2 transition-all ${
              selectedRole === 'vendor'
                ? 'border-[#D4AF37] bg-gradient-to-br from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                : 'border-gray-200 hover:border-[#FFB6C1]'
            }`}
          >
            <Building2 className={`w-5 h-5 mx-auto mb-1 ${selectedRole === 'vendor' ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
            <p className={`text-sm ${selectedRole === 'vendor' ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
              Penyedia Venue
            </p>
          </button>
        </div>
        </div>

        {/* Demo Login */}
        <AnimatePresence mode="wait">
          {isLogin && (
            <motion.div
              key="demo-login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 bg-gradient-to-r from-[#F4E4C1]/20 to-[#FFE4E9]/20 rounded-lg border border-[#F4E4C1]"
            >
              <p className="text-xs text-gray-600 mb-2 text-center">Demo Login (Klik untuk autofill):</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedRole('couple');
                    setFormData({ ...formData, email: 'couple@demo.com', password: 'demo123' });
                  }}
                  className="flex-1 text-xs border-[#FFB6C1] hover:bg-[#FFE4E9]/30"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  Calon Pengantin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedRole('vendor');
                    setFormData({ ...formData, email: 'vendor@demo.com', password: 'demo123' });
                  }}
                  className="flex-1 text-xs border-[#D4AF37] hover:bg-[#F4E4C1]/30"
                >
                  <Building2 className="w-3 h-3 mr-1" />
                  Penyedia Venue
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Login / Register */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nama@email.com"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nama@email.com"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
              >
                {loading ? 'Memproses...' : 'Daftar'}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Toggle Login/Register */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-[#D4AF37] p-2 hover:text-appDarkPeach hover:bg-appGold/30 hover:rounded-md"
          >
            {isLogin ? 'Belum punya akun? Daftar sekarang' : 'Sudah punya akun? Masuk di sini'}
          </button>
        </div>
      </div>
    </div>
  );
}
