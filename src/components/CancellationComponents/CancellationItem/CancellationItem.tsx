import DoneButton from "../../../assets/icons/done-button.svg";
import EditButton from "../../../assets/icons/edit-button.svg";
import DeleteButton from "../../../assets/icons/delete-button.svg";
import { GenericItemListProps } from "../../../types/types";
import "./CancellationItem.scss";
import Select from "../../SelectComponent";
import Button from "../../ButtonComponent";

const getCancellationStatusClass = (status: string) => {
  switch (status) {
    case "Новая отмена":
      return "new-cancellation";
    case "Запрос отправлен":
      return "status-sent";
    case "Отмена принята":
      return "status-cancellation-accepted";
    default:
      return "";
  }
};

const CancellationItem: React.FC<GenericItemListProps> = ({
  item,
  handleEditStatus,
  handleDelete,
  completeItem,
  setItems,
  statusList,
}) => {
  return (
    <div
      className={`cancellation-info ${getCancellationStatusClass(
        item.status
      )} ${item.active}`}
    >
      <div className="cancellation-info-content">
        <div className="cancellation-reference">
          <label>Референс</label>
          <p>{item.reference}</p>
        </div>
        <div className="cancellation-quantity">
          <label>Количество</label>
          <p>{item.quantity}</p>
        </div>
        <div className="cancellation-price">
          <label>Стоимость</label>
          <p>{item.price}</p>
        </div>
        <div className="cancellation-date">
          <label>Дата</label>
          <p>{item.date}</p>
        </div>
        <div className="cancellation-seller">
          <label>Поставщик</label>
          <p>{item.seller}</p>
        </div>
        <div className="cancellation-reason">
          <label>Причина отмены</label>
          <p>{item.reason}</p>
        </div>
        <div className="cancellation-status">
          <label>Статус отмены</label>
          {item.isEditing ? (
            <Select
              placeholder="Выбери статус"
              cancellationSelect="cancellation-status select"
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
        <div className="cancellation-info-buttons">
          <Button
            btnClass="cancellation-done-icon"
            buttonAlt="Завершить отмену"
            btnImgSrc={DoneButton}
            onClick={() => completeItem(item.id)}
            disabled={item.active === "finished"}
          />
          <Button
            btnClass="cancellation-edit-icon"
            buttonAlt="Изменить статус отмены"
            btnImgSrc={EditButton}
            onClick={() => handleEditStatus(item.id)}
            disabled={item.active === "finished"}
          />
          <Button
            btnClass="cancellation-delete-icon"
            buttonAlt="Удалить отмену"
            btnImgSrc={DeleteButton}
            onClick={() => handleDelete(item.id)}
            disabled={item.active === "finished"}
          />
        </div>
      </div>
    </div>
  );
};

export default CancellationItem;
