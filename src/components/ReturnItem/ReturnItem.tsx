import Button from "../ButtonComponent";
import DoneButton from "../../assets/icons/done-button.svg";
import EditButton from "../../assets/icons/edit-button.svg";
import DeleteButton from "../../assets/icons/delete-button.svg";
import { ReturnItemListProps } from "../../types/returns";
import "./returnItem.scss";
import Select from "../SelectComponent";

const getReturnStatusClass = (status: string) => {
  switch (status) {
    case "Новый возврат":
      return "new-return";
    case "Запрос поставщику":
      return "status-sent";
    case "Запрос на возврат":
      return "status-return-requested";
    case "Запрос на утиль":
      return "status-to-dispose";
    case "Возврат получен":
      return "status-return-received";
    case "Возврат проведен":
      return "status-return-processed";
    case "finished":
      return "status-finished";
    default:
      return "";
  }
};

const ReturnItem: React.FC<ReturnItemListProps> = ({
  returnItem,
  handleEditStatus,
  handleDeleteReturn,
  completeReturn,
  setReturns,
  returnStatusList,
}) => {
  return (
    <div
      className={`return-info  ${getReturnStatusClass(returnItem.status)} ${
        returnItem.active
      }`}
    >
      <div className="return-info-content">
        <div className="return-reference">
          <label>Референс</label>
          <p>{returnItem.reference}</p>
        </div>
        <div className="return-quantity">
          <label>Количество</label>
          <p>{returnItem.quantity}</p>
        </div>
        <div className="return-price">
          <label>Стоимость</label>
          <p>{returnItem.price}₸</p>
        </div>
        <div className="return-date">
          <label>Дата</label>
          <p>{returnItem.date}</p>
        </div>
        <div className="return-seller">
          <label>Поставщик</label>
          <p>{returnItem.seller}</p>
        </div>
        <div className="return-reason">
          <label>Причина возврата</label>
          <p>{returnItem.reason}</p>
        </div>
        <div className="return-status">
          <label>Статус возврата</label>
          {returnItem.isEditing ? (
            <Select
              placeholder="Выбери статус"
              returnSelect="return-status select"
              currentValue={returnItem.status}
              options={returnStatusList}
              onChange={(newStatus) => {
                setReturns((prevReturns) =>
                  prevReturns.map((item) =>
                    item.id === returnItem.id
                      ? { ...item, status: newStatus }
                      : item
                  )
                );
              }}
            />
          ) : (
            <p>{returnItem.status}</p>
          )}
        </div>
        <div className="return-info-buttons">
          <Button
            btnClass="return-done-icon"
            buttonAlt="Завершить возврат"
            btnImgSrc={DoneButton}
            onClick={() => completeReturn(returnItem.id)}
            disabled={returnItem.active === "finished"}
          />
          <Button
            btnClass="return-edit-icon"
            buttonAlt="Изменить статус возврата"
            btnImgSrc={EditButton}
            onClick={() => handleEditStatus(returnItem.id)}
            disabled={returnItem.active === "finished"}
          />
          <Button
            btnClass="return-delete-icon"
            buttonAlt="Удалить возврат"
            btnImgSrc={DeleteButton}
            onClick={() => handleDeleteReturn(returnItem.id)}
            disabled={returnItem.active === "finished"}
          />
        </div>
      </div>
    </div>
  );
};
export default ReturnItem;
