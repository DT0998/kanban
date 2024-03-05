import { v4 as uuidv4 } from 'uuid';
export const modalBackgroundColors = [
  {
    icon: 'assets/images/board/icon/color/icon-blue.svg',
    background_url: 'assets/images/board/background/color/bg-blue.svg',
    preview_url: 'assets/images/board/modal/color/bg-blue.svg',
  },
  {
    icon: 'assets/images/board/icon/color/icon-orange.svg',
    background_url: 'assets/images/board/background/color/bg-orange.svg',
    preview_url: 'assets/images/board/modal/color/bg-orange.svg',
  },
  {
    icon: 'assets/images/board/icon/color/icon-purple.svg',
    background_url: 'assets/images/board/background/color/bg-purple.svg',
    preview_url: 'assets/images/board/modal/color/bg-purple.svg',
  },
  {
    icon: 'assets/images/board/icon/color/icon-pink.svg',
    background_url: 'assets/images/board/background/color/bg-pink.svg',
    preview_url: 'assets/images/board/modal/color/bg-pink.svg',
  },
  {
    icon: 'assets/images/board/icon/color/icon-brown.svg',
    background_url: 'assets/images/board/background/color/bg-brown.svg',
    preview_url: 'assets/images/board/modal/color/bg-brown.svg',
  },
  {
    icon: 'assets/images/board/icon/color/icon-green.svg',
    background_url: 'assets/images/board/background/color/bg-green.svg',
    preview_url: 'assets/images/board/modal/color/bg-green.svg',
  },
];

export const modalBackgroundPhotos = [
  {
    icon: 'assets/images/board/icon/photo/icon-asuka.jpg',
    background_url: 'assets/images/board/background/photo/bg-asuka.jpg',
    preview_url: 'assets/images/board/modal/photo/bg-asuka.png',
  },
  {
    icon: 'assets/images/board/icon/photo/icon-nike-girl-anime.jpg',
    background_url: 'assets/images/board/background/photo/bg-nike-girl-anime.jpg',
    preview_url: 'assets/images/board/modal/photo/bg-nike-anime-girl.png',
  },
  {
    icon: 'assets/images/board/icon/photo/icon-anime-girl-sit.jpg',
    background_url: 'assets/images/board/background/photo/bg-anime-girl-sit.jpg',
    preview_url: 'assets/images/board/modal/photo/bg-anime-girl-sit.png',
  },
  {
    icon: 'assets/images/board/icon/photo/icon-ram.jpg',
    background_url: 'assets/images/board/background/photo/bg-ram.jpg',
    preview_url: 'assets/images/board/modal/photo/bg-ram.png',
  },
];

export interface ListBackground {
  id?: string;
  icon: string;
  background_url: string;
  preview_url: string;
}