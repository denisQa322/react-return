import React from "react";
import { GenericListProps } from "../../../types/types";
import CancellationItem from "../CancellationItem/CancellationItem";

const CancellationList: React.FC<GenericListProps> = ({
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
        <p className="info-empty">Нет отмен</p>
      ) : (
        items.map((cancellationItem) => (
          <CancellationItem
            statusList={statusList}
            key={cancellationItem.id}
            item={cancellationItem}
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

export default CancellationList;
