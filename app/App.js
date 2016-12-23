import React, { Component } from 'react';
import { DropDownMenu, Screen, View, Examples, TextInput, Icon, Card, Row, Text, Subtitle, Button, Spinner, NavigationBar, Title } from '@shoutem/ui';
import Meteor, { createContainer } from 'react-native-meteor';


Meteor.connect('wss://safe-dev.meteorapp.com/websocket');

class LoginForm extends Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.state = {
			loading: false,
			email: '',
			password: ''
		}
	}
	handleTextChange(event){
		console.log(event);
	}
	onSubmit(){
		this.setState({loading: true});
	}
	render(){
		return (
			<View style={{paddingTop: 65}}>
				<TextInput 
					placeholder={'Email'}
					onChangeText={this.handleTextChange} 
				/>
				<TextInput 
					placeholder={'Password'}
					onChangeText={this.handleTextChange}
					secureTextEntry
				/>
				<Button muted={this.state.loading} styleName="dark" onPress={this.onSubmit}>
					<Text>{!this.state.loading ? 'LOGIN' : <Spinner style={{height: 20, width: 20}}/>}</Text>
				</Button>
			</View>
		);
	}
}




class App extends Component {
  render() {

  	const { status, user, loggingIn } = this.props;

    return (
	    <Screen>
	    	<NavigationBar
	    		leftComponent={<Icon name="sidebar" />}
				centerComponent={<Title>LOGIN</Title>}

			/>
	      	<LoginForm />
	    </Screen>
    );
  }
}

export default createContainer(() => {
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, App);
