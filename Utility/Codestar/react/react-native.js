// https://facebook.github.io/react-native/docs/tutorial.html

import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class App extends Component {
  render() {
    var data = ['Latte', 'Mocha', 'Americano']
    var item = []
    
    for (var i in data) {
      item.push(<Text key={i}>{ data[i] }</Text>)
    }
    return <View>
      <Text>Hello world!</Text> { item }
      { data.map( (v,i) => <Text key={i}>{v}</Text>) }
      { this.message }
    </View>
  }
  constructor() {
    super()
    this.message = '...'
    setTimeout(() => {
      this.message = 'I Love you'
      this.setState({})
    }, 5000)
  }
}

/** */
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class HelloWorldApp extends Component {
  render() {
    return <View>
      <Text>{this.value}</Text>
    </View>
  }
  constructor() {
    super()
    this.sec = 1
    this.value = '^'
    
    setInterval(() => {
      if (this.sec == 1) this.value = '^'
      else if (this.sec == 2) this.value = '>'
      else if (this.sec == 3) this.value = 'V'
      else {
        this.sec = 0
        this.value = '<'
      }
      this.sec++
      this.setState({})
    }, 1000)
  }
}
/* */
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class HelloWorldApp extends Component {
  render() {
    return <View>
      <Text>{this.value}</Text>
    </View>
  }
  constructor() {
    super()
    this.sec = 1
    this.value = '^'
    
    setInterval(() => {
      /*
      if (this.sec == 1) this.value = '^'
      else if (this.sec == 2) this.value = '>'
      else if (this.sec == 3) this.value = 'v'
      else {
        this.sec = 0
        this.value = '<'
      }
      */
      
      switch (this.value) {
        case '^': this.value = '>'; break;
        case '>': this.value = 'V'; break;
        case 'V': this.value = '<'; break;
        case '<': this.value = '^'; break;
      }
      
      this.sec++
      this.setState({})
    }, 1000)
  }
}

/** */

import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default class HelloWorldApp extends Component {
  render() {
    return <View>
      <TouchableOpacity onPress={() => this.change(1)}>
        <Text>Increase</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={this.change.bind(this, -1)}>
        <Text>Decrease</Text>
      </TouchableOpacity>
      
      <Text>{this.count}</Text>
    </View>
  }
  constructor() {
    super()
    this.count = 25
  }
  
  change(x) {
    this.count += x
    this.setState({})
  }
}

/** */

import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default class HelloWorldApp extends Component {
  render() {
    return <View>
      <TouchableOpacity onPress={() => this.Add('Latte')}>
        <Text>Latte</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={this.Add.bind(this, 'Mocha')}>
        <Text>Mocha</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => this.setState({ value: [] })}>
        <Text>Clear</Text>
      </TouchableOpacity>
      
      <Text>List :</Text>
      {this.state.value}
    </View>
  }
  constructor() {
    super()
    this.state = {}
    this.state.value = []
  }
  
  Add(x) {
    this.state.value.push(<Text>{x}</Text>)
    this.setState({ value: this.state.value })
  }
}

/** */
import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default class HelloWorldApp extends Component {
  render() {
    var s = { color: 'white', fontSize: 16, textAlign: 'center' }
    return <View style={main}>
      <Text style={{color: 'green'}}>Welcome</Text>
      <Text style={s}>Test</Text>
      <Text style={this.t}>Test</Text>
    </View>
  }
  constructor() {
    super()
    this.t = {color:'blue'}
  }
}
var main = { padding: '10px', backgroundColor: 'lightpink', height: '100%' }