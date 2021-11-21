import { useState, useEffect } from 'react';
// import React, { Component } from 'react';
import Section from './components/Section';
import Form from './components/Form';
import ContactsList from 'components/ContactsList';
import Filter from 'components/Filter';
import shortid from 'shortid';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');
  useEffect(() => {});

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmithandle = data => {
    data.id = shortid.generate();
    setContacts(contacts => [...contacts, data]);

    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already on contacts`);
      return;
    }
    if (data.name === '') {
      alert(`please, write the name from the contacts`);
      return;
    }
    if (data.number === '') {
      alert(`please, write the name from the number`);
    }
  };
  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  const changeFilter = ({ target }) => {
    setFilter({ filter: target.value });
  };
  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={formSubmithandle} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contacts={visibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
}
