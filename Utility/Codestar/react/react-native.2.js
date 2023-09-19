import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.board = ['A', 'A', 'A', '', 'B', 'B', 'B']
  }
  
  render() {
    var item = []
    for(var i in this.board) 
      item.push(<TouchableOpacity 
                  style={frog} 
                  onPress={this.jump.bind(this, i)}>
          <Text>{this.board[i]}</Text>
        </TouchableOpacity>)
      
    return <View style={{
        flexDirection: 'row'
      }}>
    
      {item}
    </View>
  }
  jump(index) {
    var space = -1
    
    for(var i in this.board) {
      if (this.board[i] == '') {
        space = i        
      }
    }
    
    if (-2 <= (space - index) && (space - index) <= 2) {
      this.board[space] = this.board[index]
      this.board[index] = ''
      this.setState({})
    }
  }
}

var frog = {
  width: 20, height: 20, backgroundColor:'pink', margin: 2, paddingTop: 4,
  borderRadius: '50%', textAlign: 'center'
}

/** */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.board = [
      ['1', '2', '3', '4'],
      ['5', '6', '9', '8'],
      ['11', '10', '7', ''],
      ['13', '15', '14', '12'],
    ]
  }
  
  render() {
    var all = []
    for(var i in this.board) {
      var item = []
      for(var v in this.board[i]) {
        item.push(<TouchableOpacity
                    style={block}
                    onPress={this.move.bind(this, i, v)}>
            <Text>{this.board[i][v]}</Text>
          </TouchableOpacity>)
      }
      all.push(<View style={{flexDirection: 'row'}}>{item}</View>)
    }
      
    return <View>
      {all}
    </View>
  }
  
  move(r, c) {
    var value = this.board[r][c]
    var space = [-1, -1]
    var ok = false
    
    for(var i in this.board) {
      for(var v in this.board[i]) {
        if(this.board[i][v] == '') {
          space = [i, v]
        }
      }
    }
    
    if(+r == space[0] && (+c-1 == space[1] || +c+1 == space[1])) ok = true
    if(+c == space[1] && (+r-1 == space[0] || +r+1 == space[0])) ok = true
      
     if (ok) {
      this.board[space[0]][space[1]] = value
      this.board[r][c] = ''
      this.setState({})
    }
  }
}

var block = {
  width: 30, height: 30, backgroundColor:'light', paddingTop: 8,
  borderWidth: '0.5', borderColor: 'black', textAlign: 'center'
}