// import { useState, useEffect } from 'react';
// import { Navbar } from './components/Navbar';
// import { BottomNavigation } from './components/BottomNavigation';
// import { Beranda } from './components/Beranda';
// import { EksplorVenue } from './components/EksplorVenue';
// import { BudgetEstimator } from './components/BudgetEstimator';
// import { NegosiasiKontrak } from './components/NegosiasiKontrak';
// import { ReviewKomunitas } from './components/ReviewKomunitas';
// import { VendorCenter } from './components/VendorCenter';
// import { AkunSaya } from './components/AkunSaya';
// import { VenueDetailPage } from './components/VenueDetailPage';
// import { OnboardingScreen } from './components/OnboardingScreen';
// import { VenueEditPage } from './components/VenueEditPage';
// import { VendorBookingCalendar } from './components/VendorBookingCalendar';
// import { AuthProvider, useAuth } from './components/AuthContext';
// import { LoginModal } from './components/LoginModal';
// import { Toaster } from './components/ui/sonner';

// function AppContent() {
//   const [currentPage, setCurrentPage] = useState('beranda');
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
//   const [editingVenueId, setEditingVenueId] = useState<number | null>(null);
//   const [showBookingCalendar, setShowBookingCalendar] = useState(false);
//   const { user, isAuthenticated, hasSeenOnboarding, setHasSeenOnboarding } = useAuth();

//   // Redirect vendor to dashboard after login
//   useEffect(() => {
//     if (user?.role === 'vendor' && currentPage === 'beranda') {
//       setCurrentPage('vendor');
//     }
//   }, [user?.role]);

//   // Check if user is trying to access restricted pages
//   const handleNavigation = (page: string) => {
//     // Pages that require authentication
//     const restrictedPages = ['negosiasi', 'akun'];
    
//     if (restrictedPages.includes(page) && !isAuthenticated) {
//       setShowLoginModal(true);
//       return;
//     }

//     // Vendor-only pages
//     if (page === 'vendor' && (!isAuthenticated || user?.role !== 'vendor')) {
//       setShowLoginModal(true);
//       return;
//     }

//     setCurrentPage(page);
//   };

//   const handleVenueClick = (venueId: number) => {
//     setSelectedVenueId(venueId);
//   };

//   const handleBackFromVenue = () => {
//     setSelectedVenueId(null);
//   };

//   const handleBookingComplete = (bookingData: any) => {
//     // Navigate to Negosiasi page after booking
//     setSelectedVenueId(null);
//     setCurrentPage('negosiasi');
//   };

//   const handleEditVenue = (venueId: number) => {
//     setEditingVenueId(venueId);
//   };

//   const handleBackFromEdit = () => {
//     setEditingVenueId(null);
//   };

//   const handleViewBookingCalendar = () => {
//     setShowBookingCalendar(true);
//   };

//   const handleBackFromCalendar = () => {
//     setShowBookingCalendar(false);
//   };

//   const handleNavigateToChat = () => {
//     setCurrentPage('negosiasi');
//   };

//   const renderPage = () => {
//     // Show booking calendar if vendor wants to view it
//     if (showBookingCalendar) {
//       return <VendorBookingCalendar onBack={handleBackFromCalendar} />;
//     }

//     // Show venue edit page if a venue is being edited
//     if (editingVenueId !== null) {
//       return <VenueEditPage venueId={editingVenueId} onBack={handleBackFromEdit} />;
//     }

//     // Show venue detail page if a venue is selected
//     if (selectedVenueId !== null) {
//       return (
//         <VenueDetailPage
//           venueId={selectedVenueId}
//           onBack={handleBackFromVenue}
//           onBookingComplete={handleBookingComplete}
//         />
//       );
//     }

//     switch (currentPage) {
//       case 'beranda':
//         return <Beranda onVenueClick={handleVenueClick} onNavigate={handleNavigation} />;
//       case 'eksplor':
//         return <EksplorVenue onVenueClick={handleVenueClick} />;
//       case 'estimator':
//         return <BudgetEstimator />;
//       case 'negosiasi':
//         return <NegosiasiKontrak />;
//       case 'review':
//         return <ReviewKomunitas />;
//       case 'vendor':
//         return (
//           <VendorCenter 
//             onViewVenueDetail={handleVenueClick}
//             onEditVenue={handleEditVenue}
//             onViewBookingCalendar={handleViewBookingCalendar}
//             onNavigateToChat={handleNavigateToChat}
//           />
//         );
//       case 'akun':
//         return <AkunSaya />;
//       default:
//         return <Beranda onVenueClick={handleVenueClick} onNavigate={handleNavigation} />;
//     }
//   };

//   // Show onboarding screen if user hasn't seen it yet
//   if (!hasSeenOnboarding) {
//     return (
//       <OnboardingScreen onComplete={() => setHasSeenOnboarding(true)} />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
//       <main className="pb-20 lg:pb-0">{renderPage()}</main>
      
//       {/* Bottom Navigation for Mobile */}
//       <BottomNavigation currentPage={currentPage} onNavigate={handleNavigation} />
      
