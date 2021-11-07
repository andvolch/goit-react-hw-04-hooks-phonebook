import { useState, useMemo } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import useLocalStorage from './hooks/useLocalStorage';
// import dataBaseContacts from './data/contacts.json';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = contactic => {
    // console.log(contact);

    const check = contacts.some(
      contact => contact.name.toLowerCase() === contactic.name.toLowerCase(),
    );

    check
      ? alert(`${contactic.name} is already in contacts`)
      : setContacts(contacts => [...contacts, contactic]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const displayContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [contacts, filter]);

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm submit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter filter={filter} change={changeFilter} />
      <ContactList contacts={displayContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
