export default function InventoryItem(props) {
  const { title, imgUrl, copiesAvailable, totalAvailable } = props;

  const checkoutTitle = (event) => {
    alert(
      `There are currently ${copiesAvailable} copies available for the film ${title}.`
    );
  };

  return (
    <div className="inventory-item">
      <h3 className="item-title">{title}</h3>
      <img src={imgUrl} />
      <div className="item-actions">
        {copiesAvailable}/{totalAvailable} available
        <button disabled={copiesAvailable === 0} onClick={checkoutTitle}>
          Check Out
        </button>
      </div>
    </div>
  );
}
