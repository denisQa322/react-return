import React from "react";
import { ReturnListProps } from "../../types/returns";
import ReturnItem from "../ReturnItem/ReturnItem";

const ReturnList: React.FC<ReturnListProps> = ({
  returns,
  handleEditStatus,
  handleDeleteReturn,
  completeReturn,
}) => {
  return (
    <section className="info">
      {returns.length === 0 ? (
        <p className="info-empty">Нет возвратов</p>
      ) : (
        returns.map((returnItem) => (
          <ReturnItem
            key={returnItem.id}
            returnItem={returnItem}
            handleEditStatus={handleEditStatus}
            handleDeleteReturn={handleDeleteReturn}
            completeReturn={completeReturn}
          />
        ))
      )}
    </section>
  );
};

export default ReturnList;
