import { initializeApp } from 'firebase/app';
import { 
    getFirestore, collection, onSnapshot, addDoc , deleteDoc, doc,
    query, where, orderBy, serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
    // Your Firebase Config
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'books');

// Sort by created time
const q = query(colRef, orderBy('createdAt'));

// Real-time listener
onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
});

// Add a new book
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

// Delete a book
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    });
});
