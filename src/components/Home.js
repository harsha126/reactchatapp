import React, { useEffect, useState } from "react";
import { database, auth, storage } from "../firebaseconfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc
} from "firebase/firestore";
import User from "./User";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import MessageForm from "./MessageForm";
import Messages from "./Messages";
export default function Home() {
  const [users, setUsers] = useState();
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;
  useEffect(() => {
    const usersRef = collection(database, "users");
    const q = query(usersRef, where("uid", "not-in", [user1]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = (user) => {
    setChat(user);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(database, "messages", id, "chat");
    const q = query(msgsRef, orderBy('ceatedAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()}-${img.name}}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlurl;
    }
    await addDoc(collection(database, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      ceatedAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(database, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      media: url || "",
      unread : true,
    });

    setText("");
  };

  return (
    <div className="home-container">
      <div className="users-container">
        {users?.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} user1 = {user1} />
        ))}
      </div>
      <div className="messages-container">
        {chat ? (
          <>
            <div className="messages-user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length ? msgs.map((msg,i)=> <Messages key = {i} msg = {msg} user1 = {user1} chat = {chat}/>):null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
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
