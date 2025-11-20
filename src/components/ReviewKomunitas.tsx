import { Star, ThumbsUp, MessageSquare, CheckCircle, Search, TrendingUp, Send, Plus, X, Clock, Eye, User, Group } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogPortal, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { LoginModal } from './LoginModal';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ReviewHelpful = ({ initialLikes = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-2 text-sm transition-colors
        ${liked ? "text-red-500" : "text-gray-600"} 
        hover:text-[#D4AF37]`}
    >
      <ThumbsUp
        className={`w-4 h-4 transition-colors 
          ${liked ? "fill-red-500 text-red-500" : ""}`}
      />
      Helpful ({likes})
    </button>
  );
};


const reviews = [
  {
    id: 1,
    venueName: 'Grand Ballroom Elegance',
    userName: 'Sarah Wijaya',
    userAvatar: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU5OTA2NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    date: '2 hari lalu',
    comment: 'Venue yang sangat bagus! Staff profesional dan dekorasi sangat indah. Acara pernikahan kami berjalan sempurna. Sangat recommended untuk yang mencari venue elegant!',
    verified: true,
    likes: 24,
    replies: 3,
    images: [
      'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc1OTk3MzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    id: 2,
    venueName: 'Royal Garden Venue',
    userName: 'Ahmad Rizky',
    userAvatar: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU5OTA2NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    date: '1 minggu lalu',
    comment: 'Outdoor venue yang cantik dengan taman yang asri. Foto-foto kami jadi luar biasa bagus. Harga juga worth it dengan apa yang didapat.',
    verified: true,
    likes: 18,
    replies: 2,
    images: [
      'https://images.unsplash.com/photo-1759490821541-f78bb13a752d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwd2VkZGluZ3xlbnwxfHx8fDE3NTk5MzYyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    id: 3,
    venueName: 'Romantic Restaurant Hall',
    userName: 'Maya Putri',
    userAvatar: 'https://images.unsplash.com/photo-1665258608444-54f857b2ed8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU5OTA2NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    date: '2 minggu lalu',
    comment: 'Venue intimate yang cocok untuk acara lamaran. Ambience romantis dan makanannya enak. Pelayanan ramah dan cepat.',
    verified: true,
    likes: 15,
    replies: 1,
    images: [],
  },
];

const forumTopics = [
  {
    id: 1,
    title: 'Tips Memilih Venue untuk Budget Terbatas',
    author: 'Dina Maulida',
    replies: 23,
    views: 456,
    lastActive: '2 jam lalu',
    trending: true,
    content: `Memilih venue untuk acara dengan budget terbatas bisa menjadi tantangan. 
    Beberapa tips yang bisa dicoba antara lain: mencari venue di luar pusat kota, 
    memilih hari kerja agar harga lebih murah, dan melakukan negosiasi langsung 
    dengan pihak pengelola venue. Selain itu, datang saat jam sepi akan memberikan 
    kesempatan untuk mendapatkan penawaran lebih baik karena venue tidak sedang ramai.`,
  },
  {
    id: 2,
    title: 'Pengalaman Negosiasi Harga dengan Vendor',
    author: 'Rizki Pratama',
    replies: 18,
    views: 312,
    lastActive: '5 jam lalu',
    trending: false,
    content: `Saat negosiasi harga dengan vendor, penting untuk tahu detail kebutuhanmu dulu. 
    Setelah itu, mintalah breakdown harga dan bandingkan dengan vendor lain. 
    Banyak vendor sebenarnya fleksibel, terutama jika kamu tidak minta jadwal weekend. 
    Jangan ragu untuk meminta bonus kecil seperti free lighting atau extra kursi.`,
  },
  {
    id: 3,
    title: 'Rekomendasi Vendor Dekorasi di Jakarta',
    author: 'Siti Nur',
    replies: 34,
    views: 678,
    lastActive: '1 hari lalu',
    trending: true,
    content: `Jakarta punya ratusan vendor dekorasi, tapi tidak semua sesuai budget. 
    Beberapa rekomendasi berdasarkan pengalaman komunitas: vendor minimalis untuk budget menengah, 
    vendor rustic untuk tema intimate wedding, dan vendor premium untuk gala dinner. 
    Selalu cek portofolionya, jangan dari katalog saja.`,
  },
  {
    id: 4,
    title: 'Checklist Persiapan Pernikahan 3 Bulan',
    author: 'Andi Wijaya',
    replies: 42,
    views: 892,
    lastActive: '1 hari lalu',
    trending: true,
    content: `Persiapan pernikahan dalam waktu 3 bulan memang mungkin. 
    Mulailah dari booking venue, tentukan konsep acara, pilih vendor utama (dokumentasi, dekorasi,
    catering), lalu lanjutkan ke undangan dan fitting baju. Gunakan spreadsheet untuk timeline. 
    Banyak pasangan merasa lebih efektif karena tidak terlalu lama menunggu.`,
  },
];


export function ReviewKomunitas() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewTopicDialog, setShowNewTopicDialog] = useState(false);
  const [showTopicDetailDialog, setShowTopicDetailDialog] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newReply, setNewReply] = useState('');
  const [tempReplies, setTempReplies] = useState<any[]>([]); // simpan balasan sementara

  const handleCloseTopicDetail = () => {
    setShowTopicDetailDialog(false);
    setSelectedTopic(null);
    setNewReply('');
  };

  const handleCreateTopic = () => {
    if (!newTopicTitle.trim() || !newTopicContent.trim()) {
      toast.error('Mohon lengkapi judul dan konten topik');
      return;
    }
    toast.success('Topik baru berhasil dibuat!');
    setShowNewTopicDialog(false);
    setNewTopicTitle('');
    setNewTopicContent('');
  };

  const handleViewTopic = (topic: any) => {
    setSelectedTopic(topic);
    setShowTopicDetailDialog(true);
  };

  const handlePostReply = () => {
  if (!newReply.trim()) {
    toast.error('Mohon isi balasan Anda');
    return;
  }

  // buat objek balasan sementara
  const replyObj = {
    id: Date.now(),
    author: 'Anda',
    avatarBg: '#D4AF37',
    avatarText: 'A',
    content: newReply,
    timeAgo: 'Baru saja',
  };

  // tambahkan ke list balasan sementara
  setTempReplies([replyObj, ...tempReplies]);
  setNewReply('');
  toast.success('Balasan berhasil diposting!');
};

  const handleCreateTopicClick = () => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu untuk membuat topik');
      navigate("/login")
      return;
    }
    setShowNewTopicDialog(true);
  };

  const handleReplyClick = () => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu untuk membalas');
      setShowLoginModal(true);
      return;
    }
    handlePostReply();
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-ruangTemuPremier/20">
      <div
              aria-hidden
              className="absolute top-16 left-0 w-full h-[40dvh] md:h-[35dvh] bg-[url('/assets/img/blob.png')] 
                   bg-no-repeat  
                   bg-[length:360%] 
                   md:bg-[length:200%]
                   bg-center
                   z-0"
            />
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Header */}
              <div className="mt-16"></div>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F4E4C1] to-[#FFE4E9] rounded-full mb-4">
                  <Group className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm text-gray-700">Komunitas & Diskusi</span>
                </div>

                <h1 className="mb-3 text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-white font-dancingScript">
                  Cerita & Pengalaman Nyata
                </h1>

                <p className="text-white max-w-2xl mx-auto">
                  Temukan ulasan jujur, pengalaman pengguna lain, dan insight dari komunitas untuk membantu Anda membuat keputusan yang lebih yakin.
                </p>
              </div>
              
       <div className="flex flex-col gap-4 mb-8 bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]">

        <Tabs defaultValue="reviews" className="space-y-6 p-4">
          <TabsList
            className="
              relative flex gap-2 py-6 rounded-2xl shadow-md 
              bg-gradient-to-r from-ruangTemuPremier/30 via-ruangTemuBold/20 to-ruangTemuPremier/30
              backdrop-blur-md
              before:absolute before:inset-0 before:rounded-2xl 
              before:border before:border-white/10 before:shadow-inner
            "
          >
            <TabsTrigger
              value="reviews"
              className="
                group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold 
                transition-all duration-300 relative overflow-hidden
                py-4
                data-[state=active]:text-white
                data-[state=active]:bg-ruangTemuSecond
                data-[state=active]:shadow-[0_4px_14px_rgba(180,90,255,0.4)]

                text-mainColor/80 hover:text-mainColor
                hover:bg-ruangTemuPremier/60
                hover:shadow-[0_4px_12px_rgba(180,90,255,0.35)]

                border border-white/5
                backdrop-blur-sm
              "
            >
              <Star className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Review Pengguna</span>
            </TabsTrigger>

            <TabsTrigger
              value="forum"
              className="
                group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold 
                transition-all duration-300 relative overflow-hidden
                py-4
                data-[state=active]:text-white
                data-[state=active]:bg-ruangTemuSecond
                data-[state=active]:shadow-[0_4px_14px_rgba(180,90,255,0.4)]

                text-mainColor/80 hover:text-mainColor
                hover:bg-ruangTemuPremier/60
                hover:shadow-[0_4px_12px_rgba(180,90,255,0.35)]

                border border-white/5
                backdrop-blur-sm
              "
            >
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Forum Diskusi</span>
            </TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Search */}
            <Card className="border-[#F4E4C1]">
              <CardContent className="p-4 -mb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Cari review berdasarkan venue atau nama pengguna..."
                    className="pl-10 border-[#F4E4C1]"
                  />
                </div>
              </CardContent>
            </Card>

           {/* Community Stats */}
          <div className="grid md:grid-cols-3 gap-4">

            <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-ruangTemuPremier/10 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-ruangTemuSecond rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-semibold mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                  4.8
                </p>
                <p className="text-sm text-gray-600">Rating Rata-rata Semua Venue</p>
              </CardContent>
            </Card>

            <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#F4E4C1]/20 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-ruangTemuSecond rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-semibold mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                  1,247
                </p>
                <p className="text-sm text-gray-600">Total Review Terverifikasi</p>
              </CardContent>
            </Card>

            <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-ruangTemuPremier/10 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-ruangTemuSecond rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-semibold mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                  98%
                </p>
                <p className="text-sm text-gray-600">Kepuasan Pengguna</p>
              </CardContent>
            </Card>

          </div>


            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="border-[#F4E4C1]/60 bg-white/60 backdrop-blur-sm 
                            shadow-sm hover:shadow-lg transition-all duration-300 
                            rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">

                      {/* Avatar */}
                      <Avatar className="w-14 h-14 shadow-md ring-2 ring-[#F4E4C1]/50">
                        <AvatarImage src={review.userAvatar} />
                        <AvatarFallback className="bg-[#F4E4C1]/20 text-[#D4AF37] font-bold">
                          {review.userName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-gray-800">{review.userName}</p>

                              {review.verified && (
                                <Badge
                                  className="bg-ruangTemuSecond text-white border-0 text-xs px-2 py-0.5 
                                            flex items-center gap-1 shadow-sm"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  Terverifikasi
                                </Badge>
                              )}
                            </div>

                            <p className="text-xs text-gray-500 italic">
                              Review untuk: {review.venueName}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-[#D4AF37] text-[#D4AF37] drop-shadow-sm"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {review.comment}
                        </p>

                        {/* Images */}
                        {review.images.length > 0 && (
                          <div className="flex gap-3 mb-4">
                            {review.images.map((img, idx) => (
                              <div
                                key={idx}
                                className="w-28 h-28 rounded-xl overflow-hidden 
                                          border border-[#F4E4C1]/40 shadow-sm"
                              >
                                <ImageWithFallback
                                  src={img}
                                  alt={`Review ${idx + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex gap-6 pt-4 border-t border-[#F4E4C1]/30">
                        <ReviewHelpful initialLikes={review.likes} />

                          <button
                            className="flex items-center gap-2 text-sm text-gray-600 
                                      hover:text-[#D4AF37] transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Balasan ({review.replies})
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>


            <div className="text-center">
              <Button variant="outline" className="border-[#D4AF37] text-secondColor hover:bg-[#F4E4C1]/30">
                Muat Lebih Banyak Review
              </Button>
            </div>
          </TabsContent>

          {/* Forum Tab */}
          <TabsContent value="forum" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full">
              {/* Input full width */}
              <div className="relative flex-1">
                 <Card className="border-[#F4E4C1]">
              <CardContent className="p-4 -mb-2 flex gap-4">
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Cari topik diskusi..."
                  className="pl-10 border-[#F4E4C1] w-full"
                />
                 <Button 
                onClick={handleCreateTopicClick}
                className="bg-ruangTemuBold hover:brightness-90 text-white flex-shrink-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Buat Topik Baru
              </Button>
                </CardContent>
                </Card>
              </div>

              {/* Button */}
             
            </div>

            {/* Forum Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border border-[#F4E4C1]/60 rounded-2xl 
                                bg-gradient-to-br from-white via-[#FFF8EF] to-[#F4E4C1]/30 
                                shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl 
                                  bg-ruangTemuSecond 
                                  flex items-center justify-center shadow">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>

                  <p className="text-3xl font-semibold mb-1 
                                bg-ruangTemuSecond
                                bg-clip-text text-transparent">
                    347
                  </p>

                  <p className="text-sm text-gray-600 tracking-wide">
                    Total Post
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-[#F4E4C1]/60 rounded-2xl 
                                bg-gradient-to-br from-white via-[#FFF1F6] to-ruangTemuPremier/30 
                                shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl 
                                  bg-ruangTemuSecond
                                  flex items-center justify-center shadow">
                    <User className="w-7 h-7 text-white" />
                  </div>

                  <p className="text-3xl font-semibold mb-1 
                                bg-ruangTemuSecond
                                bg-clip-text text-transparent">
                    560
                  </p>

                  <p className="text-sm text-gray-600 tracking-wide">
                    Pengguna Berkontribusi
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-[#F4E4C1]/60 rounded-2xl 
                                bg-gradient-to-br from-white via-[#FFF8EF] to-[#F4E4C1]/30 
                                shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl 
                                  bg-ruangTemuSecond
                                  flex items-center justify-center shadow">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>

                  <p className="text-3xl font-semibold mb-1 
                                bg-ruangTemuSecond
                                bg-clip-text text-transparent">
                    5.2
                  </p>

                  <p className="text-sm text-gray-600 tracking-wide">
                    Rata-rata Balasan per Post
                  </p>
                </CardContent>
              </Card>
            </div>


            {/* Forum Topics */}
            <div className="space-y-4">
  {forumTopics.map((topic) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <Card
        key={topic.id}
        className="border-[#F4E4C1] hover:shadow-lg transition-all rounded-xl bg-white/70 backdrop-blur-sm"
      >
        <CardContent className="p-6">

          {/* Author */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-8 h-8 shadow-sm">
              <AvatarFallback className="bg-[#F4E4C1] text-[#D4AF37] text-sm">
                {topic.author[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-700">{topic.author}</p>
              <p className="text-xs text-gray-500">mengawali diskusi</p>
            </div>
          </div>

          {/* Title */}
          <div className="flex items-start gap-2 mb-3">
            <h4
              className="flex-1 text-lg font-semibold text-gray-800 hover:text-[#D4AF37] transition-colors leading-snug"
              onClick={() => handleViewTopic(topic)}
            >
              {topic.title}
            </h4>

            {topic.trending && (
              <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white border-0 shadow-sm flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>

          {/* Content with clamp + fade + expand */}
            <div className="relative">
              {/* Text Wrapper */}
              <div className="relative">
                <p className={`${expanded ? "" : "line-clamp-3"} text-gray-700 leading-relaxed`}>
                  {topic.content}
                </p>

                {/* Fade overlay (only over text) */}
                {!expanded && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
                )}
              </div>

              {/* Button OUTSIDE the faded area */}
              <button
                className="mt-2 relative z-10 text-sm font-medium text-[#D4AF37] hover:text-[#b89230] transition-colors"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Tutup" : "Lihat Selengkapnya"}
              </button>
            </div>


          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-4 border-t border-[#F4E4C1]/30 mt-4">
            <span className="flex items-center gap-1 cursor-pointer">
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              {topic.replies} balasan
            </span>

            <span className="flex items-center gap-1 cursor-pointer">
              <Eye className="w-4 h-4 text-[#FFB6C1]" />
              {topic.views} views
            </span>

            <span className="flex items-center gap-1 cursor-pointer">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              {topic.lastActive}
            </span>
          </div>

        </CardContent>
      </Card>
    );
  })}
</div>



            <div className="text-center">
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30">
                Muat Lebih Banyak Topik
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>

      {/* New Topic Dialog */}
      {/* <Dialog open={showNewTopicDialog} onOpenChange={setShowNewTopicDialog}>
         <DialogPortal>
          <DialogContent className="sm:max-w-[600px] bg-white rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#D4AF37]" />
                Buat Topik Diskusi Baru
              </DialogTitle>
              <DialogDescription>
                Mulai diskusi baru dengan komunitas Ruang Temu
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="topicTitle">Judul Topik AS*</Label>
                <Input
                  id="topicTitle"
                  placeholder="Contoh: Tips Memilih Venue untuk Budget Terbatas"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topicContent">Konten Diskusi *</Label>
                <Textarea
                  id="topicContent"
                  placeholder="Tulis pertanyaan atau topik diskusi Anda di sini..."
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  rows={6}
                  className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 Tips: Buat judul yang jelas dan deskriptif agar mudah ditemukan oleh anggota lain
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewTopicDialog(false);
                  setNewTopicTitle('');
                  setNewTopicContent('');
                }}
              >
                Batal
              </Button>
              <Button
                onClick={handleCreateTopic}
                className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Posting Topik
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog> */}

      {showNewTopicDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* Background overlay */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setShowNewTopicDialog(false)}
    />

    {/* Modal container */}
    <div className="relative bg-white w-full max-w-md sm:max-w-lg rounded-lg shadow-lg p-6 overflow-auto max-h-[90vh] z-10">
      {/* Header */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#FFB6C1]/20">
        <div className="flex items-center gap-2 mb-1">
          <Plus className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold">Buat Topik Diskusi Baru</h2>
        </div>
        <p className="text-sm text-gray-600">
          Mulai diskusi baru dengan komunitas Ruang Temu
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topicTitle">Judul Topik AS*</Label>
          <Input
            id="topicTitle"
            placeholder="Contoh: Tips Memilih Venue untuk Budget Terbatas"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="topicContent">Konten Diskusi *</Label>
          <Textarea
            id="topicContent"
            placeholder="Tulis pertanyaan atau topik diskusi Anda di sini..."
            value={newTopicContent}
            onChange={(e) => setNewTopicContent(e.target.value)}
            rows={6}
            className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
          />
        </div>

        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 Tips: Buat judul yang jelas dan deskriptif agar mudah ditemukan oleh anggota lain
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setShowNewTopicDialog(false);
            setNewTopicTitle('');
            setNewTopicContent('');
          }}
        >
          Batal
        </Button>
        <Button
          onClick={handleCreateTopic}
          className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
        >
          <Send className="w-4 h-4 mr-2" />
          Posting Topik
        </Button>
      </div>
    </div>
  </div>
)}


      {/* Topic Detail Dialog */}
      {/* <Dialog  open={showTopicDetailDialog} onOpenChange={setShowTopicDetailDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-start gap-2">
              <div className="flex-1">
                <h3 className="mb-2">{selectedTopic?.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[#F4E4C1] text-[#D4AF37] text-xs">
                        {selectedTopic?.author?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedTopic?.author}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedTopic?.lastActive}
                  </span>
                </div>
              </div>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Detail diskusi dan semua balasan dari topik ini
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
      
            <Card className="border-[#F4E4C1] bg-gradient-to-br from-[#F4E4C1]/10 to-ruangTemuPremier/10">
              <CardContent className="p-4">
                <p className="text-gray-700 mb-4">
                  Halo semuanya! Saya sedang mencari venue untuk pernikahan dengan budget yang terbatas. 
                  Apakah ada yang punya tips atau rekomendasi venue yang bagus tapi dengan harga yang reasonable? 
                  Budget saya sekitar 30-50 juta untuk 200 tamu. Terima kasih!
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedTopic?.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {selectedTopic?.replies} balasan
                  </span>
                </div>
              </CardContent>
            </Card>

            
            <div className="space-y-3">
              <h4 className="text-sm text-gray-600">Balasan ({selectedTopic?.replies || 0})</h4>
              
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex gap-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-ruangTemuPremier text-[#FFB6C1]">
                        R
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm">Rina Susanti</p>
                        <span className="text-xs text-gray-500">1 jam lalu</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Coba lihat di area Tangerang atau Bekasi, biasanya lebih murah dibanding Jakarta. 
                        Saya dulu pakai venue di Bekasi untuk 250 tamu cuma 45 juta sudah include katering!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex gap-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-[#F4E4C1] text-[#D4AF37]">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm">Andi Wijaya</p>
                        <span className="text-xs text-gray-500">3 jam lalu</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Tips: Book di hari weekday bisa lebih murah 30-40%. Temen saya nikah Kamis dan dapat diskon gede!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          
            <div className="space-y-2 border-t pt-4">
              <Label htmlFor="newReply">Tulis Balasan</Label>
              <Textarea
                id="newReply"
                placeholder="Bagikan pengalaman atau saran Anda..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows={3}
                className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleReplyClick}
                  size="sm"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Balasan
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}

       {showTopicDetailDialog && (
   <div
  className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50"
  onClick={handleCloseTopicDetail}
>
  {/* modal content */}
  <div
    className="relative bg-white rounded-lg shadow-lg max-w-[700px] w-full max-h-[90vh] flex flex-col z-10"
    onClick={(e) => e.stopPropagation()}
  >
    {/* header */}
    <div className="flex justify-between items-center p-3 rounded-t-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#FFB6C1]/20">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{selectedTopic?.title}</h3>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-[#F4E4C1] text-[#D4AF37] text-xs">
                {selectedTopic?.author?.[0]}
              </AvatarFallback>
            </Avatar>
            <span>{selectedTopic?.author}</span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {selectedTopic?.lastActive}
          </span>
        </div>
      </div>
      <button
        onClick={handleCloseTopicDetail}
        className="text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full"
      >
        ✕
      </button>
    </div>

    {/* konten + komentar scrollable */}
    <div className="flex-1 flex flex-col overflow-hidden space-y-4 p-4">
      {/* post utama */}
      <Card className="border-[#F4E4C1] bg-gradient-to-br from-[#F4E4C1]/10 to-ruangTemuPremier/10">
        <CardContent className="p-4">
          <p className="text-gray-700 mb-4">
            Halo semuanya! Saya sedang mencari venue untuk pernikahan dengan budget
            yang terbatas. Apakah ada yang punya tips atau rekomendasi venue yang bagus
            tapi dengan harga yang reasonable? Budget saya sekitar 30-50 juta untuk 200 tamu.
            Terima kasih!
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {selectedTopic?.views} views
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {selectedTopic?.replies} balasan
            </span>
          </div>
        </CardContent>
      </Card>

      {/* daftar komentar scrollable */}
      <div className="flex-1 overflow-y-auto space-y-3">
        <h4 className="text-sm text-gray-600 sticky top-0 bg-white pt-2">
          Balasan {(selectedTopic?.replies || 0) + tempReplies.length}
        </h4>

        {/* balasan lama */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex gap-3 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-ruangTemuPremier text-[#FFB6C1]">
                  R
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm">Rina Susanti</p>
                  <span className="text-xs text-gray-500">1 jam lalu</span>
                </div>
                <p className="text-sm text-gray-700">
                  Coba lihat di area Tangerang atau Bekasi, biasanya lebih murah dibanding Jakarta.
                  Saya dulu pakai venue di Bekasi untuk 250 tamu cuma 45 juta sudah include katering!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex gap-3 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-[#F4E4C1] text-[#D4AF37]">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm">Andi Wijaya</p>
                  <span className="text-xs text-gray-500">3 jam lalu</span>
                </div>
                <p className="text-sm text-gray-700">
                  Tips: Book di hari weekday bisa lebih murah 30-40%. Temen saya nikah Kamis dan dapat diskon gede!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* balasan baru */}
        {tempReplies.map((reply) => (
          <Card key={reply.id} className="border-gray-200 bg-yellow-50 relative">
            <CardContent className="p-4">
              <div className="flex gap-3 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#D4AF37] text-white">
                    {reply.avatarText}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm">{reply.author}</p>
                      <span className="text-xs text-gray-500">{reply.timeAgo}</span>
                    </div>
                    <button
                      onClick={() => {
                        setTempReplies(tempReplies.filter((r) => r.id !== reply.id));
                        toast.success('Komentar berhasil dihapus!');
                      }}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{reply.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* input komentar selalu di bawah modal */}
    <div className="p-4 border-t bg-white shrink-0">
      <Label className="mb-2" htmlFor="newReply">Tulis Balasan</Label>
      <Textarea
        id="newReply"
        placeholder="Bagikan pengalaman atau saran Anda..."
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        rows={3}
        className="border-[#F4E4C1] mt-1 focus-visible:ring-[#D4AF37]"
      />
      <div className="flex justify-end mt-2">
        <Button
          onClick={handleReplyClick}
          size="sm"
          className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
        >
          <Send className="w-4 h-4 mr-2" />
          Kirim Balasan
        </Button>
      </div>
    </div>
  </div>
</div>

)}


      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
