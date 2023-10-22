import React from 'react'
//import {  } from 'react-router-dom';
import { auth } from '../FirebaseConfig'
import { collection, doc, documentId, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../FirestoreConfig'

function ValidationUser() {

    const uid = auth.currentUser.uid

    const findUser = async () => {

        const querySnapshot = query(collection(db, 'users'), where('user.uid', '==', uid));
        const docSnap = await getDocs(querySnapshot)

        const transactions = docSnap.docs.map((doc) => (doc.data()));            
        
        var users = false;
        

        transactions.forEach((docSnap) => {
             const { role } = docSnap;
             if (role === 'user') {
                users = false;  
             } else if (role === 'admin') {
                users = true;
             }
        })
        console.log(transactions) 
    } 
    findUser();


    return (


        <div>

            
        </div>
    )
}

export default ValidationUser