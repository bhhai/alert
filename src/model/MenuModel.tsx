export interface IMenuItem {
  title: string;
  path: string;
  icon?: any;
  target?: string;
  isActive?: boolean;
  children?: IMenuItem[];
  isShowChildren?: boolean;
}

export interface IRouter {
  path: string;
  component: any;
}
