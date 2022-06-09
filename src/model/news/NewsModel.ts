
export interface CardModel {
  id: number | string;
  thumb?: string;
  source?: string;
  date?: any;
  tag?: string;
  imageSrc?: string;
  title?: string;
  stickers?: any[];
  summary?: string;
  view?: number;
  like?: number;
  comment?: number;
  share?: number;
}

export interface IStickerModel {
  id: any;
  name: string;
}

export interface IDomainModel {
  id: any;
  name: string
}


export interface ITimeModel {
  id: any;
  name: string;
}
export interface ISourceModel {
  id: any;
  name: string;
}
export interface IProjectModel {
  id: any;
  name: string;
}

export const SourceFilterFakeData: ISourceModel[] = [
  {
    id: 1,
    name: "Nguồn đăng 1"
  },
  {
    id: 2,
    name: "Nguồn đăng 2"
  },
  {
    id: 3,
    name: "Nguồn đăng 3"
  },
  {
    id: 4,
    name: "Nguồn đăng 4"
  },
  {
    id: 5,
    name: "Nguồn đăng 5"
  }
]
export const ProjectFilterFakeData: IProjectModel[] = [
  {
    id: 1,
    name: "Dự án 1"
  },
  {
    id: 2,
    name: "Dự án 2"
  },
  {
    id: 3,
    name: "Dự án 3"
  }
]


export const TimeFilterFakeData: ITimeModel[] = [
  {
    id: 1,
    name: "7 ngày trước"
  },
  {
    id: 2,
    name: "14 ngày trước"
  },
  {
    id: 3,
    name: "tháng trước"
  }
]

export const DomainFakeData: IDomainModel[] = [
  {
    id: 1,
    name: "Facebook.com"
  },
  {
    id: 2,
    name: "Dantri.com"
  },
  {
    id: 3,
    name: "tiktok.com"
  }
]

export const StickerDataFake: IStickerModel[] = [
  {
    id: 1,
    name: "Sticker 1",
  },
  {
    id: 2,
    name: "Sticker 2",
  },
  {
    id: 3,
    name: "Sticker 3",
  },
  {
    id: 4,
    name: "Sticker 4",
  },
  {
    id: 5,
    name: "Sticker 5",
  },
  {
    id: 6,
    name: "Sticker 6",
  },
  {
    id: 7,
    name: "Sticker 7",
  },
  {
    id: 8,
    name: "Sticker 8",
  },
  {
    id: 9,
    name: "Sticker 9",
  },
  {
    id: 10,
    name: "Sticker 10",
  },
]


export const NewsCardDataFake: CardModel[] = [
  {
    id: 1,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Tích cực",
    imageSrc:
      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
    stickers: ["sticker 1", "sticker 2"],
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 2,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    date: "1 tháng 1 năm 2022",
    source: "Facebook.com",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 3,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    date: "1 tháng 1 năm 2022",
    source: "24h.com.vn",
    tag: "Tiêu cực",
    imageSrc:
      "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 4,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    date: "1 tháng 1 năm 2022",
    source: "vnexpress.vn",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 5,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    date: "1 tháng 1 năm 2022",
    tag: "Tiêu cực",
    source: "dantri.com",
    imageSrc:
      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 6,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    source: "tiktok.com",
    imageSrc:
      "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài và nó có thể dài tới hai hoặc ba dòng và nếu ba dòng thì nó sẽ xuống như này",
    stickers: ["sticker 1", "sticker 2", "sticker 2", "sticker 2", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 7,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    date: "1 tháng 1 năm 2022",
    tag: "Tích cực",
    source: "Instagram.com",
    imageSrc:
      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 8,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    date: "1 tháng 1 năm 2022",
    tag: "Tích cực",
    source: "Facebook.com",
    imageSrc:
      "https://images.pexels.com/photos/2591408/pexels-photo-2591408.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 9,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 10,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/2591408/pexels-photo-2591408.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 11,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 12,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/2591408/pexels-photo-2591408.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 14,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 15,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/2591408/pexels-photo-2591408.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 16,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 17,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 18,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 19,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 20,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 21,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 22,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 23,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 24,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 25,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 26,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 27,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 28,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 29,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 30,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
  {
    id: 31,
    thumb: "https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg",
    source: "Facebook.com",
    date: "1 tháng 1 năm 2022",
    tag: "Trung lập",
    imageSrc:
      "https://images.pexels.com/photos/5989068/pexels-photo-5989068.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Đây là tiêu đề của tin bài",
    stickers: ["sticker 1", "sticker 2"],
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    view: 255,
    like: 255,
    comment: 255,
    share: 99,
  },
]