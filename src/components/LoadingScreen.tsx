import { useEffect, useState } from "react";
import loaderVideo from "@/assets/valerie-loader.mp4";
import loaderPoster from "@/assets/valerie-loader-poster.jpg";

type LoadingScreenProps = {
  isVisible: boolean;
};

const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const indicatorTimer = window.setTimeout(() => {
      setShowIndicator(true);
    }, 1200);

    return () => window.clearTimeout(indicatorTimer);
  }, [isVisible]);

  // If the video does not start quickly (slow connection), stay on the poster.
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVideoFailed((failed) => (videoReady ? failed : true));
    }, 2500);

    return () => window.clearTimeout(timeout);
  }, [videoReady]);

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-hero transition-opacity duration-500 ease-out will-change-opacity ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-8 px-8">
        <div className="relative h-36 w-36 md:h-44 md:w-44">
          <img
            src={loaderPoster}
            alt="Valerie Bakery"
            className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-elevated animate-loader-breathe"
            decoding="async"
            fetchPriority="high"
          />
          {!videoFailed && (
            <video
              className={`absolute inset-0 h-full w-full rounded-2xl object-cover shadow-elevated animate-loader-breathe transition-opacity duration-500 ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              src={loaderVideo}
              poster={loaderPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
            />
          )}
        </div>

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
