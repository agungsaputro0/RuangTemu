import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MapPin, LocateFixed } from "lucide-react";

interface PopularLocation {
  id: number;
  name: string;
}

interface LocationInputDropdownProps {
  location: string;
  setLocation: (value: string) => void;
}

export const popularLocations: PopularLocation[] = [
  { id: 1, name: "Jakarta Pusat" },
  { id: 2, name: "Jakarta Selatan" },
  { id: 3, name: "Jakarta Timur" },
  { id: 4, name: "Jakarta Barat" },
  { id: 5, name: "Jakarta Utara" },
  { id: 6, name: "Kota Depok" },
  { id: 7, name: "Kota Bekasi" },
  { id: 8, name: "Kota Tangerang" },
];

export default function LocationInputDropdown({
  location,
  setLocation,
}: LocationInputDropdownProps) {
  const [open, setOpen] = useState(false);
  const [loadingNearby, setLoadingNearby] = useState(false);

  const [dropdownPos, setDropdownPos] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    const rect = inputRef.current?.getBoundingClientRect();
    if (rect) {
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (open) updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  /** CLICK OUTSIDE FIX */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;

      if (dropdownRef.current?.contains(target)) return;
      if (inputRef.current?.contains(target)) return;

      setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /** AMBIL LOKASI DEVICE */
  const handleGetNearbyLocation = () => {
  setLoadingNearby(true);

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        // Tetap panggil API untuk reverse geocoding (bisa digunakan internal jika perlu)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        // Ambil nama kota asli (internal use), tapi masking untuk user
        const _city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state ||
          "Lokasi Tidak Diketahui";

        // Masking: tampilkan selalu "Lokasi Anda" atau bisa custom format
        const maskedCity = "Lokasi Anda (Perangkat)";

        setLocation(maskedCity);
      } catch (e) {
        setLocation("Lokasi tidak ditemukan");
      }

      setLoadingNearby(false);
      setOpen(false);
    },
    () => {
      setLocation("Izin lokasi ditolak");
      setLoadingNearby(false);
      setOpen(false);
    }
  );
};


  return (
    <>
      {/* INPUT WRAPPER */}
      <div
        ref={inputRef}
        className="relative w-full"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2 bg-gray-50 px-4 h-14 rounded-xl border border-gray-200 cursor-pointer">
          <MapPin className="w-5 h-5 text-mainColor" />
          <input
            placeholder="Lokasi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent border-0 outline-none text-sm"
          />
        </div>
      </div>

      {/* DROPDOWN VIA PORTAL */}
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
            }}
            className="bg-white rounded-xl border border-gray-200 shadow-xl z-[99999999] max-h-80 overflow-y-auto"
          >
            {/* Dekat Saya */}
            <div
              className="flex items-center gap-2 px-4 py-3 mt-2 hover:bg-gray-50 cursor-pointer"
              onMouseDown={handleGetNearbyLocation}
            >
              <LocateFixed className="w-4 h-4 text-mainColor" />
              {!loadingNearby ? (
                <span className="text-sm font-medium">Dekat Saya</span>
              ) : (
                <span className="text-sm text-gray-400 animate-pulse">
                  Mengambil lokasi...
                </span>
              )}
            </div>

            <div className="border-t my-2" />

            <div className="px-4 py-2 text-xs font-semibold text-gray-500">
              Lokasi Populer
            </div>

            {popularLocations.map((loc) => (
              <div
                key={loc.id}
                className="px-4 py-3 hover:bg-gray-50 text-sm cursor-pointer"
                onMouseDown={() => {
                  setLocation(loc.name);
                  setOpen(false);
                }}
              >
                {loc.name}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