//       {/* Login Modal */}
//       {showLoginModal && (
//         <LoginModal 
//           onClose={() => setShowLoginModal(false)} 
//           onSuccess={() => {
//             // Redirect based on user role
//             if (user?.role === 'vendor') {
//               setCurrentPage('vendor');
//             } else {
//               setCurrentPage('beranda');
//             }
//           }}
//         />
//       )}
      
//       {/* Toast Notifications */}
//       <Toaster position="top-center" richColors />
      
//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-[#F4E4C1]/30 to-[#FFE4E9]/30 border-t border-[#F4E4C1] mt-16 mb-20 lg:mb-0">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid md:grid-cols-4 gap-8 mb-4">

//           {/* Logo & Info */}
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <img
//                 src="/assets/img/logo-icon.png"
//                 alt="Ruang Temu Logo"
//                 className="h-10 w-16"
//               />
//               <span className="font-dancingScript text-3xl bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
//                 Ruang Temu
//               </span>
//             </div>
//             <div className="footer-info text-gray-600 text-xs space-y-1.5">
//               <p>Copyright © Kelompok 4 (Fantastic) LA79</p>
//               <p>Universitas Bina Nusantara</p>
//               <p>Jl. Kebon Jeruk Raya No. 27, Kebon Jeruk Jakarta Barat 11530, Indonesia</p>
//             </div>
//           </div>

//           {/* Layanan */}
//           <div>
//             <h4 className="mb-4 text-[#D4AF37] font-semibold">Layanan</h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li><a onClick={() => setCurrentPage("eksplor")} href="#" className="hover:text-[#D4AF37] transition-colors">Cari Venue</a></li>
//               <li><a onClick={() => setCurrentPage("negosiasi")} href="#" className="hover:text-[#D4AF37] transition-colors">Kontrak Digital</a></li>
//               <li><a onClick={() => setCurrentPage("estimator")} href="#" className="hover:text-[#D4AF37] transition-colors">Budget Estimator</a></li>
//               <li><a onClick={() => setCurrentPage("review")} href="#" className="hover:text-[#D4AF37] transition-colors">Review Terpercaya</a></li>
//             </ul>
//           </div>

//           {/* Untuk Vendor */}
//           <div>
//             <h4 className="mb-4 text-[#D4AF37] font-semibold">Untuk Vendor</h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Daftar Venue</a></li>
//               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Highlight Ads</a></li>
//               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Banner Ads</a></li>
//               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Analytics</a></li>
//             </ul>
//           </div>

//           {/* Bantuan */}
//           <div>
//             <h4 className="mb-4 text-[#D4AF37] font-semibold">Bantuan</h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Pusat Bantuan</a></li>
//               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">FAQ</a></li>
//               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Syarat & Ketentuan</a></li>
//               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Kebijakan Privasi</a></li>
//             </ul>
//           </div>

//         </div>

//         {/* Footer Bottom */}
//         <div className="border-t border-[#F4E4C1] mt-10 pt-8 text-center">
//           <p className="text-sm text-gray-600 leading-relaxed mt-4">
//             © 2025 Ruang Temu. All rights reserved. Made with ❤️ for couples in Indonesia.
//           </p>
//         </div>
//       </div>
//     </footer>

//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNavigation } from './components/BottomNavigation';
import { Beranda } from './components/Beranda';
import { EksplorVenue } from './components/EksplorVenue';
import { BudgetEstimator } from './components/BudgetEstimator';
import { NegosiasiKontrak } from './components/NegosiasiKontrak';
import { ReviewKomunitas } from './components/ReviewKomunitas';
import { VendorCenter } from './components/VendorCenter';
import { AkunSaya } from './components/AkunSaya';
import { VenueDetailPage } from './components/VenueDetailPage';
import { OnboardingScreen } from './components/OnboardingScreen';
import { VenueEditPage } from './components/VenueEditPage';
import { VendorBookingCalendar } from './components/VendorBookingCalendar';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginModal } from './components/LoginModal';
import { Toaster } from './components/ui/sonner';

