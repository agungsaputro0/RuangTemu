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
