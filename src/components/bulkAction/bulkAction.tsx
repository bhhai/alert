import React, { useRef, useState } from "react";
import Popover from "../popover/popover";
import Button from "../button/button";
import Icon from "../icon";
import Function from "utils/function";
import "./bulkAction.scss";

export interface BulkActionItemModel {
  title: string;
  onClick: () => void;
}
interface BulkActionProps {
  name: string;
  selectedCount: number;
  bulkActionItems: BulkActionItemModel[];
}
export default function BulkAction(props: BulkActionProps) {
  const { name, selectedCount, bulkActionItems } = props;

  const refBulkAction = useRef();
  const [showBulkAction, setShowBulkAction] = useState<boolean>(false);
  //Function.useOnClickOutside(refBulkAction, () => setShowBulkAction(false), "base-bulk-action__button");

  return (
    <>
      {bulkActionItems && bulkActionItems.length > 0 && selectedCount > 0 ? (
        <div className="base-bulk-action">
          <ul className="d-flex align-items-center">
            <li className="select-count">
              Đã chọn <span>{selectedCount}</span> {name}
            </li>
            {bulkActionItems.map((item, index) => (
              <li className="action-item" onClick={() => item.onClick()} key={index}>{item.title}</li>
            ))}
            {/* <li className="base-bulk-action__button">
              <Button type="button" color="transparent" variant="outline-active" onClick={() => setShowBulkAction(!showBulkAction)}>
                Chọn thao tác <Icon name="ChevronDown" />
              </Button>
              {showBulkAction ? (
                <Popover isTriangle={true} position="left" className="base-bulk-action__popover" refContainer={refBulkAction} >
                  <ul>
                    {bulkActionItems.map((item, index) => (
                      <li key={index} onClick={() => item.onClick()}>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </Popover>
              ) : null}
            </li> */}
          </ul>
        </div>
      ) : null}
    </>
  );
}
