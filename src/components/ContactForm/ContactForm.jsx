import { useState } from 'react';

import PropTypes from 'prop-types';
import shortid from 'shortid';

import s from './ContactForm.module.css';

function ContactForm({ submit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmint = e => {
    e.preventDefault();
    const newContact = {
      id: shortid(),
      name,
      number,
    };
    submit(newContact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  // const { name, number } = this.state;
  return (
    <div className={s.container}>
      <form onSubmit={handleSubmint} className={s.form}>
        <h3>Name</h3>
        <label>
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={handleChange}
          />
        </label>
        <h3>Number</h3>
        <label>
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default ContactForm;
