import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../hooks/store';
import { createAPI } from '../services/api';

export const makeFakePromoProducts = [
  {
    id: 7,
    name: 'Look 54',
    previewImg: 'img/content/promo-look-54.jpg',
    previewImg2x: 'img/content/promo-look-54@2x.jpg',
    previewImgWebp: 'img/content/promo-look-54.webp',
    previewImgWebp2x: 'img/content/promo-look-54@2x.webp',
  },
  {
    id: 35,
    name: 'Click Pro',
    previewImg: 'img/content/promo_click_pro.jpg',
    previewImg2x: 'img/content/promo_click_pro@2x.jpg',
    previewImgWebp: 'img/content/promo_click_pro.webp',
    previewImgWebp2x: 'img/content/promo_click_pro@2x.webp',
  },
  {
    id: 36,
    name: 'Click Lite R',
    previewImg: 'img/content/promo_click-lite-r.jpg',
    previewImg2x: 'img/content/promo_click-lite-r@2x.jpg',
    previewImgWebp: 'img/content/promo_click-lite-r.webp',
    previewImgWebp2x: 'img/content/promo_click-lite-r@2x.webp',
  },
];

export const makeFakeProducts = [
  {
    id: 1,
    name: 'Ретрокамера Dus Auge lV',
    vendorCode: 'DA4IU67AD5',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description:
      'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники. Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с Das Auge IV начнётся ваш путь к наградам всех престижных кинофестивалей.',
    previewImg: 'img/content/das-auge.jpg',
    level: 'Любительский',
    price: 73450,
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    rating: 4,
    reviewCount: 68,
  },
  {
    id: 2,
    name: 'FastShot MR-5',
    vendorCode: 'JH34KHN895',
    type: 'Моментальная',
    category: 'Фотоаппарат',
    description:
      'Новое слово в создании моментальных фото. Высокое качество снимков, легко перезаряжаемые кассеты, встроенная вспышка. Создавайте альбомы здесь и сейчас.',
    previewImg: 'img/content/fast-shot.jpg',
    level: 'Любительский',
    price: 18970,
    previewImg2x: 'img/content/fast-shot@2x.jpg',
    previewImgWebp: 'img/content/fast-shot.webp',
    previewImgWebp2x: 'img/content/fast-shot@2x.webp',
    rating: 4,
    reviewCount: 22,
  },
  {
    id: 3,
    name: 'Instaprinter P2',
    vendorCode: 'KLU789GH56',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description:
      'Компактная модель позволяющая получать чёткие снимки с 25-кратным зумом. В комплекте зарядное устройство и бархатный чехол, а так же удобный шнурок на шею.',
    previewImg: 'img/content/instaprinter.jpg',
    level: 'Нулевой',
    price: 8430,
    previewImg2x: 'img/content/instaprinter@2x.jpg',
    previewImgWebp: 'img/content/instaprinter.webp',
    previewImgWebp2x: 'img/content/instaprinter@2x.webp',
    rating: 3,
    reviewCount: 11,
  },
  {
    id: 4,
    name: 'Орлёнок',
    vendorCode: 'O78DFGSD83',
    type: 'Плёночная',
    category: 'Фотоаппарат',
    description:
      'Плёночная перезаряжаемая камера нового покаления уже укомплектована плёнкой и оснащена встроенной вспышкой. Легко помещается в руке и обладет интересным дизайном.',
    previewImg: 'img/content/orlenok.jpg',
    level: 'Любительский',
    price: 19970,
    previewImg2x: 'img/content/orlenok@2x.jpg',
    previewImgWebp: 'img/content/orlenok.webp',
    previewImgWebp2x: 'img/content/orlenok@2x.webp',
    rating: 3,
    reviewCount: 14,
  },
];
export const makeFakeProduct = {
  id: 1,
  name: 'Ретрокамера Dus Auge lV',
  vendorCode: 'DA4IU67AD5',
  type: 'Коллекционная',
  category: 'Видеокамера',
  description:
    'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники. Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с Das Auge IV начнётся ваш путь к наградам всех престижных кинофестивалей.',
  previewImg: 'img/content/das-auge.jpg',
  level: 'Любительский',
  price: 73450,
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
  rating: 4,
  reviewCount: 68,
};
export const makeFakeProductReview = {
  id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
  createAt: '2022-07-09T13:24:57.980Z',
  cameraId: 1,
  userName: 'Кирилл',
  advantage: 'Легкая в плане веса, удобная в интерфейсе',
  disadvantage: 'Быстро садиться зарядка',
  review: 'Это моя первая камера. Я в восторге, нареканий нет',
  rating: 5,
};

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
