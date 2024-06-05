import React, { useEffect, useState, useRef } from "react";
import './App.css';

const UsersList = () => {
  const urlApi = "https://randomuser.me/api/?results=5";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetch(urlApi)
        .then(response => response.json())
        .then(data => {
          setUsers(data.results);
        })
        .catch(error => console.log('Hubo un error ' + error));
    }
  }, []);

  return (
    <div>
      <h1 className="tituloListado">Listado:</h1>
      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-card" onClick={() => setSelectedUser(user)}>
            <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
            <h2>{`${user.name.first} ${user.name.last}`}</h2>
            <p>{`${user.location.city}, ${user.location.country}`} </p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="modal" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-button" onClick={() => setSelectedUser(null)}>&times;</span>
            <h2>{`${selectedUser.name.first} ${selectedUser.name.last}`}</h2>
            <img src={selectedUser.picture.large} alt={`${selectedUser.name.first} ${selectedUser.name.last}`} />
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Telefono:</strong> {selectedUser.phone}</p>
            <p><strong>Dirección:</strong> {`${selectedUser.location.city}, ${selectedUser.location.country}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
