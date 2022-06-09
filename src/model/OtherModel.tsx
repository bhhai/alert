export interface IOption {
  value: string | number;
  label: string | number;
  type?: "number" | "amount";
}
export interface INotification {
  total: number;
  unread: number;
  list_noti: INotificationItem[];
}
export interface INotificationItem {
  id: number;
  title: string;
  content: string;
  url: string;
  type: string;
  is_read?: boolean;
  created_at: string;
}

export interface ITag {
  value: string;
  //disable: boolean;
}
