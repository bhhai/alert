import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IMenuItem } from "model/MenuModel";
import Icon from "../icon";
import _ from "lodash";
import "./navigation.scss";

interface NavigationProps {
  menuItemList: IMenuItem[];
}

export default function Navigation(props: NavigationProps) {
  const { menuItemList } = props;
  const location = useLocation();
  const [menuList, setMenuList] = useState<IMenuItem[]>(
    menuItemList.map((m) => {
      return {
        ...m,
        isShowChildren:
          m.path === location.pathname ||
          (m.children && m.children.filter((children) => children.path === location.pathname)?.length > 0) ||
          m.isActive,
      };
    })
  );
  const setShowChildren = (idx: number) => {
    const menuListNew = _.cloneDeep(menuList);
    setMenuList(
      menuListNew.map((m, index) => {
        return {
          ...m,
          isShowChildren: m.isShowChildren === true ? false : index === idx,
        };
      })
    );
  };

  return (
    <ul className="navigation">
      {menuList.map((item, idx) => {
        const isActive =
          item.path === location.pathname ||
          (item.children && item.children.filter((children) => children.path === location.pathname)?.length > 0) ||
          item.isActive;
        return (
          <li key={idx} className={`level-1${isActive ? " active" : ""}${item.isShowChildren ? " show-children" : ""}`}>
            {item.children && item.children.length > 0 ? (
              <a className="d-flex align-items-center" onClick={() => setShowChildren(idx)} title={item.title} target={item.target}>
                {item.icon}
                <span>{item.title}</span>
                {item.children && item.children.length > 0 ? (
                  item.isShowChildren ? (
                    <Icon name="ChevronDown" className="arrow-menu" />
                  ) : (
                    <Icon name="ChevronRight" className="arrow-menu" />
                  )
                ) : null}
              </a>
            ) : (
              <Link className="d-flex align-items-center" to={item.path} title={item.title} target={item.target}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            )}
            {item.children && item.children.length > 0 ? (
              <ul
                style={{
                  maxHeight: item.isShowChildren || (isActive && menuList.find((m) => m.isShowChildren) === item) ? item.children.length * 48 : 0,
                }}
              >
                {item.children.map((childrenItem, idxChild) => (
                  <li key={idxChild} className={`level-2${childrenItem.path === location.pathname ? " active" : ""}`}>
                    <Link className="d-flex align-items-center" to={childrenItem.path} title={childrenItem.title} target={childrenItem.target}>
                      {childrenItem.icon}
                      {childrenItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
