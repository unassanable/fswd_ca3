import React, { useState } from 'react';

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) return;

    if (editingId !== null) {
      // Update existing contact
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === editingId ? { ...contact, name, email } : contact
        )
      );
      setEditingId(null);
    } else {
      // Add new contact
      const newContact = {
        id: Date.now(),
        name,
        email,
      };
      setContacts([...contacts, newContact]);
    }

    // Reset form
    setName('');
    setEmail('');
  };

  const handleEdit = (contact) => {
    setName(contact.name);
    setEmail(contact.email);
    setEditingId(contact.id);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Contact Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />
        <button type="submit">{editingId ? 'Update Contact' : 'Add Contact'}</button>
      </form>

      <ul style={{ marginTop: '1rem' }}>
        {contacts.map((contact) => (
          <li key={contact.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{contact.name}</strong> - {contact.email}{' '}
            <button onClick={() => handleEdit(contact)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
