import React, { useRef, useState } from "react"
import {
    StyleSheet, TouchableOpacity, Text, View, Image, Platform
} from "react-native"
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import getWidth from "~/utils/getWidth"
import getHeightImage from '~/utils/getHeightImage';

const CameraSnap = ({ pilihData }) => {
    const cameraRef = useRef()
    const [preview, setPreview] = useState(false)
    const [data, setData] = useState("")
    const [flipCamera, setFlipCamera] = useState(false)
    const [flashCamera, setFlashCamera] = useState(false)

    const takePicture = async (camera) => {
        const options = { quality: 0.5, width: getWidth(100) };
        const data = await camera.takePictureAsync(options)
        if (data) {
            console.log("take picture", data)
            setData(data)
            setPreview(true)
        }
    }



    const PendingView = () => (
        <View
            style={{
                flex: 1,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Waiting</Text>
        </View>
    );

    return (
        <>

            {preview ? <View style={styles.containerPreview}>
                <View style={styles.layoutImage}>
                    <Image
                        style={{ width: getWidth(90), height: getHeightImage(data.height, data.width), backgroundColor: "blue" }}
                        source={{ uri: data.uri }}
                    />
                </View>
                <View style={styles.buttonPreview}>
                    <TouchableOpacity style={styles.buttonPilih} onPress={() => {
                        pilihData(data)
                        setPreview(false)
                    }}>
                        <Text>
                            Pilih Gambar
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setPreview(false)} style={styles.buttonKembali}>
                        <Text>
                            Kembali
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
                :
                <View style={styles.containerCamera}>

                    <RNCamera
                        ref={cameraRef}
                        style={styles.preview}
                        useNativeZoom={true}
                        // captureTarget={RNCamera.constants.CaptureTarget.disk}
                        type={flipCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
                        flashMode={flashCamera ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                    >

                        {({ camera, status, recordAudioPermissionStatus }) => {
                            if (status !== 'READY') return <PendingView />;
                            return (
                                <View View style={styles.bottom} >
                                    <TouchableOpacity style={styles.buttonSide} onPress={() => setFlipCamera(!flipCamera)}>
                                        <IconMaterial name="flip-camera-ios" size={25} color={'#000'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.capture} onPress={() => takePicture(camera)}>
                                        <Icon name="camera" size={25} color={'#000'} />
                                        {/* <Text style={styles.textButton}>Ambil</Text> */}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonSide} onPress={() => setFlashCamera(!flashCamera)}>
                                        {flashCamera ?
                                            <IconMaterial name="flash-on" size={25} color={'#000'} />
                                            :
                                            <IconMaterial name="flash-off" size={25} color={'#000'} />
                                        }
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    </RNCamera>
                </View >

            }


        </>

    )
}

const styles = StyleSheet.create({
    containerCamera: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        margin: 20,
        height: 70,
        width: 70,
        elevation: 3

    },
    buttonSide: {
        flex: 0,
        backgroundColor: '#fff',
        flexDirection: "row",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        elevation: 3
    },
    textButton: {
        marginHorizontal: 10,
        fontSize: 18
    },
    top: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottom: {
        flex: 0,
        width: getWidth(90),
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#E9897E",
        borderRadius: 20,
        marginBottom: 10,
        elevation: 3
    },
    containerPreview: { flex: 1, backgroundColor: "#FFF", paddingTop: 20 },
    layoutImage: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonPreview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonPilih: {
        flex: 0,
        backgroundColor: '#E9897E',
        flexDirection: "row",
        borderRadius: 5,
        padding: 15,
        justifyContent: "center",
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        elevation: 3,
        width: 150
    },
    buttonKembali: {
        flex: 0,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        elevation: 3,
        width: 150
    }


})

export default CameraSnap