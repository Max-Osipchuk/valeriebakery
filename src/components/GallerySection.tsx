import { useState } from "react";
import { X } from "lucide-react";
import { photos } from "@/data/photos";

const galleryImages = [
  { photo: photos.gallery1, alt: "Торт на полгодика с зайкой", span: "col-span-1 row-span-1" },
  { photo: photos.gallery2, alt: "Чёрный торт на 30-летие с золотым декором", span: "col-span-1 row-span-1" },
  { photo: photos.gallery3, alt: "Торт с капкейками на день рождения", span: "col-span-2 row-span-1" },
  { photo: photos.gallery4, alt: "Голубой торт с цветами", span: "col-span-1 row-span-1" },
  { photo: photos.gallery5, alt: "Бенто-торт с динозаврами", span: "col-span-1 row-span-1" },
  { photo: photos.gallery6, alt: "Двухъярусный торт для музыкальной студии", span: "col-span-2 row-span-1" },
  { photo: photos.gallery7, alt: "Серый торт с горами — Ты покоришь любые вершины", span: "col-span-1 row-span-1" },
  { photo: photos.gallery8, alt: "Торт с домиком и ягодами на юбилей", span: "col-span-1 row-span-1" },
  { photo: photos.gallery9, alt: "Двухъярусный торт с сухоцветами", span: "col-span-2 row-span-1" },
  // Широкая: без gallery-15 плиток стало 23 ячейки, и последний ряд оставался неполным
  { photo: photos.gallery10, alt: "Капкейки мятного и бежевого цвета в коробке", span: "col-span-2 row-span-1" },
  { photo: photos.gallery11, alt: "Белый торт с клубникой и малиной", span: "col-span-1 row-span-1" },
  { photo: photos.gallery12, alt: "Розовый торт с цветами и ягодами", span: "col-span-1 row-span-1" },
  { photo: photos.gallery13, alt: "Чёрный торт с золотым львом", span: "col-span-1 row-span-1" },
  { photo: photos.gallery14, alt: "Персиковый торт с розами и эвкалиптом", span: "col-span-2 row-span-1" },
  { photo: photos.gallery16, alt: "Белый торт с малиной и лавандой", span: "col-span-1 row-span-1" },
  { photo: photos.gallery17, alt: "Фисташковый торт с ягодами", span: "col-span-2 row-span-1" },
  { photo: photos.gallery18, alt: "Капкейки с мишками и погремушками", span: "col-span-1 row-span-1" },
  { photo: photos.gallery19, alt: "Бенто-торт Happy Birthday с бантиками", span: "col-span-1 row-span-1" },
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
        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row-dense gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${image.span} animate-fade-up shadow-soft hover:shadow-elevated transition-shadow duration-500`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(image.photo.src)}
            >
              <div className={`overflow-hidden ${image.span.includes("col-span-2") ? "aspect-square md:aspect-[2/1]" : "aspect-square"}`}>
                <img
                  src={image.photo.src}
                  srcSet={image.photo.srcSet}
                  sizes={image.span.includes("col-span-2") ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  width={image.photo.width}
                  height={image.photo.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                />
              </div>
              {/* Gradient veil */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-chocolate/70 via-chocolate/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Gold frame on hover */}
              <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
              {/* Caption */}
              <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-flex items-center gap-2 text-cream text-sm font-medium tracking-wide">
                  <span className="h-px w-6 bg-gold" />
                  Смотреть
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
            aria-label="Закрыть просмотр фото"
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
