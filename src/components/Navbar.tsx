import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { LoginModal } from './LoginModal';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { UseScroll } from '../hooks/UseScroll';
import { useIsMobile } from './ui/use-mobile';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const isScroll = UseScroll();
  const isMobile = useIsMobile();
  const getMenuItems = () => {
    if (user?.role === 'vendor') {
      return [
        { id: 'vendor', label: 'Dashboard' },
        { id: 'negosiasi', label: 'Chat & Negosiasi' },
        { id: 'review', label: 'Komunitas' },
        { id: 'akun', label: 'Akun Saya' },
      ];
    }
    return [
      { id: 'beranda', label: 'Beranda' },
      { id: 'eksplor', label: 'Eksplor Venue' },
      { id: 'estimator', label: 'Budget Estimator' },
      { id: 'negosiasi', label: 'Negosiasi & Kontrak' },
      { id: 'review', label: 'Komunitas' },
      { id: 'akun', label: 'Akun Saya' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-ruangTemu py-1 backdrop-blur-md`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex ${isMobile ? "justify-center" : "justify-between"} items-center h-16`}>
            {/* === LOGO (KIRI) === */}
            <div
              onClick={() => onNavigate('')}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <img
                src="/assets/img/logo-fix.png"
                alt="Ruang Temu Logo"
                className="h-10 w-15"
              />
              <div className="flex font-spring flex-col leading-tight text-mainColor">
                <span className="text-mainColor font-dancing text-2xl font-bold">
                  Ruang Temu
                </span>
                <small className="text-[0.7em]">
                    Temukan Venue Impianmu
                </small>
               </div>
            </div>

            {/* === MENU TENGAH === */}
            <div className="hidden lg:flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-2 py-2 shadow-sm border border-[#f4e4c1]/40">
              {menuItems.map((item) => {
                const isActive = currentPage === item.id;
                if (item.id === "negosiasi" && !isAuthenticated) return null;
                if (item.id === "akun" && !isAuthenticated) return null;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-navMenu text-center py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${
                        isActive
                          ? "bg-ruangTemuLight text-mainColor shadow-sm"
                          : "text-gray-600 hover:bg-appLighterPink/80 hover:text-[#B8941F]"
                      }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>


            {/* === LOGIN / USER (KANAN) === */}
            <div className="flex items-center ml-4">
              <div className="hidden lg:flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-2 py-2 shadow-sm border border-[#f4e4c1]/40">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 rounded-full hover:bg-[#FFE4E9]/30 transition-colors">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] text-white text-xs">
                          {user?.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div>
                        <p>{user?.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                        <p className="text-xs text-[#D4AF37] mt-1">
                          {user?.role === 'vendor'
                            ? '🏢 Vendor'
                            : '💑 Calon Pengantin'}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate('akun')}>
                      Akun Saya
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600 font-medium"
                    >
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r w-36 from-[#D4AF37] to-[#FFB6C1] hover:brightness-95 text-white font-medium rounded-full px-5 py-2"
                  size="sm"
                >
                  Login
                </Button>
              )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* === LOGIN MODAL === */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
          <div className="relative z-[1000]">
            <LoginModal onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

// import { Home, Search, Calculator, FileText, Star, Store, User, Menu, X, LogOut, LogIn } from 'lucide-react';
// import { useState } from 'react';
// import { useAuth } from './AuthContext';
// import { Button } from './ui/button';
// import { LoginModal } from './LoginModal';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';

// interface NavbarProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
// }

// export function Navbar({ currentPage, onNavigate }: NavbarProps) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth();

//   // Dynamic menu items based on user role
//   const getMenuItems = () => {
//     if (user?.role === 'vendor') {
//       return [
//         { id: 'vendor', label: 'Dashboard', icon: Store },
//         { id: 'negosiasi', label: 'Chat & Negosiasi', icon: FileText },
//         { id: 'review', label: 'Komunitas', icon: Star },
//         { id: 'akun', label: 'Akun Saya', icon: User },
//       ];
//     }
//     return [
//       { id: 'beranda', label: 'Beranda', icon: Home },
//       { id: 'eksplor', label: 'Eksplor Venue', icon: Search },
//       { id: 'estimator', label: 'Budget Estimator', icon: Calculator },
//       { id: 'negosiasi', label: 'Negosiasi & Kontrak', icon: FileText },
//       { id: 'review', label: 'Komunitas', icon: Star },
//       { id: 'akun', label: 'Akun Saya', icon: User },
//     ];
//   };

//   const menuItems = getMenuItems();

//   return (
//     <nav className="sticky top-0 z-50 bg-white border-b border-[#F4E4C1] shadow-sm">
//       <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div onClick={() => onNavigate("")} className="flex items-center gap-2">
//             <img
//                   src="/assets/img/logo-fix.png"
//                   alt="Ruang Temu Logo"
//                   className="h-10 w-15"
//             />
//             <span className="text-appGold bg-clip-text font-dancing text-3xl font-bolder">Ruang Temu</span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center gap-1">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = currentPage === item.id;
              
//               // Hide negosiasi for non-authenticated users
//               if (item.id === 'negosiasi' && !isAuthenticated) {
//                 return null;
//               }
              
//               // Hide akun saya for non-authenticated users
//               if (item.id === 'akun' && !isAuthenticated) {
//                 return null;
//               }
              
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => onNavigate(item.id)}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
//                     isActive
//                       ? 'bg-gradient-to-r from-[#F4E4C1] to-[#FFE4E9] text-[#B8941F]'
//                       : 'text-gray-600 hover:bg-[#FFE4E9]/30'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span className="text-sm">{item.label}</span>
//                 </button>
//               );
//             })}
            
//             {/* User Menu or Login */}
//             {isAuthenticated ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="ml-2 flex items-center gap-2 p-1 rounded-full hover:bg-[#FFE4E9]/30 transition-colors">
//                     <Avatar className="w-8 h-8">
//                       <AvatarImage src={user?.avatar} />
//                       <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] text-white text-xs">
//                         {user?.name.substring(0, 2).toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                   </button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56">
//                   <DropdownMenuLabel>
//                     <div>
//                       <p>{user?.name}</p>
//                       <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
//                       <p className="text-xs text-[#D4AF37] mt-1">
//                         {user?.role === 'vendor' ? '🏢 Vendor' : '💑 Calon Pengantin'}
//                       </p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={() => onNavigate('akun')}>
//                     <User className="w-4 h-4 mr-2" />
//                     Akun Saya
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={logout} className="text-red-600">
//                     <LogOut className="w-4 h-4 mr-2" />
//                     Keluar
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Button
//                 onClick={() => setShowLoginModal(true)}
//                 className="ml-2 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
//                 size="sm"
//               >
//                 <LogIn className="w-4 h-4 mr-2" />
//                 Masuk
//               </Button>
//             )}
//           </div>

//           {/* Mobile - Show only Login/User Avatar (no hamburger) */}
//           <div className="lg:hidden flex items-center">
//             {isAuthenticated ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="flex items-center gap-2 p-1 rounded-full hover:bg-[#FFE4E9]/30 transition-colors">
//                     <Avatar className="w-8 h-8">
//                       <AvatarImage src={user?.avatar} />
//                       <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] text-white text-xs">
//                         {user?.name.substring(0, 2).toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                   </button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56">
//                   <DropdownMenuLabel>
//                     <div>
//                       <p>{user?.name}</p>
//                       <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
//                       <p className="text-xs text-[#D4AF37] mt-1">
//                         {user?.role === 'vendor' ? '🏢 Vendor' : '💑 Calon Pengantin'}
//                       </p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={logout} className="text-red-600">
//                     <LogOut className="w-4 h-4 mr-2" />
//                     Keluar
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Button
//                 onClick={() => setShowLoginModal(true)}
//                 className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
//                 size="sm"
//               >
//                 <LogIn className="w-4 h-4 mr-2" />
//                 Masuk
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Login Modal */}
//       {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
//     </nav>
//   );
// }
