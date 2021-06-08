import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component{

    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermission=async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)

        this.setState({
            hasCameraPermissions: status === 'granted',
        })
    }

    handleBarcodeScanner = async ({type,data}) =>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned  =this.state.scanned;
        const buttonState = this.state.buttonState;
    
    if(buttonState === 'clicked' && hasCameraPermissions){
        <BarCodeScanner
        onBarcodeScanned={scanned?undefined:this.handleBarcodeScanner}
        style = {styles.absoluteFillObject}/>
    }
    else if(buttonState === 'normal'){
        return(
            <View style = {styles.container}>
                <View>
                <Image source = {require("./assets/scannerimg.jpg")}
                style={{width="500" ,height="600"}}/>
               
                <Text style = {styles.displayText}>
                    {hasCameraPermissions === true? this.scannedData: "Request Camera Permission"}
                </Text>
                </View>
                <TouchableOpacity onPress = {this.getCameraPermission}
                style = {styles.scanButton}
                title = "Bar Code Scanner">
                    <Text style = {styles.buttonText}>SCAN THE QR CODE</Text>
                    
                </TouchableOpacity>
            </View>
        )
    }
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',      
    },
    displayText:{
        fontSize:15,
        textDecorationLine: 'underline',
    },
    scanButton:{
        backgroundColor:'orange',
        padding:10,
        margin:10,
    }
})