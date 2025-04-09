import React from "react";
import { GenericListProps } from "../../../types/types";
import ReturnItem from "../ReturnItem/ReturnItem";
import "./returnList.scss";

const ReturnList: React.FC<GenericListProps> = ({
  items,
  handleEditStatus,
  handleDelete,
  completeItem,
  statusList,
  setItems,
}) => {
  return (
    <section className="info">
      {items.length === 0 ? (
        <p className="info-empty">Нет возвратов</p>
      ) : (
        items.map((returnItem) => (
          <ReturnItem
            statusList={statusList}
            key={returnItem.id}
            returnItem={returnItem}
            handleEditStatus={handleEditStatus}
            handleDelete={handleDelete}
            completeItem={completeItem}
            setItems={setItems}
          />
        ))
      )}
    </section>
  );
};

export default ReturnList;
