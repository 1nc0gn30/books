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


const firebaseConfig = {
        apiKey: "AIzaSyBK0JLTUSF3LtVxJ7jr4VOqmKcOFW0BxEc",
        authDomain: "the-digital-builders.firebaseapp.com",
        projectId: "the-digital-builders",
        storageBucket: "the-digital-builders.appspot.com",
        messagingSenderId: "981290387520",
        appId: "1:981290387520:web:97fe68d363709b4e92f7a5",
        measurementId: "G-EKNKT0F2WF"
    };

initializeApp(firebaseConfig);


//connect to the proper channels
const database = getFirestore();
const authService = getAuth();


// like chosing a specific folder in a filling cabinet

const booksCollection = collection(database, 'books');

// now imagine looking for certain papers in our books folder
//but we want them sorted by the date, the query function 
const sortedBooksByDateQuery = query(collection(database, 'books'), orderBy('createdAt'));

// Real-time listener
//imagine we hired an assitant
//to listen in real time
onSnapshot(sortedBooksByDateQuery, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
});



// Add a new book
// Use booksCollection because we're adding a new document and don't need sorting

const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(booksCollection, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp(),
    }).then(() => {
        addBookForm.reset();
    })
    .catch((error =>{
        console.log("error adding documents: ", error);
    }))
});


//similar to the add boook but the other process like a shred
// which Delete a book
const deleteBookForm = document.querySelector('.delete');

deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(database, 'books', deleteBookForm.id.value);
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    })
    .catch((error =>{
        console.log("error adding documents: ", error);
    }))
})

//get a single document 

const docRef = doc(database, 'books', "T6hKUExh79lci8xUtEID")

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

//updating a document

const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a document reference
    const docRef = doc(database, 'books', updateForm.id.value);

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

    createUserWithEmailAndPassword(authService, email, password)
        .then((cred) => {
            console.log('user created:', cred.user)
            signupForm.reset()

        })
        .catch((err) => {
            console.log(err.message)
        });

    });

