export interface ISourceFilter {
  value: string | number,
  label: string,
  active: boolean
}

export const SourceFilterData : ISourceFilter[] = [
  {
    value: "all",
    active: true,
    label: "Tất cả",
  },
  {
    value: "news",
    active: false,
    label: "Báo chí",
  },
  {
    value: "web",
    active: false,
    label: "Trang tin tức",
  },
  {
    value: "facebook",
    active: false,
    label: "Facebook",
  },
  {
    value: "youtube",
    active: false,
    label: "Youtube",
  },
  {
    value: "tiktok",
    active: false,
    label: "Tiktok",
  },
]