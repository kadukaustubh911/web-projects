import React from "react";
import {StyleSheet, Image, TouchableOpacity} from "react-native";
import NumberFormat from 'react-number-format';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import ContainerTop from "./shared/ContainerTop";
import CardSilder from 'react-native-cards-slider';
import { connect } from "react-redux";
import {
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
class SavedPlaces extends React.Component {
   render() {
      return (
         <StyleProvider style={getTheme(platform)}>
            <ContainerTop>
               <Grid>
                  <Text style={styles.textHeader}>Saved Places</Text>
               </Grid>
            </ContainerTop>
         </StyleProvider>
      );
   }
}

const styles = StyleSheet.create({
   textCard: {
      fontFamily: "Montserrat-Medium",
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
      fontFamily: "Montserrat-Bold"
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

   }
});


export default (SavedPlaces);
