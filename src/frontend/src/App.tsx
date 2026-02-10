import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

function App() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showNoMemeModal, setShowNoMemeModal] = useState(false);
  const [showGoodChoiceModal, setShowGoodChoiceModal] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize No button position to center-right
  useEffect(() => {
    if (containerRef.current && noButtonRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({
        x: container.width * 0.6 - button.width / 2,
        y: container.height / 2 - button.height / 2
      });
    }
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe bounds (keep button fully visible)
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    const minX = 20;
    const minY = 20;

    // Generate random position within bounds
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  const handleNoPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    moveNoButton();
    
    // Increment click count
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    // Show meme modal every 3rd click
    if (newCount % 3 === 0) {
      setShowNoMemeModal(true);
    }
  };

  const handleYesClick = () => {
    setShowGoodChoiceModal(true);
  };

  // Determine which meme to show based on click count
  // Pattern: 3 (polite), 6 (annoyed), 9 (aggressive), 12 (polite), 15 (annoyed), 18 (aggressive), ...
  const getMemeData = () => {
    const cyclePosition = Math.floor(noClickCount / 3) % 3;
    
    switch (cyclePosition) {
      case 1: // Polite (clicks 3, 12, 21, ...)
        return {
          image: '/assets/generated/no-politer-meme-v2.dim_900x900.png',
          title: 'Are you sure? 🥺',
          buttonText: 'Let me reconsider...'
        };
      case 2: // Annoyed (clicks 6, 15, 24, ...)
        return {
          image: '/assets/generated/no-annoyed-meme-v2.dim_900x900.png',
          title: 'Seriously?! 😤',
          buttonText: 'Fine, fine...'
        };
      case 0: // Aggressive (clicks 9, 18, 27, ...)
        return {
          image: '/assets/generated/angry-cat-meme-v2.dim_900x900.png',
          title: 'REALLY?! 😾',
          buttonText: 'Okay, OKAY!'
        };
      default:
        return {
          image: '/assets/generated/no-politer-meme-v2.dim_900x900.png',
          title: 'Are you sure? 🥺',
          buttonText: 'Let me reconsider...'
        };
    }
  };

  const currentMeme = getMemeData();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-pink-950 dark:via-rose-950 dark:to-pink-900">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl">
          {/* Question Card */}
          <div className="text-center mb-12 sm:mb-16 animate-in fade-in duration-700">
            <div className="inline-flex items-center justify-center mb-6 sm:mb-8">
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-rose-600 dark:text-rose-400 mb-4 sm:mb-6 tracking-tight">
              Will you be my Valentine, <span className="navera-highlight">Navera</span>?
            </h1>
            <p className="text-lg sm:text-xl text-rose-500/80 dark:text-rose-300/80 font-medium">
              Choose wisely... 💕
            </p>
          </div>

          {/* Buttons Container */}
          <div
            ref={containerRef}
            className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center"
          >
            {/* Yes Button - Static position */}
            <div className="absolute left-1/2 top-1/2 -translate-x-[calc(100%+2rem)] -translate-y-1/2">
              <Button
                onClick={handleYesClick}
                size="lg"
                className="text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 h-auto bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-110 active:scale-95 rounded-2xl font-bold border-4 border-white/20"
              >
                Yes! 💖
              </Button>
            </div>

            {/* No Button - Dynamic position */}
            <button
              ref={noButtonRef}
              onPointerEnter={handleNoHover}
              onPointerDown={handleNoPointerDown}
              style={{
                position: 'absolute',
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              className="text-xl sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white shadow-xl rounded-2xl font-bold border-4 border-white/20 cursor-pointer touch-none select-none"
            >
              No 😢
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-rose-500/60 dark:text-rose-400/60">
        <p className="flex items-center justify-center gap-2">
          Built with <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline animate-pulse" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
        <p className="mt-1">© {new Date().getFullYear()}</p>
      </footer>

      {/* No Meme Modal - Rotating through three escalation levels */}
      <Dialog open={showNoMemeModal} onOpenChange={setShowNoMemeModal}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 border-4 border-rose-300 dark:border-rose-700">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 text-center">
              {currentMeme.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <img
              src={currentMeme.image}
              alt="No meme"
              className="w-full max-w-md max-h-[60vh] object-contain rounded-xl shadow-2xl"
            />
            <Button
              onClick={() => setShowNoMemeModal(false)}
              className="mt-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-xl"
            >
              {currentMeme.buttonText}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Good Choice Modal */}
      <Dialog open={showGoodChoiceModal} onOpenChange={setShowGoodChoiceModal}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 border-4 border-rose-300 dark:border-rose-700">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 text-center">
              Yay! 🎉💕
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <img
              src="/assets/generated/good-choice-romantic-meme-v3.dim_900x900.png"
              alt="Good choice meme"
              className="w-full max-w-md max-h-[60vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-xl sm:text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">
                I knew you'd say yes! 💖
              </p>
              <p className="text-lg text-rose-500/80 dark:text-rose-300/80">
                Happy Valentine's Day! 🌹
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
