import { ITag } from "model/OtherModel";

export interface IFilterModel {
  type: string;
  value: string;
}

export interface IDomainModel {
  value: string;
  filters: IFilterModel[];
}

export interface IKeyModel {
  main_keywords: string[];
  sub_keywords: string[];
  exclude_keywords: string[];
}

export interface IShareProject {
  approved_person_id: number;
  project_role_id: number;
  user_id: number;
}

export interface IProjectModel {
  name: string;
  avatar: string;
  category: string;
  domain: [];
  youtube: [];
  twitter: [];
  tiktok: [];
  facebook: [];
  rules: IKeyModel[];
  dateStart: any,
  dateEnd: any,
  share_project: IShareProject[],
  pervasive_threshold: number;
  pollution_threshold: number;
}
