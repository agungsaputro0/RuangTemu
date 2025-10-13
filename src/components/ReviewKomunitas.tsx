import { Star, ThumbsUp, MessageSquare, CheckCircle, Search, TrendingUp, Send, Plus, X, Clock, Eye, User } from 'lucide-react';
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
  },
  {
    id: 2,
    title: 'Pengalaman Negosiasi Harga dengan Vendor',
    author: 'Rizki Pratama',
    replies: 18,
    views: 312,
    lastActive: '5 jam lalu',
    trending: false,
  },
  {
    id: 3,
    title: 'Rekomendasi Vendor Dekorasi di Jakarta',
    author: 'Siti Nur',
    replies: 34,
    views: 678,
    lastActive: '1 hari lalu',
    trending: true,
  },
  {
    id: 4,
    title: 'Checklist Persiapan Pernikahan 3 Bulan',
    author: 'Andi Wijaya',
    replies: 42,
    views: 892,
    lastActive: '1 hari lalu',
    trending: true,
  },
];

export function ReviewKomunitas() {
  const { isAuthenticated } = useAuth();
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
      setShowLoginModal(true);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Komunitas</h1>
          <p className="text-gray-600">Baca pengalaman pengguna lain dan bergabung dalam diskusi</p>
        </div>

        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="bg-[#FFE4E9]/30 p-1">
            <TabsTrigger value="reviews" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#FFB6C1] data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Review Terverifikasi
            </TabsTrigger>
            <TabsTrigger value="forum" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#FFB6C1] data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Forum Diskusi
            </TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Search */}
            <Card className="border-[#F4E4C1]">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Cari review berdasarkan venue atau nama pengguna..."
                    className="pl-10 border-[#F4E4C1]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#F4E4C1]/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                    4.8
                  </p>
                  <p className="text-sm text-gray-600">Rating Rata-rata</p>
                </CardContent>
              </Card>
              <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#FFE4E9]/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                    1,247
                  </p>
                  <p className="text-sm text-gray-600">Review Terverifikasi</p>
                </CardContent>
              </Card>
              <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#F4E4C1]/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] rounded-full flex items-center justify-center mx-auto mb-3">
                    <ThumbsUp className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl mb-1 bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] bg-clip-text text-transparent">
                    98%
                  </p>
                  <p className="text-sm text-gray-600">Kepuasan Pelanggan</p>
                </CardContent>
              </Card>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="border-[#F4E4C1] hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.userAvatar} />
                        <AvatarFallback>{review.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p>{review.userName}</p>
                              {review.verified && (
                                <Badge className="bg-[#D4AF37] text-white border-0 text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Terverifikasi
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{review.venueName}</p>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>

                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-[#D4AF37] text-[#D4AF37]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-gray-700 mb-4">{review.comment}</p>

                        {review.images.length > 0 && (
                          <div className="flex gap-2 mb-4">
                            {review.images.map((img, idx) => (
                              <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden">
                                <ImageWithFallback
                                  src={img}
                                  alt={`Review ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4AF37] transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({review.likes})
                          </button>
                          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4AF37] transition-colors">
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
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30">
                Muat Lebih Banyak Review
              </Button>
            </div>
          </TabsContent>

          {/* Forum Tab */}
          <TabsContent value="forum" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Cari topik diskusi..."
                  className="pl-10 border-[#F4E4C1]"
                />
              </div>
              <Button 
                onClick={handleCreateTopicClick}
                className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] hover:brightness-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Buat Topik Baru
              </Button>
            </div>

            {/* Forum Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#F4E4C1]/20">
                <CardContent className="p-4 text-center">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
                  <p className="text-2xl mb-1 text-[#D4AF37]">347</p>
                  <p className="text-sm text-gray-600">Total Topik</p>
                </CardContent>
              </Card>
              <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#FFE4E9]/20">
                <CardContent className="p-4 text-center">
                  <User className="w-8 h-8 mx-auto mb-2 text-[#FFB6C1]" />
                  <p className="text-2xl mb-1 text-[#FFB6C1]">1,234</p>
                  <p className="text-sm text-gray-600">Anggota Aktif</p>
                </CardContent>
              </Card>
              <Card className="border-[#F4E4C1] bg-gradient-to-br from-white to-[#F4E4C1]/20">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
                  <p className="text-2xl mb-1 text-[#D4AF37]">12</p>
                  <p className="text-sm text-gray-600">Topik Trending</p>
                </CardContent>
              </Card>
            </div>

            {/* Forum Topics */}
            <div className="space-y-3">
              {forumTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className="border-[#F4E4C1] hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewTopic(topic)}
                >
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          <h4 className="flex-1 hover:text-[#D4AF37] transition-colors">{topic.title}</h4>
                          {topic.trending && (
                            <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#FFB6C1] text-white border-0">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-[#F4E4C1] text-[#D4AF37] text-xs">
                              {topic.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-gray-600">Oleh {topic.author}</p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {topic.replies} balasan
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {topic.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {topic.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30">
                Muat Lebih Banyak Topik
              </Button>
            </div>
          </TabsContent>
        </Tabs>
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
      
            <Card className="border-[#F4E4C1] bg-gradient-to-br from-[#F4E4C1]/10 to-[#FFE4E9]/10">
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
                      <AvatarFallback className="bg-[#FFE4E9] text-[#FFB6C1]">
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
      <Card className="border-[#F4E4C1] bg-gradient-to-br from-[#F4E4C1]/10 to-[#FFE4E9]/10">
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
                <AvatarFallback className="bg-[#FFE4E9] text-[#FFB6C1]">
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
      <Label htmlFor="newReply">Tulis Balasan</Label>
      <Textarea
        id="newReply"
        placeholder="Bagikan pengalaman atau saran Anda..."
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        rows={3}
        className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
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
