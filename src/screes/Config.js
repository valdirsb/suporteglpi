import React, { useState, useEffect } from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import api from '../services/api';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'react-native-fetch-blob';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

const Config = () => {
    const [ avatar, setAvatar ] = useState();

    const imagePickerOpitions = {
        title: 'Escolha uma imagem',
        takePhotoButtonTitle: 'abrir Camera',
        chooseFromLibraryButtonTitle: 'Escolher imagem da Galeria'

    };

    useEffect(()=>{
        
    }, /*State*/ );

    selectImage = async () => {
        ImagePicker.showImagePicker({ title: 'Selecionar Foto',
        noData: true,
        mediaType: 'photo',
        takePhotoButtonTitle: 'Tirar foto',
        chooseFromLibraryButtonTitle: 'Escolher da Galeria' },
        (response) => {
    
    
        if (response.didCancel) {
            Alert.alert('Error','User cancelled image picker');
        } else if (response.error) {
            Alert.alert('Error','ImagePicker Error: ');
        } else if (response.customButton) {
            Alert.alert('Error','User tapped custom button: ');
        } else {
            this.uploadImage(response.uri);
        }
        });
    }

    uploadImage = async (image_uri) => {
        let base_url = 'http://grupofst.com.br/hb7ti/apirest.php/Ticket';
        var uploadData = new FormData();
        const token = await AsyncStorage.getItem('@token');
        
        fetch(base_url, {
          method: 'post',
          headers: {
                        'Session-Token': token,
                        'Content-Type': 'application/json'
                    },
          body: {
                    input:
                        {
                            "type": 1,
                            "name": "Ticket Teste 2",
                            "content": "content': 'Content do ticket Teste 2"
                        }
                },
          redirect: 'follow'
        })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch(error => console.log('error', error));
      }



    function imagePickerCallback(data) {
        if(data.didCancel){
            return;
        }

        if(data.error){
            return;
        }

        if(!data.uri){
            return;
        }

        setAvatar(data);
        console.log(avatar);

    }

    async function uploadImage2() {

        /*

        let mime = 'image/jpeg';
        const token = await AsyncStorage.getItem('@token');

        RNFetchBlob.fs.readFile(avatar.uri,'base64')
        .then((data)=>{
            return RNFetchBlob.polyfill.Blob.build(data, {type:mime+';BASE69'});
        })
        .then((blob)=>{

            fetch('POST', 'http://grupofst.com.br/hb7ti/apirest.php?Document',{
                    'Session-Token': token,
                    'Content-Type': 'multipart/form-data'
                }, [
                    { name: 'image', filename: 'avatar.jpg', data: blob},
                    { uploadManifest: '{"name": "Uploaded document", "_filename" : "file.jpg"}}'}
                ])
                .then((resp)=>{
                    console.log(resp);
                    blob.close();
                    alert("terminou");
                })
                .catch((error)=>{
                    alert(error);
                });
            });

            */


        const token = await AsyncStorage.getItem('@token');

        RNFetchBlob.fetch('POST', 'http://grupofst.com.br/hb7ti/apirest.php?Document',{
            'Session-Token': token,
            'Content-Type': 'multipart/form-data'
        }, [
            { name: 'image', filename: 'avatar.jpg', data: avatar.data},
            { uploadManifest: '{"name": "Uploaded document", "_filename" : "file.jpg"}}'}
        ]).then((resp)=>{
            console.log(resp);
        })

       


    /*  const file = {
            'data-url': avatar.uri,
            'filename[]': avatar.fileName,
            'name': 'filename[]'
        };

        const input = {
                uri: avatar.uri,
                filename: avatar.fileName,
                type: avatar.type
        }
        */

       /*
        const formdata = new FormData();
   
        formdata.append('file', avatar.data , avatar.uri);
        formdata.append('uploadManifest', {"input": {"name": "Uploaded document", "_filename" : "file.jpg"}});
   
        try {
            const response = await api.post('/Document/', {

                params: {
                    formdata
                },
                
            }, { headers: { 'Content-Type': 'multipart/form-data' } } );
            alert(response.data.message);
    
        } catch (err) {
                alert(err.code);
              }
      */  
    }


    return(
        <View  style={styles.container}>
            <Image 
                source={{
                    uri: avatar ? avatar.uri :
                    'https://www.ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png'
                }}
                style={styles.avatar}
            />
            <TouchableOpacity  style={styles.button} onPress={()=>ImagePicker.showImagePicker(imagePickerOpitions, imagePickerCallback)}>
                <Text style={styles.buttonText}>Escolher foto</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.button} onPress={uploadImage2}>
                <Text style={styles.buttonText}>Enviar Foto</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default Config;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fafafa"
    },
    button: {
        width: 150,
        height: 50,
        marginTop: 20,
        borderRadius: 3,
        backgroundColor: "#BBBBBB",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#FFF"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
})