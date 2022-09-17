import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState("");
  const [recipes, setRecipes] = useState([]);
  

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRecipes(responseJson.meals))
    
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }
  


  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={styles.texts}>{item.strMeal}</Text>
            <Image
              style={styles.image}
              source={{ uri: item.strMealThumb,}}
            />
          </View>}
        data={recipes} 
        /> 
      <TextInput style={{fontSize: 18, width: 200}} placeholder='keyword' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  image: {
    width: 65,
    height: 60,
  },
  texts: {
    fontSize:18,
    fontWeight: "bold"
  }

});
