import React, { ChangeEvent, useMemo, useState } from "react";
import { AlgoritmicalItem } from "../../utils/interfaces";
import { ALGORITMICAL_ITEMS as ITEMS } from "../../utils/constants";
import { binarySearchForId, kmpSearch } from "../../utils/functions";
import classes from "./AlgoritmicalSelectionDialog.module.scss";
import { createPortal } from "react-dom";

interface SelectionDialogProps {
  initialSelectedItems: AlgoritmicalItem[];
  onSave: (selected: AlgoritmicalItem[]) => void;
  onCancel: () => void;
}

export const AlgoritmicalSelectionDialog: React.FC<SelectionDialogProps> = ({
  initialSelectedItems,
  onSave,
  onCancel,
}) => {
  const [localSelectedItems, setLocalSelectedItems] =
    useState<AlgoritmicalItem[]>(initialSelectedItems);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterValue, setFilterValue] = useState<number>(0);

  const filteredItems = useMemo(() => {
    let items = ITEMS;

    if (filterValue > 0) {
      const startIndex = binarySearchForId(items, filterValue);
      items = items.slice(startIndex);
    }

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      items = items.filter((item) => kmpSearch(item.lowerLabel, lowerSearch));
    }

    return items;
  }, [searchTerm, filterValue]);

  const toggleItem = (item: AlgoritmicalItem) => {
    const alreadySelected = localSelectedItems.some(
      (selected) => selected.id === item.id
    );
    if (alreadySelected) {
      setLocalSelectedItems(
        localSelectedItems.filter((selected) => selected.id !== item.id)
      );
    } else if (localSelectedItems.length < 3) {
      setLocalSelectedItems([...localSelectedItems, item]);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(Number(e.target.value));
  };

  const maxSelectedReached = localSelectedItems.length >= 3;

  return createPortal(
    <div className={classes.wrapper}>
      <div className={classes.popup}>
        <h3 className={classes.popupTitle}>Select up to 3 Items</h3>

        <div style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select value={filterValue} onChange={handleFilterChange}>
            <option value={0}>No filter</option>
            <option value={10}>&gt; 10</option>
            <option value={50}>&gt; 50</option>
            <option value={100}>&gt; 100</option>
          </select>
        </div>

        <div className={classes.itemsContainer}>
          {filteredItems.map((item) => {
            const isChecked = localSelectedItems.some(
              (selected) => selected.id === item.id
            );
            return (
              <div key={item.id} style={{ marginBottom: "4px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={!isChecked && maxSelectedReached}
                    onChange={() => toggleItem(item)}
                  />
                  {item.label}
                </label>
              </div>
            );
          })}
          {filteredItems.length === 0 && <p>No items match the criteria.</p>}
        </div>

        <div className={classes.selectedItemsContainer}>
          <h4 className={classes.title}>Selected Items:</h4>
          <div className={classes.content}>
            {localSelectedItems.map((item) => (
              <div className={classes.selectedItem} key={item.id}>
                {item.label}{" "}
                <button
                  onClick={() => toggleItem(item)}
                  style={{ marginLeft: "4px", color: "red" }}
                >
                  X
                </button>
              </div>
            ))}
            {localSelectedItems.length === 0 && (
              <p className={classes.noItemsText}>No items selected yet.</p>
            )}
          </div>
        </div>

        <div className={classes.btnWrapper}>
          <button className={classes.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button
            onClick={() => onSave(localSelectedItems)}
            className={classes.saveBtn}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
