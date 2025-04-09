import DoneButton from "../../../assets/icons/done-button.svg";
import EditButton from "../../../assets/icons/edit-button.svg";
import DeleteButton from "../../../assets/icons/delete-button.svg";
import { CancellationItemListProps } from "../../../types/types";
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

const CancellationItem: React.FC<CancellationItemListProps> = ({
  cancellationItem,
  handleEditStatus,
  handleDeleteCancellation,
  completeCancellation,
  setCancellations,
  cancellationStatusList,
}) => {
  return (
    <div
      className={`cancellation-info ${getCancellationStatusClass(
        cancellationItem.status
      )} ${cancellationItem.active}`}
    >
      <div className="cancellation-info-content">
        <div className="cancellation-reference">
          <label>Референс</label>
          <p>{cancellationItem.reference}</p>
        </div>
        <div className="cancellation-quantity">
          <label>Количество</label>
          <p>{cancellationItem.quantity}</p>
        </div>
        <div className="cancellation-price">
          <label>Стоимость</label>
          <p>{cancellationItem.price}</p>
        </div>
        <div className="cancellation-date">
          <label>Дата</label>
          <p>{cancellationItem.date}</p>
        </div>
        <div className="cancellation-seller">
          <label>Поставщик</label>
          <p>{cancellationItem.seller}</p>
        </div>
        <div className="cancellation-reason">
          <label>Причина отмены</label>
          <p>{cancellationItem.reason}</p>
        </div>
        <div className="cancellation-status">
          <label>Статус отмены</label>
          {cancellationItem.isEditing ? (
            <Select
              placeholder="Выбери статус"
              cancellationSelect="cancellation-status select"
              currentValue={cancellationItem.status}
              options={cancellationStatusList}
              onChange={(newStatus) => {
                setCancellations((prevCancellations) =>
                  prevCancellations.map((item) =>
                    item.id === cancellationItem.id
                      ? { ...item, status: newStatus }
                      : item
                  )
                );
              }}
            />
          ) : (
            <p>{cancellationItem.status}</p>
          )}
        </div>
        <div className="cancellation-info-buttons">
          <Button
            btnClass="cancellation-done-icon"
            buttonAlt="Завершить отмену"
            btnImgSrc={DoneButton}
            onClick={() => completeCancellation(cancellationItem.id)}
            disabled={cancellationItem.active === "finished"}
          />
          <Button
            btnClass="cancellation-edit-icon"
            buttonAlt="Изменить статус отмены"
            btnImgSrc={EditButton}
            onClick={() => handleEditStatus(cancellationItem.id)}
            disabled={cancellationItem.active === "finished"}
          />
          <Button
            btnClass="cancellation-delete-icon"
            buttonAlt="Удалить отмену"
            btnImgSrc={DeleteButton}
            onClick={() => handleDeleteCancellation(cancellationItem.id)}
            disabled={cancellationItem.active === "finished"}
          />
        </div>
      </div>
    </div>
  );
};

export default CancellationItem;
