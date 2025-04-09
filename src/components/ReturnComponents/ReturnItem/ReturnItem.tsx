import DoneButton from "../../../assets/icons/done-button.svg";
import EditButton from "../../../assets/icons/edit-button.svg";
import DeleteButton from "../../../assets/icons/delete-button.svg";
import { GenericItemListProps } from "../../../types/types";
import "./returnItem.scss";
import Select from "../../SelectComponent";
import Button from "../../ButtonComponent";

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

const ReturnItem: React.FC<GenericItemListProps> = ({
  item,
  handleEditStatus,
  handleDelete,
  completeItem,
  setItems,
  statusList,
}) => {
  return (
    <div
      className={`return-info  ${getReturnStatusClass(item.status)} ${
        item.active
      }`}
    >
      <div className="return-info-content">
        <div className="return-reference">
          <label>Референс</label>
          <p>{item.reference}</p>
        </div>
        <div className="return-quantity">
          <label>Количество</label>
          <p>{item.quantity}</p>
        </div>
        <div className="return-price">
          <label>Стоимость</label>
          <p>{item.price}₸</p>
        </div>
        <div className="return-date">
          <label>Дата</label>
          <p>{item.date}</p>
        </div>
        <div className="return-seller">
          <label>Поставщик</label>
          <p>{item.seller}</p>
        </div>
        <div className="return-reason">
          <label>Причина возврата</label>
          <p>{item.reason}</p>
        </div>
        <div className="return-status">
          <label>Статус возврата</label>
          {item.isEditing ? (
            <Select
              placeholder="Выбери статус"
              returnSelect="return-status select"
              currentValue={item.status}
              options={statusList}
              onChange={(newStatus) => {
                setItems((prev) =>
                  prev.map((item) =>
                    item.id === item.id ? { ...item, status: newStatus } : item
                  )
                );
              }}
            />
          ) : (
            <p>{item.status}</p>
          )}
        </div>
        <div className="return-info-buttons">
          <Button
            btnClass="return-done-icon"
            buttonAlt="Завершить возврат"
            btnImgSrc={DoneButton}
            onClick={() => completeItem(item.id)}
            disabled={item.active === "finished"}
          />
          <Button
            btnClass="return-edit-icon"
            buttonAlt="Изменить статус возврата"
            btnImgSrc={EditButton}
            onClick={() => handleEditStatus(item.id)}
            disabled={item.active === "finished"}
          />
          <Button
            btnClass="return-delete-icon"
            buttonAlt="Удалить возврат"
            btnImgSrc={DeleteButton}
            onClick={() => handleDelete(item.id)}
            disabled={item.active === "finished"}
          />
        </div>
      </div>
    </div>
  );
};
export default ReturnItem;
