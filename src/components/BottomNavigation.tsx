import { Home, Search, Calculator, FileText, Star, Store, User } from 'lucide-react';
import { useAuth } from './AuthContext';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const { user, isAuthenticated } = useAuth();

  // ✅ Dynamic menu items based on role
  const getMenuItems = () => {
    // 🧩 Jika vendor login
    if (user?.role === 'vendor') {
      return [
        { id: 'vendor', label: 'Dashboard', icon: Store },
        { id: 'negosiasi', label: 'Chat', icon: FileText },
        { id: 'review', label: 'Komunitas', icon: Star },
        { id: 'akun', label: 'Akun', icon: User },
      ];
    }

    // 🧩 Untuk user biasa atau belum login
    const items = [
      { id: 'beranda', label: 'Beranda', icon: Home },
      { id: 'estimator', label: 'Budget', icon: Calculator },
      { id: 'eksplor', label: 'Eksplor', icon: Search, isCenter: true }, // tombol tengah
      { id: 'review', label: 'Komunitas', icon: Star },
      { id: 'akun', label: 'Akun', icon: User },
    ];

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <nav className="lg:hidden fixed py-1 bottom-0 left-0 right-0 z-50 bg-mainColorLitest border-t border-[#F4E4C1] shadow-lg safe-area-bottom">
      <div className="flex justify-around items-center py-2 relative">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          // 💠 Tombol tengah (Eksplor)
          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex-1 flex flex-col items-center text-white text-center relative -mt-16 focus:outline-none"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-mainColorLite transition-all duration-300
                    ${
                      isActive
                        ? 'bg-secondColor'
                        : 'bg-mainColor'
                    }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
              </button>
            );
          }

          // 💠 Tombol biasa
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                isActive ? 'text-mainColor' : 'text-gray-600 hover:text-[#B8941F]'
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : 'scale-100'} transition-transform`}>
                <Icon className="w-6 h-6" />
              
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}


// import { Home, Search, Calculator, FileText, Star, Store, User } from 'lucide-react';
// import { useAuth } from './AuthContext';

// interface BottomNavigationProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
// }

// export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
//   const { user, isAuthenticated } = useAuth();

//   // Dynamic menu items based on user role
//   const getMenuItems = () => {
//     if (user?.role === 'vendor') {
//       return [
//         { id: 'vendor', label: 'Dashboard', icon: Store },
//         { id: 'negosiasi', label: 'Chat', icon: FileText },
//         { id: 'review', label: 'Komunitas', icon: Star },
//         { id: 'akun', label: 'Akun', icon: User },
//       ];
//     }

//     // For couple/non-authenticated users
//     const items = [
//       { id: 'beranda', label: 'Beranda', icon: Home },
//       { id: 'eksplor', label: 'Eksplor', icon: Search },
//       { id: 'estimator', label: 'Budget', icon: Calculator },
//       { id: 'review', label: 'Komunitas', icon: Star },
//     ];

//     // Add authenticated-only menu items
//     if (isAuthenticated) {
//       items.push({ id: 'akun', label: 'Akun', icon: User });
//     }

//     return items;
//   };

//   const menuItems = getMenuItems();

//   const gridCols = menuItems.length === 4 ? 'grid-cols-4' : 'grid-cols-5';

//   return (
//     <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#F4E4C1] shadow-lg safe-area-bottom">
//       <div className={`grid ${gridCols}`}>
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = currentPage === item.id;

//           return (
//             <button
//               key={item.id}
//               onClick={() => onNavigate(item.id)}
//               className={`flex flex-col items-center justify-center py-3 px-2 transition-all relative ${
//                 isActive
//                   ? 'text-mainColor'
//                   : 'text-gray-500 active:bg-gray-100'
//               }`}
//             >
//               {isActive && (
//                 <div className="absolute inset-0 bg-gradient-to-b from-[#F4E4C1]/20 to-transparent" />
//               )}
//               <div className={`relative ${isActive ? 'transform scale-110' : ''} transition-transform`}>
//                 <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
//                 {isActive && (
//                   <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-mainColor rounded-full" />
//                 )}
//               </div>
//               <span className={`text-xs mt-1 relative ${isActive ? '' : ''}`}>
//                 {item.label}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }
