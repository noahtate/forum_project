import InventoryItem from "./InventoryItem";

export default function HomePage(props) {
  return (
    <>
      <h2>Inventory</h2>
      <div className="title-container">
        {props.inventory.map((inventoryItem, index) => (
          <InventoryItem
            key={index}
            title={inventoryItem.title}
            imgUrl={inventoryItem.imgUrl}
            copiesAvailable={inventoryItem.copiesAvailable}
            totalAvailable={inventoryItem.totalAvailable}
          />
        ))}
      </div>
    </>
  );
}
