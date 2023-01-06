import './App.css';
import contacts from "./contacts.json";
import { useState } from 'react'

function App() {
  let myContacts = contacts.slice(0,5);
  const [contactsData, setContactsData] = useState(myContacts);
  const remainingContacts = contacts.slice(5, contacts.length)

  const addRandomContact = (array) => {
    let randomCeleb = {}
    randomCeleb = array[ Math.floor(Math.random() * array.length) ];
    const exists = contactsData.some( e => e.id === randomCeleb.id)
    console.log(exists)
    if (!exists) {
      setContactsData(contactsData => [...contactsData, randomCeleb])
    }
    console.log(contactsData)
  }

  const removeContact = (contactId) => {
    setContactsData(current =>
      current.filter(e => {
        return e.id !== contactId;
      }),
    );
  }

  const sortContactByName = (array) => {
    const sorted = array.sort((a, b) => {
      let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
      if (fa < fb) {  return -1 }
      if (fa > fb) { return 1 }
      return 0;
    });
    setContactsData(contactsData => [...sorted]);
  }

  const sortContactByPopularity = (array) => {
    const sorted = array.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setContactsData(contactsData => [...sorted]);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="buttonsContainer">
        <button onClick={ () => addRandomContact(remainingContacts)}>Add Random Contact</button>
        <button onClick={ () => sortContactByName(contactsData)}>Sort contact by name</button>
        <button onClick={ () => sortContactByPopularity(contactsData)}>Sort contact by popularity</button>
      </div>
      <table style={{width:"100%"}}>
        <thead>
          <tr>
            <th style={{width:"30%"}}>>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsData.map( e => {
            return (
              <tr key={e.id}>
                <td><img src={e.pictureUrl} alt=""  width="100%" height="100%"/></td>
                <td>{e.name}</td>
                <td>{e.popularity.toFixed(2)}</td>
                <td >{e.wonOscar && '🏆'}</td>
                <td>{e.wonEmmy && '🏆'}</td>
                <td><button onClick={ () => removeContact(e.id)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
