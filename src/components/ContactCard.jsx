import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import PropType from "prop-types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firabase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="flex bg-yellow justify-between items-center p-2 rounded"
      >
        <div className="flex gap-2 items-center">
          <HiOutlineUserCircle className="text-orange text-4xl" />

          <div className="text-black">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine
            onClick={onOpen}
            className="text-black cursor-pointer"
          />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange cursor-pointer"
          />
        </div>
      </div>

      <AddAndUpdateContact
        contact={contact}
        isOpen={isOpen}
        onClose={onClose}
        isUpdate
      />
    </>
  );
};

export default ContactCard;

ContactCard.propTypes = {
  contact: PropType.object,
};
