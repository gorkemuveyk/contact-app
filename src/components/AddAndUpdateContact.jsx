import { Field, Form, Formik } from "formik";
import Modal from "./Modal";
import PropType from "prop-types";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firabase";

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                className="border rounded outline-none h-10 p-3"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                className="border rounded outline-none h-10 p-3"
              />
            </div>

            <button
              type="submit"
              className="bg-orange p-x-3 py-1.5 rounded text-white outline-none mt-5"
            >
              {isUpdate ? "Update " : "Add "} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;

AddAndUpdateContact.propTypes = {
  isOpen: PropType.bool,
  isUpdate: PropType.bool,
  onClose: PropType.func,
  contact: PropType.object,
};
