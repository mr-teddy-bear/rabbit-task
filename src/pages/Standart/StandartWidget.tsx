import React, { useState } from "react";
import { Item } from "../../utils/interfaces";
import { StandartSelectionDialog } from "./StandartSelectionDialog";
import classes from "./StandartWidget.module.scss";

export const StandartWidget: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSave = (newSelection: Item[]) => {
    setSelectedItems(newSelection);
    handleCloseDialog();
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Selected Items</h2>
      <div className={classes.content}>
        {selectedItems.length === 0 ? (
          <p className={classes.noItemsText}>No items selected.</p>
        ) : (
          selectedItems.map((item) => (
            <div className={classes.selectedItem} key={item.id}>
              {item.label}{" "}
              <button onClick={() => handleRemoveItem(item.id)}>X</button>
            </div>
          ))
        )}
      </div>
      <button className={classes.choiseBtn} onClick={handleOpenDialog}>
        Change my choice
      </button>

      {isDialogOpen && (
        <StandartSelectionDialog
          initialSelectedItems={selectedItems}
          onSave={handleSave}
          onCancel={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default StandartWidget;
