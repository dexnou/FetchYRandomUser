import { useEffect, useState, useRef } from "react";
 
const UsersList = () => {
const urlApi = "https://randomuser.me/api/?results=5"
const [users, setUsers] = useState([]);
const fetchedRef = useRef(false);
useEffect(() => {
    if (!fetchedRef.current) {
        fetchedRef.current = true;
        fetch(urlApi)
            .then(response => response.json())
            .then(data => {
                setUsers(data.results);
                console.log(data.results);
            })
            .catch(error => console.log('Hubo un error ' + error));
    }
}, []); 
return(
<div>
    <h1>Listado: </h1>
    <ul> {users.map((user, index) => <li key={index}>{user.name.first}</li>)}</ul>
</div>
)}
export default UsersList

