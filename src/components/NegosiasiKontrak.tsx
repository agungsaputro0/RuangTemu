import { MessageCircle, FileText, Send, CheckCircle2, Clock, Download, Sparkles, DollarSign, X, Check, AlertCircle, PenTool, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

interface Message {
  id: number;
  sender: 'user' | 'vendor';
  message: string;
  time: string;
  type?: 'text' | 'proposal';
  proposalData?: {
    originalPrice: number;
    proposedPrice: number;
    discount?: number;
    reason: string;
    status: 'pending' | 'accepted' | 'rejected';
  };
}

interface Contract {
  id: number;
  venueName: string;
  status: 'draft' | 'sent' | 'signed' | 'completed';
  date: string;
  amount: string;
}

interface NegotiationStatus {
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  lastUpdate: string;
}

import { useAuth } from './AuthContext';

interface NegosiasiKontrakProps {
  userRole?: 'couple' | 'vendor';
}

export function NegosiasiKontrak({ userRole }: NegosiasiKontrakProps = {}) {
  const { user } = useAuth();
  const currentRole = userRole || user?.role || 'couple';
  const isVendor = currentRole === 'vendor';
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [showProposalDialog, setShowProposalDialog] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');
  const [proposalReason, setProposalReason] = useState('');
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [signature, setSignature] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const [negotiationStatus, setNegotiationStatus] = useState<NegotiationStatus>({
    status: 'reviewing',
    lastUpdate: '10:30',
  });

  // Initial messages berdasarkan role
  const getInitialMessages = (): Message[] => {
    if (isVendor) {
      // Vendor perspective - vendor mengirim, user (client) membalas
      return [
        {
          id: 1,
          sender: 'vendor',
          message: 'Halo Sarah & Ahmad! Terima kasih atas ketertarikan Anda dengan Grand Ballroom Elegance. Saya lihat Anda tertarik untuk tanggal 15 Desember 2025.',
          time: '09:00',
        },
        {
          id: 2,
          sender: 'user',
          message: 'Selamat pagi. Ya benar, kami tertarik untuk booking tanggal tersebut untuk 300 tamu. Apakah tersedia?',
          time: '09:15',
        },
        {
          id: 3,
          sender: 'vendor',
          message: 'Tanggal tersebut masih available! Untuk 300 tamu, kami bisa menawarkan paket premium lengkap dengan harga Rp 75.000.000',
          time: '09:20',
        },
        {
          id: 4,
          sender: 'user',
          message: 'Wah harganya cukup tinggi ya. Budget kami sekitar 60 jutaan. Apakah bisa disesuaikan?',
          time: '09:25',
          type: 'proposal',
          proposalData: {
            originalPrice: 75000000,
            proposedPrice: 60000000,
            discount: 20,
            reason: 'Budget kami terbatas untuk keseluruhan acara pernikahan. Kami sangat tertarik dengan venue ini dan berharap bisa mencapai kesepakatan.',
            status: 'pending',
          },
        },
        {
          id: 5,
          sender: 'vendor',
          message: 'Baik, saya mengerti kebutuhan Anda. Kami bisa memberikan diskon 10% untuk early booking. Jadi total menjadi Rp 67.500.000. Bagaimana?',
          time: '10:25',
        },
        {
          id: 6,
          sender: 'user',
          message: 'Oke, harga tersebut masih bisa kami pertimbangkan. Apakah sudah termasuk dekorasi pelaminan?',
          time: '10:28',
        },
        {
          id: 7,
          sender: 'vendor',
          message: 'Ya tentu! Paket ini sudah termasuk dekorasi pelaminan, sound system premium, dan lighting profesional. Selanjutnya kita bisa lanjut dengan kontrak digital.',
          time: '10:30',
        },
      ];
    } else {
      // Couple perspective - user mengirim, vendor membalas
      return [
        {
          id: 1,
          sender: 'vendor',
          message: 'Halo! Terima kasih atas ketertarikan Anda dengan Grand Ballroom Elegance. Ada yang bisa kami bantu?',
          time: '09:00',
        },
        {
          id: 2,
          sender: 'user',
          message: 'Selamat pagi. Saya tertarik untuk booking tanggal 15 Desember 2025 untuk 300 tamu. Apakah tersedia?',
          time: '09:15',
        },
        {
          id: 3,
          sender: 'vendor',
          message: 'Tanggal tersebut masih available. Untuk 300 tamu, kami bisa menawarkan paket lengkap dengan harga Rp 75.000.000',
          time: '09:20',
        },
        {
          id: 4,
          sender: 'user',
          message: 'Apakah bisa mendapat diskon jika saya booking sekarang?',
          time: '09:25',
        },
        {
          id: 5,
          sender: 'vendor',
          message: 'Tentu! Untuk early booking, kami bisa berikan diskon 10%. Jadi total menjadi Rp 67.500.000',
          time: '10:25',
        },
        {
          id: 6,
          sender: 'user',
          message: 'Oke, deal! Bagaimana proses selanjutnya?',
          time: '10:28',
        },
        {
          id: 7,
          sender: 'vendor',
          message: 'Baik, kami setuju dengan harga tersebut. Selanjutnya kami akan buatkan kontrak digitalnya.',
          time: '10:30',
        },
      ];
    }
  };

  const [messages, setMessages] = useState<Message[]>(getInitialMessages());

  const chats = isVendor ? [
    {
      id: 1,
      venueName: 'Sarah & Ahmad',
      venueContext: 'Grand Ballroom Elegance',
      lastMessage: 'Oke, harga tersebut masih bisa kami pertimbangkan...',
      time: '10:30',
      unread: 1,
      status: 'active' as const,
    },
    {
      id: 2,
      venueName: 'Michael & Jessica',
      venueContext: 'Royal Garden Venue',
      lastMessage: 'Budget kami sekitar 40 jutaan, bisa disesuaikan?',
      time: 'Kemarin',
      unread: 2,
      status: 'active' as const,
    },
    {
      id: 3,
      venueName: 'Diana & Budi',
      venueContext: 'Grand Ballroom Elegance',
      lastMessage: 'Terima kasih banyak atas pelayanannya!',
      time: '2 hari lalu',
      unread: 0,
      status: 'completed' as const,
    },
  ] : [
    {
      id: 1,
      venueName: 'Grand Ballroom Elegance',
      lastMessage: 'Baik, kami setuju dengan harga tersebut',
      time: '10:30',
      unread: 2,
      status: 'active' as const,
    },
    {
      id: 2,
      venueName: 'Royal Garden Venue',
      lastMessage: 'Apakah bisa nego untuk paket catering?',
      time: 'Kemarin',
      unread: 0,
      status: 'active' as const,
    },
    {
      id: 3,
      venueName: 'Luxury Hotel Ballroom',
      lastMessage: 'Terima kasih atas pesanannya',
      time: '2 hari lalu',
      unread: 0,
      status: 'completed' as const,
    },
  ];

  const contracts: Contract[] = [
    {
      id: 1,
      venueName: 'Grand Ballroom Elegance',
      status: 'draft',
      date: '15 Des 2025',
      amount: 'Rp 67.500.000',
    },
    {
      id: 2,
      venueName: 'Luxury Hotel Ballroom',
      status: 'signed',
      date: '10 Nov 2025',
      amount: 'Rp 85.000.000',
    },
    {
      id: 3,
      venueName: 'Royal Garden Venue',
      status: 'completed',
      date: '5 Okt 2025',
      amount: 'Rp 45.000.000',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-600' },
      sent: { label: 'Terkirim', className: 'bg-blue-100 text-blue-600' },
      signed: { label: 'Ditandatangani', className: 'bg-[#F4E4C1] text-[#B8941F]' },
      completed: { label: 'Selesai', className: 'bg-green-100 text-green-600' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={`${config.className} border-0`}>{config.label}</Badge>;
  };

  const getNegotiationStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu Balasan', icon: Clock, className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      reviewing: { label: 'Ditinjau', icon: AlertCircle, className: 'bg-blue-100 text-blue-700 border-blue-200' },
      approved: { label: 'Disetujui', icon: CheckCircle2, className: 'bg-green-100 text-green-700 border-green-200' },
      rejected: { label: 'Ditolak', icon: X, className: 'bg-red-100 text-red-700 border-red-200' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: isVendor ? 'vendor' : 'user',
        message: newMessage,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      toast.success('Pesan terkirim');

      // Auto-reply (only for couple role)
      if (!isVendor) {
        setTimeout(() => {
          const autoReply: Message = {
            id: messages.length + 2,
            sender: 'vendor',
            message: 'Terima kasih atas pesannya! Untuk melanjutkan proses booking, silakan gunakan fitur "Buat Kontrak Digital" di bawah untuk membuat kontrak resmi. Kontrak digital kami sudah diverifikasi oleh ahli hukum dan dilengkapi dengan e-signature yang aman.',
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prevMessages => [...prevMessages, autoReply]);
          toast.info('Vendor merekomendasikan untuk membuat kontrak digital');
        }, 1500);
      }
    }
  };

  const handleSendProposal = () => {
    if (!proposedPrice || !proposalReason) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    const newProposal: Message = {
      id: messages.length + 1,
      sender: isVendor ? 'vendor' : 'user',
      message: `${isVendor ? 'Kami menawarkan' : 'Saya ingin mengajukan'} harga Rp ${parseInt(proposedPrice).toLocaleString('id-ID')}`,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      type: 'proposal',
      proposalData: {
        originalPrice: 67500000,
        proposedPrice: parseInt(proposedPrice),
        reason: proposalReason,
        status: 'pending',
      },
    };

    setMessages([...messages, newProposal]);
    setShowProposalDialog(false);
    setProposedPrice('');
    setProposalReason('');
    setNegotiationStatus({ status: 'pending', lastUpdate: newProposal.time });
    toast.success('Tawaran harga berhasil dikirim');
  };

  const handleUseTemplate = (template: string) => {
    setNewMessage(template);
    setShowTemplateMenu(false);
  };

  const messageTemplates = isVendor ? [
    'Terima kasih atas ketertarikan Anda dengan venue kami!',
    'Untuk early booking, kami bisa berikan diskon spesial',
    'Paket ini sudah termasuk dekorasi dan catering premium',
    'Kami menyediakan paket cicilan dengan DP 30%',
    'Silakan jadwalkan survey lokasi, kami siap membantu',
  ] : [
    'Apakah harga ini bisa dinegosiasikan?',
    'Bisakah saya mendapat diskon untuk early booking?',
    'Apa saja yang termasuk dalam paket ini?',
    'Apakah tersedia paket cicilan?',
    'Bisakah saya survei lokasi terlebih dahulu?',
  ];

  const handleCreateContract = () => {
    setShowContractDialog(true);
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setShowContractDialog(true);
  };

  const handleSignContract = (contract: Contract) => {
    setSelectedContract(contract);
    setShowSignatureDialog(true);
  };

  const handleDownloadContract = (contract: Contract) => {
    toast.success(`Kontrak ${contract.venueName} berhasil diunduh`);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmitSignature = () => {
    if (!selectedContract) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Check if canvas is not empty
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let isEmpty = true;
    
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) {
        isEmpty = false;
        break;
      }
    }
    
    if (isEmpty) {
      toast.error('Silakan buat tanda tangan terlebih dahulu');
      return;
    }
    
    toast.success('Kontrak berhasil ditandatangani!');
    setShowSignatureDialog(false);
    clearSignature();
    setSelectedContract(null);
  };

  return (
    <div className="min-h-screen-default mt-16 bg-gradient-to-b from-white to-[#FFE4E9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">{isVendor ? 'Chat & Negosiasi' : 'Negosiasi & Kontrak'}</h1>
          <p className="text-gray-600">
            {isVendor 
              ? 'Berkomunikasi dengan calon pengantin dan kelola kontrak digital' 
              : 'Berkomunikasi dengan vendor dan kelola kontrak digital Anda'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat List */}
          <Card className="lg:col-span-1 border-[#F4E4C1] shadow-lg">
            <CardHeader className="bg-ruangTemuSecond pb-4 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-white text-2xl">
                <MessageCircle className="w-5 h-5 text-white font-bold text-2xl" />
                {isVendor ? 'Daftar Client' : 'Percakapan'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    className={`p-4 cursor-pointer transition-colors ${
                      activeChat === chat.id
                        ? 'bg-gradient-to-r from-[#F4E4C1]/50 to-[#FFE4E9]/50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-sm">{chat.venueName}</p>
                        {isVendor && 'venueContext' in chat && (
                          <p className="text-xs text-gray-500">{chat.venueContext}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate flex-1">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge className="ml-2 bg-[#FFB6C1] text-white border-0">{chat.unread}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="lg:col-span-2 border-[#F4E4C1] shadow-lg">
            <CardHeader className="border-b text-white text-2xl border-gray-100 bg-ruangTemuSecond pb-2 rounded-t-xl">
              <div className="flex justify-between items-center">
                <CardTitle>
                  {activeChat ? chats.find((c) => c.id === activeChat)?.venueName : 'Pilih percakapan'}
                </CardTitle>
                {activeChat && (
                  <div className="flex items-center gap-2">
                    {getNegotiationStatusBadge(negotiationStatus.status)}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeChat ? (
                <>
                  {/* Messages Area */}
                  <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.type === 'proposal' && msg.proposalData ? (
                          <Card
                            className={`max-w-[80%] ${
                              msg.sender === 'user'
                                ? 'border-[#D4AF37] bg-gradient-to-r from-[#F4E4C1]/30 to-[#FFE4E9]/30'
                                : 'border-blue-200 bg-blue-50'
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                                <span className="text-sm">
                                  {(isVendor && msg.sender === 'vendor') || (!isVendor && msg.sender === 'user')
                                    ? 'Tawaran Anda' 
                                    : isVendor 
                                      ? 'Tawaran Client' 
                                      : 'Tawaran Vendor'}
                                </span>
                                {msg.proposalData.status === 'pending' && (
                                  <Badge variant="outline" className="border-yellow-500 text-yellow-600 ml-auto">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                                {msg.proposalData.status === 'accepted' && (
                                  <Badge variant="outline" className="border-green-500 text-green-600 ml-auto">
                                    <Check className="w-3 h-3 mr-1" />
                                    Diterima
                                  </Badge>
                                )}
                              </div>
                              
                              {msg.proposalData.originalPrice > 0 && (
                                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                                  <span>Harga Awal:</span>
                                  <span className="line-through">
                                    Rp {msg.proposalData.originalPrice.toLocaleString('id-ID')}
                                  </span>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-gray-600">Harga Tawaran:</span>
                                <span className="text-[#D4AF37]">
                                  Rp {msg.proposalData.proposedPrice.toLocaleString('id-ID')}
                                </span>
                                {msg.proposalData.discount && (
                                  <Badge className="bg-green-100 text-green-700 border-0">
                                    Diskon {msg.proposalData.discount}%
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-2">{msg.proposalData.reason}</p>
                              
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{msg.time}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                              msg.sender === 'user'
                                ? 'bg-ruangTemuPremier text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p className="text-sm mb-1">{msg.message}</p>
                            <span
                              className={`text-xs ${
                                msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                              }`}
                            >
                              {msg.time}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-gray-100 p-4">
                    {/* Quick Templates */}
                    {showTemplateMenu && (
                      <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Template Pesan Cepat:</p>
                        <div className="flex flex-wrap gap-2">
                          {messageTemplates.map((template, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleUseTemplate(template)}
                              className="text-xs border-[#F4E4C1] hover:bg-[#F4E4C1]/30"
                            >
                              {template}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 mb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                        className="border-[#F4E4C1] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowProposalDialog(true)}
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        Ajukan Tawaran Baru
                      </Button>
                    </div>
                    
                    <div className="flex gap-3 mb-3">
                      <Input
                        placeholder="Ketik pesan..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 border-[#F4E4C1]"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-ruangTemuSecond hover:brightness-90 text-white"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                      onClick={handleCreateContract}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Buat Kontrak Digital
                    </Button>
                  </div>
                </>
              ) : (
                <div className="h-[500px] flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Pilih percakapan untuk memulai</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contracts Section */}
        <div className="mt-8">
          <Card className="border-[#F4E4C1] shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  Kontrak Digital
                </CardTitle>
                <Button 
                  className="bg-ruangTemuSecond hover:brightness-90 text-white"
                  onClick={handleCreateContract}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Buat Kontrak Baru
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contracts.map((contract) => (
                  <Card key={contract.id} className="border-[#F4E4C1] hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">{contract.venueName}</h4>
                          <p className="text-xs text-gray-500">Tanggal: {contract.date}</p>
                        </div>
                        {getStatusBadge(contract.status)}
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Total Nilai</p>
                        <p className="text-[#D4AF37]">{contract.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                          onClick={() => handleDownloadContract(contract)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        {contract.status === 'draft' && (
                          <Button 
                            size="sm" 
                            className="flex-1 bg-ruangTemuSecond text-white"
                            onClick={() => handleSignContract(contract)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Tanda Tangan
                          </Button>
                        )}
                        {contract.status !== 'draft' && (
                          <Button 
                            variant="outline"
                            size="sm" 
                            className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#F4E4C1]/30"
                            onClick={() => handleViewContract(contract)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Lihat
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-[#F4E4C1]/30 to-[#FFE4E9]/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFB6C1] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="mb-2">Kontrak Digital yang Aman & Legal</h3>
              <p className="text-gray-600">
                Semua kontrak dilengkapi dengan e-signature dan tersimpan secara aman. Kontrak kami telah
                diverifikasi oleh ahli hukum untuk melindungi hak Anda sebagai konsumen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Dialog */}
      {showProposalDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* Background overlay */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setShowProposalDialog(false)}
    />

    {/* Modal container */}
    <div className="relative bg-white w-full max-w-md sm:max-w-lg rounded-lg shadow-lg p-6 overflow-auto max-h-[90vh] z-10 flex flex-col">
      
      {/* Header */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#FFB6C1]/20">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold">Ajukan Tawaran Harga Baru</h2>
        </div>
        <p className="text-sm text-gray-600">
          Masukkan harga yang Anda inginkan dan berikan alasan pengajuan
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 flex-1 overflow-auto">
        {/* Harga Saat Ini */}
        <div className="p-4 bg-ruangTemu rounded-lg">
          <p className="text-sm text-mainColor mb-1 font-bold">Harga Saat Ini</p>
          <p className="text-secondColor text-2xl font-bold">Rp 67.500.000</p>
        </div>

        {/* Harga yang Diajukan */}
        <div className="space-y-2">
          <Label htmlFor="proposedPrice">Harga yang Diajukan *</Label>
          <Input
            id="proposedPrice"
            type="number"
            placeholder="Contoh: 60000000"
            value={proposedPrice}
            onChange={(e) => setProposedPrice(e.target.value)}
            className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
          />
        </div>

        {/* Alasan Pengajuan */}
        <div className="space-y-2">
          <Label htmlFor="proposalReason">Alasan Pengajuan *</Label>
          <Textarea
            id="proposalReason"
            placeholder="Contoh: Saya memiliki budget terbatas dan ini adalah acara pertama kami..."
            value={proposalReason}
            onChange={(e) => setProposalReason(e.target.value)}
            rows={4}
            className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
          />
        </div>

        {/* Info Penurunan Harga */}
        {proposedPrice && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              Anda mengajukan penurunan harga sebesar{' '}
              {(((67500000 - parseInt(proposedPrice)) / 67500000) * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setShowProposalDialog(false)}
        >
          Batal
        </Button>
        <Button
          onClick={handleSendProposal}
          className="bg-ruangTemuSecond hover:brightness-90 text-white"
        >
          Kirim Tawaran
        </Button>
      </div>
    </div>
  </div>
)}


      {/* Contract Dialog */}
      {showContractDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* Background overlay */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => {
        setShowContractDialog(false);
        setSelectedContract(null);
      }}
    />

    {/* Modal container */}
    <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 overflow-auto max-h-[90vh] z-10 flex flex-col">
      
      {/* Header */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#FFB6C1]/20">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold">Kontrak Digital</h2>
        </div>
        <p className="text-sm text-gray-600">
          {selectedContract
            ? `Kontrak untuk ${selectedContract.venueName}`
            : 'Buat kontrak digital baru'}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 flex-1 overflow-auto py-2">

        {/* Contract Header */}
        <div className="text-center border-b pb-4">
          <h2 className="mb-2">SURAT PERJANJIAN BOOKING VENUE</h2>
          <p className="text-sm text-gray-600">
            No. Kontrak: {selectedContract?.id || '001'}/RTE/2025
          </p>
        </div>

        {/* Parties Info */}
        <div className="space-y-4">
          {/* Vendor */}
          <div className="p-4 bg-ruangTemu rounded-lg">
            <h3 className="mb-3">Pihak Pertama (Vendor):</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">Nama:</span> {selectedContract?.venueName || 'Grand Ballroom Elegance'}</p>
              <p><span className="text-gray-600">Alamat:</span> Jl. Sudirman No. 123, Jakarta Selatan</p>
              <p><span className="text-gray-600">Telepon:</span> (021) 1234-5678</p>
            </div>
          </div>

          {/* Calon Pengantin */}
          <div className="p-4 bg-ruangTemu rounded-lg">
            <h3 className="mb-3">Pihak Kedua (Calon Pengantin):</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-600">Nama:</span> John Doe & Jane Smith</p>
              <p><span className="text-gray-600">Email:</span> johndoe@example.com</p>
              <p><span className="text-gray-600">Telepon:</span> 0812-3456-7890</p>
            </div>
          </div>
        </div>

        {/* Contract Terms */}
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <h3>Pasal 1: Detail Acara</h3>
            <p>• Tanggal Acara: {selectedContract?.date || '15 Desember 2025'}</p>
            <p>• Jumlah Tamu: 300 orang</p>
            <p>• Waktu: 10:00 - 22:00 WIB</p>
          </div>
          <div>
            <h3>Pasal 2: Nilai Kontrak</h3>
            <p>• Total Biaya: <span className="text-[#D4AF37]">{selectedContract?.amount || 'Rp 67.500.000'}</span></p>
            <p>• DP (30%): Rp 20.250.000</p>
            <p>• Pelunasan: 7 hari sebelum acara</p>
          </div>
          <div>
            <h3>Pasal 3: Ketentuan Umum</h3>
            <p>• Pihak Kedua wajib membayar DP 30% paling lambat 3 hari setelah kontrak.</p>
            <p>• Pembatalan maksimal 30 hari sebelum acara, DP 50% dikembalikan.</p>
            <p>• Pihak Pertama bertanggung jawab menyediakan fasilitas sesuai paket.</p>
            <p>• Perubahan detail acara maksimal 14 hari sebelum pelaksanaan.</p>
          </div>
          <div>
            <h3>Pasal 4: Force Majeure</h3>
            <p>Kedua belah pihak dibebaskan dari tanggung jawab jika terjadi bencana alam, wabah, atau kebijakan pemerintah.</p>
          </div>
        </div>

        {/* Signature Section */}
        <div className="border-t pt-4 mt-6 grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-600 mb-2">Pihak Pertama</p>
            <div className="h-20 border-b-2 border-gray-300 mb-2"></div>
            <p className="text-sm">{selectedContract?.venueName || 'Grand Ballroom Elegance'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Pihak Kedua</p>
            <div className="h-20 border-b-2 border-gray-300 mb-2 flex items-end justify-center pb-2">
              {selectedContract?.status === 'signed' || selectedContract?.status === 'completed' ? (
                <span className="text-[#D4AF37]">✓ Ditandatangani</span>
              ) : (
                <span className="text-gray-400 text-xs">Belum ditandatangani</span>
              )}
            </div>
            <p className="text-sm">John Doe & Jane Smith</p>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
          <div className="flex gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p>Kontrak ini telah diverifikasi oleh tim hukum Ruang Temu dan memiliki kekuatan hukum yang mengikat kedua belah pihak.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setShowContractDialog(false);
            setSelectedContract(null);
          }}
        >
          Tutup
        </Button>
        {(!selectedContract || selectedContract.status === 'draft') && (
          <Button
            onClick={() => {
              setShowContractDialog(false);
              handleSignContract(selectedContract || contracts[0]);
            }}
            className="bg-ruangTemuSecond hover:brightness-90 text-white"
          >
            <PenTool className="w-4 h-4 mr-2" />
            Tanda Tangan Sekarang
          </Button>
        )}
      </div>
    </div>
  </div>
)}


      {/* Signature Dialog */}
      {showSignatureDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* Background overlay */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => {
        setShowSignatureDialog(false);
        clearSignature();
        setSignature('');
        setSelectedContract(null);
      }}
    />

    {/* Modal container */}
    <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 overflow-auto max-h-[90vh] z-10 flex flex-col">
      
      {/* Header */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#FFB6C1]/20">
        <div className="flex items-center gap-2 mb-1">
          <PenTool className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold">Tanda Tangan Digital</h2>
        </div>
        <p className="text-sm text-gray-600">Buat tanda tangan Anda di area di bawah ini</p>
      </div>

      {/* Content */}
      <div className="space-y-4 flex-1 overflow-auto py-2">
        
        {/* Contract info */}
        <div className="p-4 bg-ruangTemu rounded-lg">
          <p className="text-sm text-gray-800 mb-1">Kontrak untuk:</p>
          <p className="text-secondColor font-bold">{selectedContract?.venueName}</p>
          <p className="text-xl text-mainColor font-bold mt-1">Senilai: {selectedContract?.amount}</p>
        </div>

        {/* Signature canvas */}
        <div className="space-y-2">
          <Label>Gambar Tanda Tangan Anda</Label>
          <div className="border-2 border-dashed border-[#D4AF37] rounded-lg p-4 bg-white">
            <canvas
              ref={canvasRef}
              width={500}
              height={200}
              className="w-full cursor-crosshair border border-gray-200 rounded"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearSignature}
              className="border-gray-300"
            >
              <X className="w-4 h-4 mr-1" />
              Hapus
            </Button>
          </div>
        </div>

        {/* Full name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Nama Lengkap *</Label>
          <Input
            id="fullName"
            placeholder="Masukkan nama lengkap sesuai KTP"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="border-[#F4E4C1] focus-visible:ring-[#D4AF37]"
          />
        </div>

        {/* Legal notice */}
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p>Dengan menandatangani kontrak ini, Anda menyetujui semua ketentuan yang tercantum dalam kontrak dan bersedia melaksanakan kewajiban sebagai pihak kedua.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setShowSignatureDialog(false);
            clearSignature();
            setSignature('');
            setSelectedContract(null);
          }}
        >
          Batal
        </Button>
        <Button
          onClick={handleSubmitSignature}
          disabled={!signature.trim()}
          className="bg-ruangTemuSecond hover:brightness-90 text-white"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Setuju & Tanda Tangan
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
