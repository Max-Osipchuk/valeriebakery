import { useEffect, useState } from "react";
import loaderVideo from "@/assets/valerie-loader.mp4";

type LoadingScreenProps = {
  isVisible: boolean;
};

const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const indicatorTimer = window.setTimeout(() => {
      setShowIndicator(true);
    }, 2400);

    return () => window.clearTimeout(indicatorTimer);
  }, [isVisible]);

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-hero transition-opacity duration-500 ease-out will-change-opacity ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-8 px-8">
        <video
          className="h-36 w-36 rounded-2xl object-cover shadow-elevated animate-loader-breathe md:h-44 md:w-44"
          src={loaderVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <div
          className={`flex h-4 items-center gap-2 transition-opacity duration-500 ${
            showIndicator ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-gold animate-loader-dot" />
          <span className="h-2 w-2 rounded-full bg-gold animate-loader-dot [animation-delay:160ms]" />
          <span className="h-2 w-2 rounded-full bg-gold animate-loader-dot [animation-delay:320ms]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;