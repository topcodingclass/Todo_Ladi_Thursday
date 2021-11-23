import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'
import { Octicons } from '@expo/vector-icons';
// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAtFiz013qIylI5pAPkYOlIu7DoE0w2_eI",
  authDomain: "todoapp-26781.firebaseapp.com",
  projectId: "todoapp-26781",
  storageBucket: "todoapp-26781.appspot.com",
  messagingSenderId: "733150535249",
  appId: "1:733150535249:web:dc9e9e530b2a7b2d0f2270"
});

const db = getFirestore();

const App = () => {
  const [todo, setTodo] = useState()
  const [todos, setTodos] = useState([])

  const fetchData = () => {
    let todosFromDB = []



    getDocs(collection(db, "todos")).
      querySnapshot?.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log('############ Doc ID:', doc.id)
        console.log('Doc data', doc.data())
        todosFromDB.push({ _id: doc.id, ...doc.data() });
      });
    setTodos(todosFromDB)
  };

  useEffect(() => {
    console.log("Read data")   

    onSnapshot(collection(db, "todos"), (querySnapshot) => {
      let todosFromDB = []
      querySnapshot.forEach((doc) => {
        console.log('############ Doc ID:', doc.id)
        console.log('Doc data', doc.data())
        todosFromDB.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todosFromDB)
    });
    
  }, [])

  const addTodo = () => {
    let newTodo = { title: todo, compelted: false, created: Date() }

    addDoc(collection(db, "todos"), newTodo).then(() => {
      console.log("Document successfully added!");
      setTodos([newTodo, ...todos])
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });

  }

  const toggleTodo = (index) => {
    let allTodo = todos
    let Todo = allTodo[index]
    Todo.compelted = true
    allTodo[0] = Todo
    console.log(allTodo)
    setTodos([...allTodo])

  }

  const deleteTodo = (index) => {
    console.log('Start delete')

    const todo = todos[index]
    console.log('############### Todo:', todo)
    deleteDoc(doc(db, "todos", todo.id)).then(() => {
      console.log("Document successfully deleted!");
      let allTodo = todos
      allTodo.splice(index, 1)
      console.log(allTodo)
      setTodos([...allTodo])
    }).catch((error) => {
      console.error("Error deleting document: ", error);
    });

  }



  useEffect(() => {
    console.log(todos)
  })


  const renderItem = ({ item, index }) => (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
      <TouchableOpacity onPress={() => toggleTodo(index)}>
        <Text style={{ textDecorationLine: item.compelted ? 'line-through' : 'none' }}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { deleteTodo(index) }}>
        <Octicons name="trashcan" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
  return (
    <View>
      {/* Header */}
      <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange' }}>
        <Text style={{ fontSize: 30, color: 'white' }}>Todo App</Text>
      </View>
      {/* Add todo */}
      <View style={{ flex: 1, flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
        <TextInput style={{ borderWidth: 1, borderColor: 'gray', height: 35, width: 250, borderRadius: 10, padding: 10 }}
          placeholder="Enter a todo" value={todo} onChangeText={setTodo} />
        <Button title="Add" onPress={addTodo} />
      </View>
      {/* Todo list */}
      <View>
        <FlatList data={todos} renderItem={renderItem} keyExtractor={item => item.id}/>
      </View>

    </View>
  )
}

export default App

const styles = StyleSheet.create({})
