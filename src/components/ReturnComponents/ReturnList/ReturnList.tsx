import React from "react";
import { ReturnListProps } from "../../../types/types";
import ReturnItem from "../ReturnItem/ReturnItem";
import "./returnList.scss";

const ReturnList: React.FC<ReturnListProps> = ({
  returns,
  handleEditStatus,
  handleDeleteReturn,
  completeReturn,
  returnStatusList,
  setReturns,
}) => {
  return (
    <section className="info">
      {returns.length === 0 ? (
        <p className="info-empty">Нет возвратов</p>
      ) : (
        returns.map((returnItem) => (
          <ReturnItem
            returnStatusList={returnStatusList}
            key={returnItem.id}
            returnItem={returnItem}
            handleEditStatus={handleEditStatus}
            handleDeleteReturn={handleDeleteReturn}
            completeReturn={completeReturn}
            setReturns={setReturns}
          />
        ))
      )}
    </section>
  );
};

export default ReturnList;
