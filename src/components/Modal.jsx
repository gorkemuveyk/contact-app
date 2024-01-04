import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-items-center backdrop-blur-sm h-screen w-screen absolute top-0 z-40">
          <div className="m-auto z-50 relative shadow min-h-[200px] w-[80%] max-w-[400px] bg-white text-black p-3 rounded">
            <div className="flex justify-end">
              <AiOutlineClose
                className="text-2xl cursor-pointer"
                onClick={onClose}
              />
            </div>
            {children}
          </div>

          <div className="backdrop-blur-sm h-screen w-screen absolute top-0 z-40" />
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
