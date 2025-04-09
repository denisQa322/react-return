import React from "react";
import { CancellationListProps } from "../../../types/types";
import CancellationItem from "../CancellationItem/CancellationItem";

const CancellationList: React.FC<CancellationListProps> = ({
  cancellations,
  handleEditStatus,
  handleDeleteCancellation,
  completeCancellation,
  cancellationStatusList,
  setCancellations,
}) => {
  return (
    <section className="info">
      {cancellations.length === 0 ? (
        <p className="info-empty">Нет отмен</p>
      ) : (
        cancellations.map((cancellationItem) => (
          <CancellationItem
            cancellationStatusList={cancellationStatusList}
            key={cancellationItem.id}
            cancellationItem={cancellationItem}
            handleEditStatus={handleEditStatus}
            handleDeleteCancellation={handleDeleteCancellation}
            completeCancellation={completeCancellation}
            setCancellations={setCancellations}
          />
        ))
      )}
    </section>
  );
};

export default CancellationList;
