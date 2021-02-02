import React from "react";
import Modal from "../../components/Modal/Modal";

const OrderModal = ({ handleOrder, close }) => {
  return (
    <Modal close={close}>
      <p className="is-size-4 has-text-weight-semibold mb-3">
        This Is Just A Portfolio Project. Dont expect the product Delivered. If
        You Wanna Place A Order Anyways Click On The Button Below
      </p>
      <button
        onClick={handleOrder}
        className="button is-link is-light is-outlined is-large is-fullwidth "
      >
        Confirm Order
      </button>
    </Modal>
  );
};

export default OrderModal;
