import Button from "../ButtonComponent";
import DoneButton from "../../assets/icons/done-button.svg";
import EditButton from "../../assets/icons/edit-button.svg";
import DeleteButton from "../../assets/icons/delete-button.svg";
import { ReturnItemListProps } from "../../types/returns";

const ReturnItem: React.FC<ReturnItemListProps> = ({
  returnItem,
  handleEditStatus,
  handleDeleteReturn,
  completeReturn,
}) => {
  return (
    <div className={`return-info ${returnItem.active}`}>
      <div className="return-info-content">
        <div className="return-reference">
          <label>Референс</label>
          <p>{returnItem.reference}</p>
        </div>
        <div className="return-status">
          <label>Статус возврата</label>
          <p>{returnItem.status}</p>
        </div>
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
  );
};
export default ReturnItem;
