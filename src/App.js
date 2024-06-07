import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'login',
      username: '',
      news: []
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetch('/index', {}, {mode: 'no-cors', url:`http://localhost:5000`, credentials: 'include'})
      .then(response => { 
        console.log('response:');
        console.log(response); 
        return response.json(); 
      })
      .then(state => this.setState(state))
      .catch(error => console.log(error));
  }

  componentDidUpdate() {
    console.log('update');
    console.log(this.state);
  }

  render() {
    return (
      <div style={{margin: 0, padding: 0, height: "100%"}}>
        <Header state={this.state} setState={this.setState}/>
        <Main state={this.state} setState={this.setState}/>
        <Footer/>
      </div>
    );
  }
}


export default App;
