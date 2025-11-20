import { useEffect, useRef, useState } from "react";
import * as PANOLENS from "panolens";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface VirtualTour360Props {
  venueName: string;
  tourImages: string[];
  onClose: () => void;
}

export function VirtualTour360({ venueName, tourImages, onClose }: VirtualTour360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PANOLENS.Viewer | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   if (!containerRef.current) return;

  //   // Hapus viewer lama jika ada
  //   if (viewerRef.current) {
  //     viewerRef.current.dispose();
  //     viewerRef.current = null;
  //   }

  //   // Buat viewer baru
  //   viewerRef.current = new PANOLENS.Viewer({
  //     container: containerRef.current,
  //     autoRotate: true,
  //     autoRotateSpeed: 0.5,
  //     controlBar: true,
  //     horizontalView: true,
  //   });

  //   // Tambahkan panorama pertama
  //   const panorama = new PANOLENS.ImagePanorama(tourImages[currentImageIndex]);
  //   viewerRef.current.add(panorama);

  //   return () => {
  //     viewerRef.current?.dispose();
  //     viewerRef.current = null;
  //   };
  // }, [currentImageIndex]);

  const panoramasRef = useRef<PANOLENS.ImagePanorama[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Buat viewer sekali
    if (!viewerRef.current) {
      viewerRef.current = new PANOLENS.Viewer({
        container: containerRef.current,
        autoRotate: true,
        autoRotateSpeed: 0.5,
        controlBar: true,
        horizontalView: true,
      });

      // Buat semua panorama
      panoramasRef.current = tourImages.map((img) => new PANOLENS.ImagePanorama(img));

      // Tambahkan panorama pertama
      viewerRef.current.add(panoramasRef.current[currentImageIndex]);
    }
  }, [tourImages]);

  useEffect(() => {
    if (!viewerRef.current || panoramasRef.current.length === 0) return;

    // Pindah ke panorama baru dengan setTimeout agar viewer siap
    const nextPano = panoramasRef.current[currentImageIndex];
    setTimeout(() => {
      viewerRef.current?.add(nextPano);
      viewerRef.current?.setPanorama(nextPano);
    }, 100);
  }, [currentImageIndex]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="bg-black/70 text-white p-4 flex justify-between items-center">
        <h3 className="text-lg font-bold">{venueName} - Virtual Tour 360°</h3>
        <Button onClick={onClose} variant="ghost" className="text-white hover:bg-white/20">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div ref={containerRef} className="flex-1 w-full" />

      <div className="flex items-center justify-between bg-black/70 p-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentImageIndex((i) => (i - 1 + tourImages.length) % tourImages.length)}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setCurrentImageIndex((i) => (i + 1) % tourImages.length)}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto max-w-[50%] p-1">
          {tourImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentImageIndex === idx
                  ? "border-[#D4AF37] scale-110"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
