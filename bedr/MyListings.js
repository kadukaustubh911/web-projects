import React from "react";
import {StyleSheet, Image, TouchableOpacity, FlatList} from "react-native";
import NumberFormat from 'react-number-format';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import ContainerTop from "./shared/ContainerTop";
import CardSilder from 'react-native-cards-slider';
import { connect } from "react-redux";
import * as firebase from "firebase";
require('firebase/auth')
import {
   Button,
   Row,
   Grid,
   Text,
   Card,
   CardItem,
   StyleProvider,
   Col,
   Icon,
   Left,
   Body,
   Right,
   Thumbnail,
   View,
   Item,
   Label,
   Input,
   Form, Picker,
} from "native-base";
import companyLogo from '../../assets/hotel-icon.png';

class MyListings extends React.PureComponent {
   state = {
      Listings: []
   };

   doHost= () =>{
      this.props.navigation.navigate("Host")
   };

   componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
   }

   componentDidMount() {

      var user = firebase.auth().currentUser;
      var email;
      
      if (user != null) {
         email = user.email;
      }

      this._subscribe = this.props.navigation.addListener('didFocus', () => {

         let Listings = [];
         firebase.firestore().collection("listings").where("email", "==", email).onSnapshot(querySnapShot => {
            querySnapShot.forEach(doc => {
               // console.log(doc.data());
               Listings.push(doc.data());
            });
            this.setState({ listings: Listings });
         });
      });
   }

   render() {
      return (
         <StyleProvider style={getTheme(platform)}>
            <ContainerTop>
               <Grid>
                  <Row>
                     <Col>
                        <Text style={styles.textHeader}>My Listings</Text>
                     </Col>
                     <Col style={{ margin: 4 }}>
                        <Button style={styles.buttonLogin} full rounded iconLeft light onPress={this.doHost}>
                           <Text style={styles.buttonTxt}>Host your Place</Text>
                        </Button>
                     </Col>
                  </Row>
                  <Row style={{marginTop:20}}>
                     <FlatList
                        data = {this.state.listings}
                        renderItem = {({item}) =>
                           <TouchableOpacity>
                              <Card style={{borderRadius:20, width: 335, height: 300}}>
                                 <Grid>
                                    <Row style={{marginBottom: 100, justifyContent:"center"}}>
                                       <Image style={{marginTop: 5, borderRadius:20, width: 320, height: 180,resizeMode: 'cover'}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bedr-89d74.appspot.com/o/images%2Fzzz?alt=media&token=e23b4b35-10c9-4e58-aea0-d602073ba7bc'}}/>
                                    </Row>
                                    <Row>
                                       <Col>
                                          <Text style={styles.textCard}>{item.title}</Text>
                                          <Text style={styles.textCardChild}>₹{item.price}/night</Text>
                                          <Text style={styles.textCardChild}>{item.location}</Text>
                                       </Col>
                                    </Row>
                                 </Grid>
                              </Card>
                           </TouchableOpacity>
                        }
                     />
                  </Row>
               </Grid>
            </ContainerTop>
         </StyleProvider>
      );
   }
}

const styles = StyleSheet.create({
   textCard: {
      marginLeft: 20,
      fontFamily: "Montserrat-Bold",
      color: "black"
   },
   textdetail: {
      fontFamily: "Montserrat-Medium",
      fontSize: 8
   },
   btnBook: {
     backgroundColor:'#5cb85c',
      padding:10,
      borderRadius:10
   },
   txtBtn : {
      fontFamily: "Montserrat-Medium",
      color: 'white'
   },
   textListRoom: {
      fontFamily: "Montserrat-Medium",
      color: 'white',
      fontSize:12
   },
   textCardChild: {
      marginLeft: 20,
      fontFamily: "Montserrat-Medium"
   },
   textSearch: {
      fontFamily: "Montserrat-Medium",
      color: "white"
   },
   textCardItem: {
      fontFamily: "Montserrat-Medium",
      color: "black",
      fontSize: 12
   },
   textHeader: {
      color: "white",
      fontFamily: 'Montserrat-Medium',
      fontSize: 20,
      textAlign: "center"

   },
   buttonLogin: {
      marginTop: -10,
      marginLeft: 30,
      width: 135
   },
   buttonTxt: {
      fontSize: 10,
      fontFamily: 'Montserrat-Medium'
   },
});


export default (MyListings);
