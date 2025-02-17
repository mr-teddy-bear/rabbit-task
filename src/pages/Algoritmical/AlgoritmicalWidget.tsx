import React, { useState } from "react";
import { AlgoritmicalItem } from "../../utils/interfaces";
import { AlgoritmicalSelectionDialog } from "./AlgoritmicalSelectionDialog";
import classes from "./AlgoritmicalWidget.module.scss";

export const AlgoritmicalWidget: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<AlgoritmicalItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSave = (newSelection: AlgoritmicalItem[]) => {
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
        <AlgoritmicalSelectionDialog
          initialSelectedItems={selectedItems}
          onSave={handleSave}
          onCancel={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default AlgoritmicalWidget;