function AppRoutes() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [editingVenueId, setEditingVenueId] = useState<number | null>(null);
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const { user, isAuthenticated, hasSeenOnboarding, setHasSeenOnboarding } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Cegah akses halaman tertentu tanpa login
  const handleProtectedNavigation = (path: string) => {
    const restricted = ['/negosiasi', '/akun'];
    if (restricted.includes(path) && !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (path === '/vendor' && (!isAuthenticated || user?.role !== 'vendor')) {
      setShowLoginModal(true);
      return;
    }

    navigate(path);
  };

  const handleVenueClick = (venueId: number) => {
    setSelectedVenueId(venueId);
    navigate(`/venue/${venueId}`);
  };
  const handleBackFromVenue = () => setSelectedVenueId(null);
  const handleBookingComplete = () => {
    setSelectedVenueId(null);
    navigate('/negosiasi');
  };

  const handleEditVenue = (venueId: number) => setEditingVenueId(venueId);
  const handleBackFromEdit = () => setEditingVenueId(null);
  const handleViewBookingCalendar = () => setShowBookingCalendar(true);
  const handleBackFromCalendar = () => setShowBookingCalendar(false);
  const handleNavigateToChat = () => navigate('/negosiasi');

  useEffect(() => {
    // Redirect vendor otomatis ke dashboard vendor setelah login
    if (user?.role === 'vendor' && location.pathname === '/beranda') {
      navigate('/vendor', { replace: true });
    }
  }, [user?.role]);

  if (!hasSeenOnboarding) {
    return <OnboardingScreen onComplete={() => setHasSeenOnboarding(true)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={location.pathname.replace('/', '')} onNavigate={handleProtectedNavigation} />
      <main className="pb-20 lg:pb-0">

        <Routes>
          <Route path="/" element={<Navigate to="/beranda" />} />
          <Route path="/beranda" element={<Beranda onVenueClick={handleVenueClick} onNavigate={handleProtectedNavigation} />} />
          <Route path="/eksplor" element={<EksplorVenue onVenueClick={handleVenueClick} />} />
          <Route path="/estimator" element={<BudgetEstimator />} />
          <Route path="/negosiasi" element={<NegosiasiKontrak />} />
          <Route path="/review" element={<ReviewKomunitas />} />
          <Route path="/vendor" element={
            <VendorCenter
              onViewVenueDetail={handleVenueClick}
              onEditVenue={handleEditVenue}
              onViewBookingCalendar={handleViewBookingCalendar}
              onNavigateToChat={handleNavigateToChat}
            />
          } />
          <Route path="/akun" element={<AkunSaya />} />

          {/* Dynamic nested pages */}
          
            <Route path="/venue/:id" element={
              <VenueDetailPage
                onBack={handleBackFromVenue}
                onBookingComplete={handleBookingComplete}
              />
            } />
          

          {editingVenueId !== null && (
            <Route path="/vendor/edit/:id" element={
              <VenueEditPage venueId={editingVenueId} onBack={handleBackFromEdit} />
            } />
          )}

          {showBookingCalendar && (
            <Route path="/vendor/calendar" element={
              <VendorBookingCalendar onBack={handleBackFromCalendar} />
            } />
          )}
        </Routes>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage={location.pathname.replace('/', '')} onNavigate={handleProtectedNavigation} />

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            if (user?.role === 'vendor') navigate('/vendor');
            else navigate('/beranda');
          }}
        />
      )}

      <Toaster position="top-center" richColors />

      {/* Footer tetap */}
      <footer className="bg-gradient-to-r from-[#F4E4C1]/30 to-[#FFE4E9]/30 border-t border-[#F4E4C1] mt-16 mb-20 lg:mb-0">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid md:grid-cols-4 gap-8 mb-4">

           {/* Logo & Info */}
           <div>
             <div className="flex items-center gap-3 mb-4">
               <img
                 src="/assets/img/logo-icon.png"
                 alt="Ruang Temu Logo"
                 className="h-10 w-16"
               />
               <span className="font-dancingScript text-3xl bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                 Ruang Temu
               </span>
             </div>
             <div className="footer-info text-gray-600 text-xs space-y-1.5">
               <p>Copyright © Kelompok 4 (Fantastic) LA79</p>
               <p>Universitas Bina Nusantara</p>
               <p>Jl. Kebon Jeruk Raya No. 27, Kebon Jeruk Jakarta Barat 11530, Indonesia</p>
             </div>
           </div>

           {/* Layanan */}
           <div>
             <h4 className="mb-4 text-[#D4AF37] font-semibold">Layanan</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li><a onClick={() => navigate("/eksplor")} href="#" className="hover:text-[#D4AF37] transition-colors">Cari Venue</a></li>
               <li><a onClick={() => navigate("/negosiasi")} href="#" className="hover:text-[#D4AF37] transition-colors">Kontrak Digital</a></li>
               <li><a onClick={() => navigate("/estimator")} href="#" className="hover:text-[#D4AF37] transition-colors">Budget Estimator</a></li>
               <li><a onClick={() => navigate("/review")} href="#" className="hover:text-[#D4AF37] transition-colors">Review Terpercaya</a></li>
             </ul>
           </div>

           {/* Untuk Vendor */}
           <div>
             <h4 className="mb-4 text-[#D4AF37] font-semibold">Untuk Vendor</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Daftar Venue</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Highlight Ads</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Banner Ads</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Analytics</a></li>
             </ul>
           </div>

           {/* Bantuan */}
           <div>
             <h4 className="mb-4 text-[#D4AF37] font-semibold">Bantuan</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Pusat Bantuan</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">FAQ</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Syarat & Ketentuan</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Kebijakan Privasi</a></li>
             </ul>
           </div>

         </div>

         {/* Footer Bottom */}
         <div className="border-t border-[#F4E4C1] mt-10 pt-8 text-center">
           <p className="text-sm text-gray-600 leading-relaxed mt-4">
             © 2025 Ruang Temu. All rights reserved. Made with ❤️ for couples in Indonesia.
           </p>
         </div>
       </div>
     </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
