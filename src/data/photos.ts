// Фото работ в WebP (cwebp -q 75): полный размер 1206px для лайтбокса и широких
// плиток, превью 640px для сетки. Браузер сам выбирает файл по srcSet и sizes.
import gallery1 from "@/assets/gallery-1.webp";
import gallery1Small from "@/assets/gallery-1-640.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery2Small from "@/assets/gallery-2-640.webp";
import gallery3 from "@/assets/gallery-3.webp";
import gallery3Small from "@/assets/gallery-3-640.webp";
import gallery4 from "@/assets/gallery-4.webp";
import gallery4Small from "@/assets/gallery-4-640.webp";
import gallery5 from "@/assets/gallery-5.webp";
import gallery5Small from "@/assets/gallery-5-640.webp";
import gallery6 from "@/assets/gallery-6.webp";
import gallery6Small from "@/assets/gallery-6-640.webp";
import gallery7 from "@/assets/gallery-7.webp";
import gallery7Small from "@/assets/gallery-7-640.webp";
import gallery8 from "@/assets/gallery-8.webp";
import gallery8Small from "@/assets/gallery-8-640.webp";
import gallery9 from "@/assets/gallery-9.webp";
import gallery9Small from "@/assets/gallery-9-640.webp";
import gallery10 from "@/assets/gallery-10.webp";
import gallery10Small from "@/assets/gallery-10-640.webp";
import gallery11 from "@/assets/gallery-11.webp";
import gallery11Small from "@/assets/gallery-11-640.webp";
import gallery12 from "@/assets/gallery-12.webp";
import gallery12Small from "@/assets/gallery-12-640.webp";
import gallery13 from "@/assets/gallery-13.webp";
import gallery13Small from "@/assets/gallery-13-640.webp";
import gallery14 from "@/assets/gallery-14.webp";
import gallery14Small from "@/assets/gallery-14-640.webp";
import gallery15 from "@/assets/gallery-15.webp";
import gallery15Small from "@/assets/gallery-15-640.webp";
import gallery16 from "@/assets/gallery-16.webp";
import gallery16Small from "@/assets/gallery-16-640.webp";
import gallery17 from "@/assets/gallery-17.webp";
import gallery17Small from "@/assets/gallery-17-640.webp";
import gallery18 from "@/assets/gallery-18.webp";
import gallery18Small from "@/assets/gallery-18-640.webp";
import gallery19 from "@/assets/gallery-19.webp";
import gallery19Small from "@/assets/gallery-19-640.webp";

export interface Photo {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

const FULL_WIDTH = 1206;
const SMALL_WIDTH = 640;

// height — высота полного файла, нужна для атрибутов width/height у <img>.
const photo = (src: string, small: string, height: number): Photo => ({
  src,
  srcSet: `${small} ${SMALL_WIDTH}w, ${src} ${FULL_WIDTH}w`,
  width: FULL_WIDTH,
  height,
});

export const photos = {
  gallery1: photo(gallery1, gallery1Small, 1329),
  gallery2: photo(gallery2, gallery2Small, 1298),
  gallery3: photo(gallery3, gallery3Small, 1313),
  gallery4: photo(gallery4, gallery4Small, 1313),
  gallery5: photo(gallery5, gallery5Small, 1252),
  gallery6: photo(gallery6, gallery6Small, 1217),
  gallery7: photo(gallery7, gallery7Small, 1139),
  gallery8: photo(gallery8, gallery8Small, 1208),
  gallery9: photo(gallery9, gallery9Small, 1245),
  gallery10: photo(gallery10, gallery10Small, 1345),
  gallery11: photo(gallery11, gallery11Small, 1282),
  gallery12: photo(gallery12, gallery12Small, 1207),
  gallery13: photo(gallery13, gallery13Small, 1182),
  gallery14: photo(gallery14, gallery14Small, 1243),
  gallery15: photo(gallery15, gallery15Small, 1103),
  gallery16: photo(gallery16, gallery16Small, 1213),
  gallery17: photo(gallery17, gallery17Small, 1181),
  gallery18: photo(gallery18, gallery18Small, 1329),
  gallery19: photo(gallery19, gallery19Small, 1264),
};
