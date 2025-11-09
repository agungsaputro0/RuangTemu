import { FC, useEffect, useRef, useState } from "react";
import { Heart, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import InputElement from "./atoms/InputElement";
import Button from "./atoms/Button";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import WhitePanel from "./atoms/WhitePanel";
import TitleAndSubtitle from "./atoms/TitleAndSubtitle";
import { useAuth } from "./AuthContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const LoginForm: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<"couple" | "vendor">("couple");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login, register } = useAuth();
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const loadingIndicator = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ffb300" }} spin />
  );

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password, selectedRole);
        toast.success("Login berhasil! Selamat datang di Ruang Temu");
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Password tidak cocok");
          setLoading(false);
          return;
        }
        await register(
          formData.name,
          formData.email,
          formData.password,
          selectedRole
        );
        toast.success("Registrasi berhasil! Akun Anda telah dibuat");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  useEffect(() => {
  // Jika user sudah klik demo login sebelumnya (email demo sudah aktif),
  // maka ganti otomatis sesuai role yang baru
  if (
    formData.email === "vendor@demo.com" ||
    formData.email === "couple@demo.com"
  ) {
    const demoEmail =
      selectedRole === "vendor"
        ? "vendor@demo.com"
        : "couple@demo.com";
    setFormData((prev) => ({
      ...prev,
      email: demoEmail,
      password: "demo123",
    }));
  }
}, [selectedRole]);


  return (
   <div className="flex-grow bg-ruangTemu bg-no-repeat bg-center bg-cover bg-fixed relative">
  <section className="relative min-h-screen flex flex-col lg:flex-row items-center mt-8 justify-between px-4 md:px-8 py-10 lg:py-0">
    {/* Kiri: Gambar */}
    <div className="absolute inset-0 z-0">
       <ImageWithFallback
         src="https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
         alt="Wedding venue"
         className="w-full h-full object-cover"
       />
       {/* Overlay gradien semi-transparan */}
       <div className="absolute inset-0 bg-ruangTemu opacity-70"></div>
     </div>
    <div className="relative w-full lg:w-1/2 h-[300px] lg:h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/assets/img/blob.webp"
          alt="Blob Background"
          className="w-full h-full  object-contain rotate-90 opacity-70"
        />
      </div>
      <img
        src="/assets/img/login-man.png"
        alt="Login Illustration"
        className="relative w-4/5 max-w-md object-contain z-10 drop-shadow-lg transform scale-x-[-1]"
      />
    </div>

    {/* Kanan: Form */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <WhitePanel className="w-full max-w-xl">
        <div className="flex flex-col justify-center w-full">
          {/* Role Selector */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-mainColor text-center pb-[30px]">Login</h1>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole("couple")}
                className={`py-2 px-4 rounded-xl border-2 transition-all ${
                  selectedRole === "couple"
                    ? "border-mainColor bg-ruangTemu"
                    : "border-gray-200 hover:border-[#FFB6C1]"
                }`}
              >
                <Heart
                  className={`w-5 h-5 mx-auto mb-1 ${
                    selectedRole === "couple"
                      ? "text-mainColor"
                      : "text-gray-400"
                  }`}
                />
                <p
                  className={`text-sm ${
                    selectedRole === "couple"
                      ? "text-mainColor"
                      : "text-gray-600"
                  }`}
                >
                  Calon Pengantin
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("vendor")}
                className={`py-2 px-4 rounded-xl border-2 transition-all ${
                  selectedRole === "vendor"
                    ? "border-mainColor bg-ruangTemu"
                    : "border-gray-200 hover:border-[#FFB6C1]"
                }`}
              >
                <Building2
                  className={`w-5 h-5 mx-auto mb-1 ${
                    selectedRole === "vendor"
                      ? "text-mainColor"
                      : "text-gray-400"
                  }`}
                />
                <p
                  className={`text-sm ${
                    selectedRole === "vendor"
                      ? "text-mainColor"
                      : "text-gray-600"
                  }`}
                >
                  Penyedia Venue
                </p>
              </button>
            </div>
          </div>

        {/* Demo Login (tombol kecil, dinamis berdasarkan role) */}
                <AnimatePresence mode="wait">
                {isLogin && (
                    <motion.div
                    key="demo-login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-3 text-center"
                    >
                    <Button
                        type="button"
                        variant="text-xs w-full border border-mainColor text-mainColor hover:bg-[#F4E4C1]/30 px-3 py-1 rounded-md"
                        message="Gunakan Akun Demo"
                        onClick={() => {
                        const demoEmail =
                            selectedRole === "vendor"
                            ? "vendor@demo.com"
                            : "couple@demo.com";
                        setFormData({
                            ...formData,
                            email: demoEmail,
                            password: "demo123",
                        });
                        }}
                    />
                    </motion.div>
                )}
                </AnimatePresence>

              {/* Form */}
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
                    <InputElement
                      forwhat="email"
                      labelMessage="Email"
                      typeInput="email"
                      inputName="email"
                      inputPlaceholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      ref={usernameRef}
                    />
                    <InputElement
                      forwhat="password"
                      labelMessage="Password"
                      typeInput="password"
                      inputName="password"
                      inputPlaceholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <Button
                      type="submit"
                      variant="bg-mainColor w-full min-h-10 hover:bg-secondColor text-white"
                      message={loading ? "Memproses..." : "Masuk"}
                      disabled={loading}
                    />
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
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Row 1 */}
                    <InputElement
                        forwhat="name"
                        labelMessage="Nama Lengkap"
                        typeInput="text"
                        inputName="name"
                        inputPlaceholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <InputElement
                        forwhat="email"
                        labelMessage="Email"
                        typeInput="email"
                        inputName="email"
                        inputPlaceholder="nama@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    {/* Row 2 */}
                    <InputElement
                        forwhat="password"
                        labelMessage="Password"
                        typeInput="password"
                        inputName="password"
                        inputPlaceholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <InputElement
                        forwhat="confirmPassword"
                        labelMessage="Konfirmasi Password"
                        typeInput="password"
                        inputName="confirmPassword"
                        inputPlaceholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                    />
                    </div>

                    <Button
                      type="submit"
                      variant="bg-mainColor w-full min-h-10 hover:bg-secondColor text-white"
                      message={loading ? "Memproses..." : "Daftar"}
                      disabled={loading}
                    />
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Toggle Login/Register */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-mainColor hover:text-appDarkPeach hover:bg-appGold/30 hover:rounded-md p-2"
                >
                  {isLogin
                    ? "Belum punya akun? Daftar sekarang"
                    : "Sudah punya akun? Masuk di sini"}
                </button>
              </div>

              {/* Loader & Error */}
              {loading && (
                <div className="flex justify-center items-center mt-4">
                  <Spin indicator={loadingIndicator} />
                </div>
              )}
        </div>
      </WhitePanel>
    </div>
  </section>
</div>

  );
};

export default LoginForm;
