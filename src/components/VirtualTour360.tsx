// import { useState, useRef, useEffect } from 'react';
// import { X, ZoomIn, ZoomOut, Maximize2, Info, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Button } from './ui/button';

// interface VirtualTour360Props {
//   venueName: string;
//   tourImages: string[];
//   onClose: () => void;
// }

// export function VirtualTour360({ venueName, tourImages, onClose }: VirtualTour360Props) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [showInfo, setShowInfo] = useState(true);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const startPos = useRef({ x: 0, y: 0 });

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;
//     setPosition({
//       x: e.clientX - startPos.current.x,
//       y: e.clientY - startPos.current.y,
//     });
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleZoomIn = () => {
//     setZoom((prev) => Math.min(prev + 0.2, 3));
//   };

//   const handleZoomOut = () => {
//     setZoom((prev) => Math.max(prev - 0.2, 0.5));
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
//     setPosition({ x: 0, y: 0 });
//     setZoom(1);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + tourImages.length) % tourImages.length);
//     setPosition({ x: 0, y: 0 });
//     setZoom(1);
//   };

//   useEffect(() => {
//     // Auto-hide info after 3 seconds
//     const timer = setTimeout(() => setShowInfo(false), 3000);
//     return () => clearTimeout(timer);
//   }, [currentImageIndex]);

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex flex-col">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm p-4 flex items-center justify-between">
//         <div>
//           <h3 className="text-white">Virtual Tour 360°</h3>
//           <p className="text-sm text-gray-300">{venueName}</p>
//         </div>
//         <Button
//           onClick={onClose}
//           variant="ghost"
//           className="text-white hover:bg-white/20"
//         >
//           <X className="w-6 h-6" />
//         </Button>
//       </div>

//       {/* Main Tour View */}
//       <div
//         ref={containerRef}
//         className="flex-1 overflow-hidden cursor-move relative"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       >
//         <div
//           className="w-full h-full flex items-center justify-center"
//           style={{
//             transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
//             transition: isDragging ? 'none' : 'transform 0.3s ease',
//           }}
//         >
//           <img
//             src={tourImages[currentImageIndex]}
//             alt={`${venueName} - View ${currentImageIndex + 1}`}
//             className="max-w-full max-h-full object-contain select-none"
//             draggable={false}
//           />
//         </div>

//         {/* Info Overlay */}
//         {showInfo && (
//           <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full animate-in fade-in slide-in-from-top duration-300">
//             <p className="text-sm flex items-center gap-2">
//               <Info className="w-4 h-4" />
//               Klik dan drag untuk menjelajah • Scroll untuk zoom
//             </p>
//           </div>
//         )}

//         {/* Navigation Arrows */}
//         {tourImages.length > 1 && (
//           <>
//             <button
//               onClick={prevImage}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Control Bar */}
//       <div className="bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm p-4">
//         <div className="max-w-4xl mx-auto flex items-center justify-between">
//           {/* Thumbnails */}
//           <div className="flex gap-2 overflow-x-auto">
//             {tourImages.map((img, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   setCurrentImageIndex(idx);
//                   setPosition({ x: 0, y: 0 });
//                   setZoom(1);
//                 }}
//                 className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                   currentImageIndex === idx
//                     ? 'border-[#D4AF37] scale-110'
//                     : 'border-white/20 hover:border-white/40'
//                 }`}
//               >
//                 <img
//                   src={img}
//                   alt={`Thumbnail ${idx + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//             ))}
//           </div>

//           {/* Zoom Controls */}
//           <div className="flex items-center gap-2 ml-4">
//             <Button
//               onClick={handleZoomOut}
//               variant="ghost"
//               size="sm"
//               className="text-white hover:bg-white/20"
//             >
//               <ZoomOut className="w-5 h-5" />
//             </Button>
//             <span className="text-white text-sm min-w-[3rem] text-center">
//               {Math.round(zoom * 100)}%
//             </span>
//             <Button
//               onClick={handleZoomIn}
//               variant="ghost"
//               size="sm"
//               className="text-white hover:bg-white/20"
//             >
//               <ZoomIn className="w-5 h-5" />
//             </Button>
//             <Button
//               onClick={() => setShowInfo(!showInfo)}
//               variant="ghost"
//               size="sm"
//               className="text-white hover:bg-white/20 ml-2"
//             >
//               <Info className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import { Viewer } from "photo-sphere-viewer";
// import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "./ui/button";

// // 🟩 FUNGSI UNIVERSAL untuk memastikan AutorotatePlugin tidak undefined
// async function loadAutorotatePlugin() {
//   const module = await import("@photo-sphere-viewer/autorotate-plugin");
//   // Beberapa versi ekspor pakai default, beberapa tidak
//   return module.AutorotatePlugin ?? module.default;
// }

// interface VirtualTour360Props {
//   venueName: string;
//   tourImages: string[];
//   onClose: () => void;
// }

// export function VirtualTour360({ venueName, tourImages, onClose }: VirtualTour360Props) {
//   const viewerRef = useRef<HTMLDivElement>(null);
//   const psvRef = useRef<any>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     if (!viewerRef.current || !tourImages.length) return;

//     let destroyed = false;

//     (async () => {
//       if (psvRef.current) psvRef.current.destroy();

//       try {
//         const AutorotatePlugin = await loadAutorotatePlugin();

//         if (!AutorotatePlugin) {
//           throw new Error("AutorotatePlugin masih undefined setelah import.");
//         }

//         if (destroyed) return;

//         psvRef.current = new Viewer({
//           container: viewerRef.current!,
//           panorama: tourImages[currentImageIndex],
//           navbar: ["zoom", "caption", "autorotate"],
//           defaultZoomLvl: 50,
//           mousewheel: true,
//           plugins: [
//             [AutorotatePlugin as any, { autorotateSpeed: "1rpm", autorotateLat: 0 }],
//           ],
//         });
//       } catch (err) {
//         console.error("❌ Gagal inisialisasi Photo Sphere Viewer:", err);
//       }
//     })();

//     return () => {
//       destroyed = true;
//       psvRef.current?.destroy();
//       psvRef.current = null;
//     };
//   }, [tourImages]);

//   useEffect(() => {
//     if (!psvRef.current || !tourImages[currentImageIndex]) return;
//     psvRef.current.setPanorama(tourImages[currentImageIndex]);
//   }, [currentImageIndex, tourImages]);

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex flex-col">
//       <div className="bg-black/70 text-white p-4 flex justify-between items-center">
//         <h3 className="text-lg font-bold">{venueName} - Virtual Tour 360°</h3>
//         <Button onClick={onClose} variant="ghost" className="text-white hover:bg-white/20">
//           <X className="w-5 h-5" />
//         </Button>
//       </div>

//       <div ref={viewerRef} className="flex-1 w-full" />

//       <div className="flex items-center justify-between bg-black/70 p-4">
//         <div className="flex gap-2">
//           <Button onClick={() => setCurrentImageIndex((i) => (i - 1 + tourImages.length) % tourImages.length)} variant="ghost" className="text-white hover:bg-white/20">
//             <ChevronLeft className="w-5 h-5" />
//           </Button>
//           <Button onClick={() => setCurrentImageIndex((i) => (i + 1) % tourImages.length)} variant="ghost" className="text-white hover:bg-white/20">
//             <ChevronRight className="w-5 h-5" />
//           </Button>
//         </div>

//         <div className="flex gap-2 overflow-x-auto max-w-[50%] p-1">
//           {tourImages.map((img, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentImageIndex(idx)}
//               className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                 currentImageIndex === idx
//                   ? "border-[#D4AF37] scale-110"
//                   : "border-white/20 hover:border-white/40"
//               }`}
//             >
//               <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

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

  useEffect(() => {
    if (!containerRef.current) return;

    // Hapus viewer lama jika ada
    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
    }

    // Buat viewer baru
    viewerRef.current = new PANOLENS.Viewer({
      container: containerRef.current,
      autoRotate: true,
      autoRotateSpeed: 0.5,
      controlBar: true,
      horizontalView: true,
    });

    // Tambahkan panorama pertama
    const panorama = new PANOLENS.ImagePanorama(tourImages[currentImageIndex]);
    viewerRef.current.add(panorama);

    return () => {
      viewerRef.current?.dispose();
      viewerRef.current = null;
    };
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
