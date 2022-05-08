import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import avat from "../images/avataaars.png";
import Camera from "../images/Camera";
import { storage,database, auth } from "../firebaseconfig";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import {getDoc,doc,updateDoc} from 'firebase/firestore'
import Trash from "../images/Trash";
export default function Profile() {
  const [img, setImg] = useState("");
  const[user,setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getDoc(doc(database,'users',auth.currentUser.uid)).then((docSnap)=>{
      if(docSnap.exists){
        setUser(docSnap.data())
      }
    });

    if(img){
      const uploadImg = async () =>{
        const imgRef = ref(storage,`avatar/${new Date().getTime()} - ${img.name}`);
        try{
            
            const snap = await uploadBytes(imgRef, img);
            const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
            console.log(snap.ref.fullPath);
            await updateDoc(doc(database, "users", auth.currentUser.uid), {
              avatar: url,
              avatarPath: snap.ref.fullPath,
            });

            setImg("");
        }
        catch(err){
            console.log(err.message)
        }
        
      };
      uploadImg();
    }
  }, [img]);

  const deleteImg = async () =>{
    try{
      const confirm = window.confirm("Delete avatar ?");
    if(confirm){
        await deleteObject(ref(storage,user.avatarPath));

        await updateDoc(doc(database,'users',auth.currentUser.uid),{
          avatar:"",
          avatarPath:""
        });
        navigate('/home')
      }
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
    user?<section>
      <div className="profile-container">
        <div className="img-container">
          <img src={user.avatar||avat} alt="avatar" className="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              {user.avatar?<Trash deleteImg = {deleteImg}/>:null}
              <input
                type="file"
                accept="images/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text-container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          <small>Joined on : {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
    : null
  );
}
