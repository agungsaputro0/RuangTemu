import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../hooks/UseIsMobile";
import Button from "./atoms/Button";
import { FaChevronDown } from "react-icons/fa";
import { Navbar } from "./Navbar";
import { useAuth } from "./AuthContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type LandingProps = {
  layoutMessage: string;
  layoutTitle: string;
  layoutSubtitle: string;
  to?: string; // halaman tujuan
};

const LandingCurtain = (props: LandingProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { layoutTitle, layoutSubtitle, layoutMessage, to = "/ruangtemu" } = props;
  const [isLeaving, setIsLeaving] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const handleOpenCurtain = () => {
    if (isLeaving) return;
    setIsLeaving(true);
  };

  const handleProtectedNavigation = (path: string) => {
    const restricted = ["/negosiasi", "/akun"];
    if (restricted.includes(path) && !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (path === "/vendor" && (!isAuthenticated || user?.role !== "vendor")) {
      setShowLoginModal(true);
      return;
    }

    navigate(path);
  };

  useEffect(() => {
  if (!isLeaving) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  // Cleanup saat unmount atau ketika isLeaving berubah
  return () => {
    document.body.style.overflow = "";
  };
}, [isLeaving]);

return (
  <AnimatePresence>
    {!isLeaving && (
      <motion.div
        className="fixed inset-0 z-[9999] bg-white overflow-hidden cursor-pointer"
        onClick={handleOpenCurtain}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <div className="flex flex-col w-full h-full">
          <Navbar
            currentPage={location.pathname.replace("/", "")}
            onNavigate={handleProtectedNavigation}
          />

          <div className="flex-grow bg-ruangTemu bg-no-repeat bg-center bg-cover bg-fixed">
            {/* MOBILE */}
            {isMobile ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/assets/img/banner-mobile.webp')",
                  }}
                ></div>

                {/* Overlay gelap */}
                <div className="absolute inset-0 bg-black/60 z-0"></div>

                {/* Konten utama */}
                <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-6">
                  <img
                    src="/assets/img/logo-fix-white.png"
                    alt="Logo"
                    className="w-32 sm:w-40 object-contain drop-shadow-lg mb-6"
                  />

                  <h1 className="text-5xl sm:text-4xl font-dancingScript font-bold text-white drop-shadow-lg mb-3">
                    Ruang Temu
                  </h1>

                  <p className="text-md mt-2 sm:text-lg text-white/90 font-poppins max-w-md">
                    {layoutMessage}
                  </p>
                </div>

                {/* Tombol di bawah */}
                <div className="relative z-10 w-full flex justify-center mb-10">
                  <Button
                    message=""
                    onClick={handleOpenCurtain}
                    variant="min-h-12 w-full mx-8 bg-secondColor hover:bg-mainColorHover text-white px-8 rounded-full font-poppins transition-all duration-300"
                  >
                    Eksplor Sekarang
                  </Button>
                </div>
              </div>
            ) : (
              /* DESKTOP */
              <div className="relative flex flex-col lg:flex-row w-full h-full overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Wedding venue"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradien semi-transparan */}
                  <div className="absolute inset-0 bg-ruangTemu opacity-70"></div>
                </div>

                {/* Konten */}
                <div className="relative z-10 flex flex-col lg:flex-row w-full h-full">
                  <div className="flex mt-48 flex-col justify-center items-start w-full lg:w-1/2 px-12 lg:px-16">
                    <h1 className="text-4xl lg:text-5xl font-dancingScript font-bold text-mainColor leading-tight drop-shadow-lg">
                      {layoutTitle} {layoutSubtitle}
                    </h1>

                    <p className="mt-4 text-md text-rajutGray text-justify drop-shadow-md">
                      {layoutMessage}
                    </p>

                    <div className="mt-8">
                      <Button
                        message=""
                        onClick={handleOpenCurtain}
                        variant="min-h-10 min-w-[200px] bg-mainColor hover:bg-mainColorHover text-white px-6 rounded-full font-poppins"
                      >
                        Eksplor Sekarang
                      </Button>
                    </div>
                    <div className="mt-10 w-full mb-20 flex sm:flex-row justify-center lg:justify-around items-center gap-8 text-center text-rajutGray font-light">
                      <div>
                        <p className="text-3xl font-semibold text-mainColor">1.5K+</p>
                        <p className="text-sm">Pasangan Bahagia</p>
                      </div>
                      <div className="hidden sm:block w-[1px] h-10 bg-mainColor/30"></div>
                      <div>
                        <p className="text-3xl font-semibold text-mainColor">300+</p>
                        <p className="text-sm">Venue Tersedia</p>
                      </div>
                      <div className="hidden sm:block w-[1px] h-10 bg-mainColor/30"></div>
                      <div>
                        <p className="text-3xl font-semibold text-mainColor">250+</p>
                        <p className="text-sm">Vendor Tergabung</p>
                      </div>
                    </div>
                  </div>

                  {/* Kanan */}
                  <div className="w-full lg:w-1/2 relative z-10">
                    <img
                      src="/assets/img/blob.webp"
                      alt="Blob Background"
                      className="absolute top-0 left-0 w-full h-full object-contain rotate-90 z-0"
                    />
                    <img
                      src="/assets/img/banner-image.webp"
                      alt="Banner Image"
                      className="absolute top-0 left-0 w-full h-full object-contain rounded-xl drop-shadow-lg z-10"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <div className="absolute bottom-6 w-full flex justify-center gap-2 text-center text-mainColor font-bold text-sm animate-pulse">
              Klik untuk melanjutkan <FaChevronDown className="mt-1" />
            </div>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

};

export default LandingCurtain;
