import { useState, useEffect } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import dataBaseContacts from './data/contacts.json';

function App() {
  const [contacts, setContacts] = useState(dataBaseContacts);
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: dataBaseContacts,
  //   filter: '',
  // };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));

    const dataContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(dataContacts);
    setContacts(parsedContacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // const componentDidMount =() => {
  //   const dataContacts = localStorage.getItem('contacts');
  //

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }
  //  componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.contacts.filter(contact => contact.id !== contactId),
    );
    // this.setState(prewState => ({
    //   contacts: prewState.contacts.filter(contact => contact.id !== contactId),
    // }));
  };

  const formSubmitHandler = contactic => {
    // console.log(contact);

    const check = contacts.some(
      contact => contact.name.toLowerCase() === contactic.name.toLowerCase(),
    );

    check
      ? alert(`${contactic.name} is already in contacts`)
      : setContacts(contacts => [contactic, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const displayContacts = () => {
    // const { contacts, filter } = this.state;
    const normalFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter),
    );
  };

  // const { filter } = this.state;

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
