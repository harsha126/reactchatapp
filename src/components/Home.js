import React ,{useEffect,useState} from "react";
import { database,auth } from "../firebaseconfig";
import { collection,query,where,onSnapshot } from "firebase/firestore";
import User from "./User";
import MessageForm from "./MessageForm";
export default function Home() {
  const [users,setUsers] = useState();
  const[chat,setChat] = useState(null);
  useEffect(() =>{
     const usersRef = collection(database,'users')
    const q = query(usersRef,where('uid','not-in',[auth.currentUser.uid]))
    const unsub = onSnapshot(q,( querySnapshot ) =>{
      let users = [];
      querySnapshot.forEach(doc =>{
          users.push(doc.data())
      })
      setUsers(users);
    });
    return () => unsub();
  },[])
  const selectUser = (user) =>{
    setChat(user);
    console.log(user);
  }  
  return (
    <div className="home-container">
      <div className="users-container">
        {users?.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} />
        ))}
      </div>
      <div className="messages-container">
        {chat ? (
          <>
            <div className="messages-user">
              <h3>{chat.name}</h3>
            </div>
            <MessageForm />
          </>
        ) : (
          <div>
            <h3 className="no-conv">Select a user to Start converstation</h3>
          </div>
        )}
      </div>
    </div>
  );
}
