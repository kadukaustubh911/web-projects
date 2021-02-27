import React from "react";
import {StyleSheet, Image, FlatList, TouchableOpacity} from "react-native";
import NumberFormat from 'react-number-format';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import ContainerTop from "./shared/ContainerTop";
import CardSilder from 'react-native-cards-slider';
import { connect } from "react-redux";
import * as firebase from "firebase";
require('firebase/auth')
// import { ListingsRef } from '../../App';
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
 

class HomeScreen extends React.PureComponent {
   
   state = {
      Listings: []
   };

   componentDidMount() {

      this._subscribe = this.props.navigation.addListener('didFocus', () => {

         let Listings = [];
         firebase.firestore().collection("listings").onSnapshot(querySnapShot => {
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
                     <Text style={styles.textHeader}>My Bookings</Text>
                  </Row>
                  <Row style={{marginTop:20}}>
                     <FlatList
                        data = {this.state.listings}
                        renderItem = {({item, index}) =>
                           <TouchableOpacity>
                              <Card style={{borderRadius:20, width: 335, height: 300}}>
                                 <Grid>
                                    <Row style={{justifyContent:"center"}}>
                                       <Text>PLACE IMAGE HERE</Text>
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
   container: {
      flex: 1,
      marginVertical: 20,
    },
   textCard: {
      marginTop: 20,
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
      fontSize: 25,
      textAlign: "center"

   }
});


export default (HomeScreen);
