import React, {Component} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Spinner,
} from 'native-base';
import styles from './styles';
import {loginUser, signupUser} from '../../data/LoginApi';
import {saveUser, getUser} from '../../data/UserRepository';

export default class LoginScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      email: 'edgar@mail.com',
      password: '12345678',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.verifyUserSession();
  }

  verifyUserSession = async () => {
    const userData = await getUser();
    if(userData) await this.props.navigation.navigate ('Home'); 
  }

  saveUserAndRedirect = async ({ accessKey, secretKey, token }) => {
    await saveUser (accessKey, secretKey, token);
    await this.props.navigation.navigate ('Home');
  };

  handleLogin = () => {
    const {email, password} = this.state;

    this.setState ({isLoading: true}, () => {
      loginUser (email, password)
        .then (data => {
          this.saveUserAndRedirect(data);
        })
        .catch (() => {
          signupUser (email, password)
            .then (data => {
              this.saveUserAndRedirect(data);
            })
            .catch (() => {
              this.setState ({isLoading: false});
            });
        });
    });
  };

  handlePasswordText = text => this.setState ({password: text});

  handleEmailText = text => this.setState ({email: text});

  render () {
    return (
      <Container>
        <Content scrollEnabled={false} contentContainerStyle={styles.container}>
          <Form>
            <Item style={styles.input} rounded>
              <Input
                placeholder="Email"
                onChangeText={this.handleEmailText}
                value={this.state.email}
              />
            </Item>
            <Item style={styles.input} rounded>
              <Input
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={this.handlePasswordText}
                value={this.state.password}
              />
            </Item>
            {(this.state.isLoading && <Spinner style={styles.spinner} color={styles.spinner.color} />) ||
              <Button
                rounded
                block
                style={styles.button}
                onPress={this.handleLogin}
              >
                <Text style={styles.buttonText}>Ingresar</Text>
              </Button>}
          </Form>
        </Content>
      </Container>
    );
  }
}