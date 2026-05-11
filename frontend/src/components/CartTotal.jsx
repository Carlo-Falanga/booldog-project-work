import { useGlobal } from "../context/CartContext"

export default function CartTotal() {
  const { total } = useGlobal();
  return (
    <div className="d-flex justify-content-between fs-5 fw-bold">
      <span>Totale:</span>
      <span>€ {total.toFixed(2)}</span>
    </div>
  );
}
