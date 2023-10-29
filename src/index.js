//The import statements under this are like grabbing tools from a toolbox
//grabing tools so that we can use them
//were taking out get firestore, collection deletedoc adddoc etc all these 
//they are all tools that we will use in this app which came from
//firebase
import { initializeApp } from 'firebase/app';
import { 
    getFirestore, collection, onSnapshot, addDoc , deleteDoc, doc,
    query, where, orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore';
import{
    getAuth, createUserWithEmailAndPassword
}
    from 'firebase/auth'


// This is configuring the settings on our remote before we use it
const firebaseConfig = {
};

//This initialize is turning the remote on after bateries are in
initializeApp(firebaseConfig);


//dialing into a channel on the TV now we are connected to firebase
//database channel and we are ready to send and recieve data
// just like when you watch tv you are sending and recieveing data
//between you and the device or even us now
//using the computer is sending and recieving data
//thats what we are doing here now that we are 
//connected to the get firestore
const db = getFirestore();
const auth = getAuth();


// like chosing a specific folder in a filling cabinet
// where we keep all our books information
// colref constant is a refrence 
// to that specific folder
const colRef = collection(db, 'books');

// now imagine looking for certain papers in our books folder
//but we want them sorted by the date, the query function 
// is doing that
const q = query(colRef, orderBy('createdAt'));

// Real-time listener
//imagine we hired an assitant
//to always keep a watchful eye on the books folder
//anytime a new paper is added updated or deleted
//they tell us in real time whats in the folder
onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
});



// Add a new book
//filing a form into our books folder on a new piece of paper
//like a form where if you hand it to someone 
//they fill it out and give it to us 
//we would put that info in our book collection and give the paper back to them
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp(),
    }).then(() => {
        addBookForm.reset();
    });
});


//similar to the add boook but the other process like a shred
// which Delete a book
const deleteBookForm = document.querySelector('.delete');

deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    });
})

//get a single document 

const docRef = doc(db, 'books', "T6hKUExh79lci8xUtEID")

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

//updating a document

const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a document reference
    const docRef = doc(db, 'books', updateForm.id.value);

    // Update the document
    updateDoc(docRef, { title: 'updated title' })
    .then(() => {
        // Reset the form after the update is successful
        updateForm.reset();
    })
    .catch((error) => {
        // Log any errors
        console.error("Error updating document: ", error);
    });

});

    //signing users up
    const signupForm = document.querySelector('.signup')
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = signupForm.email.value 
        const password = signupForm.password.value 

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:', cred.user)
            signupForm.reset()

        })
        .catch((err) => {
            console.log(err.message)
        });

    });

