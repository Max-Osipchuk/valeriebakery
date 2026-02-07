import { useState } from "react";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryImages = [
  { src: gallery1, alt: "Торт на полгодика с зайкой", span: "col-span-1 row-span-1" },
  { src: gallery2, alt: "Чёрный торт на 30-летие с золотым декором", span: "col-span-1 row-span-1" },
  { src: gallery3, alt: "Торт с капкейками на день рождения", span: "col-span-2 row-span-1" },
  { src: gallery4, alt: "Голубой торт с цветами", span: "col-span-1 row-span-1" },
  { src: gallery5, alt: "Бенто-торт с динозаврами", span: "col-span-1 row-span-1" },
  { src: gallery6, alt: "Двухъярусный торт для музыкальной студии", span: "col-span-2 row-span-1" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-medium tracking-wider uppercase text-sm mb-4">
            Галерея
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-chocolate mb-6">
            Наши <span className="italic text-dustyPink">творения</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Каждый торт — это уникальное произведение кондитерского искусства
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${image.span} animate-fade-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  Увеличить
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-chocolate/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Торт в полном размере"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-elevated animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
