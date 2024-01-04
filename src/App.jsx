import "./App.css";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firabase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";

function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);

        const contactLists = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />

        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute text-3xl text-white pl-1" />
            <input
              type="text"
              className=" h-10 flex-grow text-white bg-transparent border border-white rounded-md pl-9 pe-2"
            />
          </div>

          <div>
            <AiFillPlusCircle
              onClick={onOpen}
              className="text-5xl cursor-pointer text-white"
            />
          </div>
        </div>

        <div className="mt-4 gap-2 flex flex-col">
          {contacts.map((contact) => (
            <ContactCard contact={contact} key={contact.name} />
          ))}
        </div>
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default App;
