import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className="modal" onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal"),
  );
}

export default Modal;
