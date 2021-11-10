import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

const App = (props) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState();

  // Add todo with new item from input
  const addTodo = () => {
    console.log("addtodostart")
    //New todo to add
    const newTodo = { title: todo, completed: false, created: Date.now() }
    setTodos([newTodo, ...todos])
    console.log(todos)
  }

  // Delete a todo 
  const deleteTodo = (index) => {
    let copyTodos = todos
    copyTodos.splice(index,1)
    setTodos([...copyTodos])
  }

  //Toggle a todo to revert completed
  const toggleTodo = (index) => {
    let copyTodos = todos
    let todo = copyTodos[index]
    todo.completed = !todo.completed
    copyTodos[index] = todo
    setTodos([...copyTodos])
  }
  

  // Render item for FlatList
  const renderItem = ({ item, index }) => (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
      <TouchableOpacity onPress={()=>{toggleTodo(index)}}>
        <Text style={{textDecorationLine:'line-through'}}> {item.title} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { deleteTodo(index) }}>
        <Ionicons name="trash-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View>
      {/* Title */}
      <Text> Todo </Text>
      <TextInput placeholder='Enter your plan here' onChangeText={setTodo} />
      <Button title='+' onPress={addTodo} />
      <FlatList data={todos} renderItem={renderItem} />

    </View>
  )
}

export default App

const styles = StyleSheet.create({})

