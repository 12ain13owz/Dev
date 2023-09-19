/** */

import React from 'react'
import { Text, View } from 'react-native'

export default class HelloWorldApp extends React.Component {
  render() {
    return <View style={{ 
        flexDirection: 'column', 
        justifyContent: 'flex-end',
        /*justifyContent:'space-around',*/
        padding: '10px',
        height: '100%'
        
      }}>
      <Text>Mocha</Text>
      <Text>Latte</Text>
    </View>
  }
}

/** */
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class HelloWorldApp extends React.Component {
  render() {
    var item = []
    for (var i in this.state.all) item.push(<Text>{this.state.all[i]}</Text>)
    
    return <View>
      <TextInput style={{
        backgrondColor: 'lightgray',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 4,
        margin: 4
      }} /*ref={'textInput1'}*/ value={this.state.user} onChangeText={
        x => this.setState({user: x})
      }/>
      <Text>Hello : {this.state.user}</Text>
      <TouchableOpacity onPress={() => this.add() }>
        <Text>Say</Text>
      </TouchableOpacity>
      {this.state.all}
    </View>
  }
  constructor() {
    super()
    this.state = {
      user: '',
      all: []
    }
  }
  add() {
    this.state.all.push(<Text>{this.state.user}</Text>)
    this.state.user = ''
    this.setState({})
    
    /*
    this.refs['textInput1'].setNativeProps({text: ''});
    this.refs['textInput1'].focus()
    */
  }
}

/** */
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class HelloWorldApp extends React.Component {
  render() {
    return <View style={{
        padding: 4,
        margin: 4
      }}>
      <TextInput style={{
        backgrondColor: 'lightgray',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: '10px'
      }} value={this.state.price} onChangeText={
        x => this.setState({price: x})
      }/>
      
      <TouchableOpacity onPress={() => this.add() }>
        <Text>Total</Text>       
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {this.setState({ final:0}) }}>
        <Text>Clear</Text>       
      </TouchableOpacity>
      {this.state.final}
    </View>
  }
  constructor() {
    super()
    this.state = {
      price: 0,
      final: 0
    }
  }
  add() {
    if (+this.state.price >= 100) this.state.price *= 0.95
    
    this.state.final = this.state.price
    this.state.price = 0
    this.setState({})
    
    /*
    this.state.all = []
    this.state.all.push(<Text style={{ marginTop: '5px'}}>{this.state.price}</Text>)
    */
  }
}

/** */
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class HelloWorldApp extends React.Component {
  render() {
    var item = []
    for (var i in this.state.all) item.push(<Text>{this.state.all[i]}</Text>)
    
    return <View>
      <TouchableOpacity onPress={() => this.load()}>
        <Text>Refresh</Text>
      </TouchableOpacity>
      {item}
    </View>
  }
  constructor() {
    super()
    this.state = {all:[]}
    
  }
  load() {
    fetch('https://codestar.work/coffee').then( r => r.json() )
    .then(data => this.setState({all: data}))
  }
}

/** */
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class HelloWorldApp extends React.Component {
  render() {
   
    return <View style={{ padding: 10}}>
      <View style={{
           flexDirection: 'row', 
        }}>
        
        <TextInput style={{
            backgrondColor: 'lightgray',
            borderColor: '#ccc',
            borderWidth: 1,            
            width: 1,
            marginRight: 4
          }}
          value={this.state.item} onChangeText={
          x => this.setState({item: x})
        }/>
        <TouchableOpacity onPress={() => this.add()}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{
          marginTop: 10
        }}>
        {this.state.all.map((v) => <Text>{v}</Text>)}
      </View>
    </View>
  }
  constructor() {
    super()
    this.state = {
      item: '',
      all: []
    }
  }
  add() {
    var found = false
    
    for (var i of this.state.all) {
      if (i == this.state.item) found = true
    }
    
    if (found == false) 
      this.state.all.push(this.state.item)
      
    this.state.item = ''
    this.setState({})
  }
}

/** */
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class HelloWorldApp extends React.Component {
  render() {
    return <View style={{ padding: 10}}>
      <View style={{
           flexDirection: 'row', 
        }}>
        
        <TextInput style={{
            backgrondColor: 'lightgray',
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 4,
            width: 1,
            marginRight: 4
          }}
          value={this.state.number} onChangeText={
          x => this.setState({number: x})
        }/>
        <TouchableOpacity style={{
            padding: 4
          }} onPress={ () => this.show()}>
          <Text>OK</Text>
        </TouchableOpacity> 
      </View>
      
      <View style={{
          marginTop: 10
        }}>
        
        {this.state.result.map((v, i) => <Text>{v}</Text>)}
      </View>
    </View>
  }
  constructor() {
    super()
    this.state = {
      result:[],
      number:0
    }
  }
  
  show() {
    this.state.result = []
    var n = Math.floor( +this.state.number )
    
    for(var i = 1; i <= n; i++) {
      if (n % i == 0) this.state.result.push(i)
    }
    this.state.number = ''
    this.setState({})
  }
}
