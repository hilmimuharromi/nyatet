import React, { useRef, useEffect, useState } from "react"
import {
    ScrollView, StyleSheet,
    KeyboardAvoidingView, Modal, TouchableOpacity, Text, View, Platform, ActivityIndicator
} from "react-native"
import {
    actions,
    RichEditor,
    RichToolbar,
} from "react-native-pell-rich-editor";
import Icon from 'react-native-vector-icons/FontAwesome5';
import getWidth from "~/utils/getWidth"
import { connect } from 'react-redux';
import cameraPermission from "~/utils/cameraPermission"
import storagePermission from "~/utils/storagePermission"
import { launchImageLibrary } from 'react-native-image-picker';
import CameraSnap from "../cameraSnap"
import axios from "axios"
import {
    SetEditorContent,
} from "~/stores/action"

const LoadingView = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E9897E" }}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={{ color: "#fff", fontSize: 18 }}>Mohon tunggu ....</Text>
        </View>
    )
}

const Editor = ({
    content,
    SetEditorContent,
    saveData
}) => {
    const RichText = useRef();
    //reference to the RichEditor component
    const [viewImage, setViewImage] = useState(false)
    const [viewCamera, setViewCamera] = useState(false)
    const [loading, setLoading] = useState(false)
    function handleHeightChange(height) {
        // console.log("editor height change:", height);
    }

    useEffect(() => {
        cameraPermission()
        storagePermission()
        if (!content) {
            console.log("masuk tidak ada content editor", content)
            RichText.current?.setContentHTML(
                ""
            );
        }
        if (content) {
            console.log("masuk ada content editor", content)

            RichText.current?.setContentHTML(
                content
            );
        }
    }, [])


    function onPressAddImage() {
        setViewImage(true)
        setViewCamera(false)
    }

    const imageLibrary = () => {
        const options = {
            title: 'Load Photo',
            compressImageQuality: 0.5,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: getWidth(100),
            maxHeight: 500
        }
        launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchCamera Error: ', response.error);
            }
            else {
                uploadPict(response)
            }
        });
    }

    const uploadPict = async (photo) => {
        setLoading(true)
        setViewCamera(false)
        const uploadData = new FormData();
        uploadData.append('image', { uri: photo.uri, name: 'tes.jpg', type: 'image/jpg' })
        try {
            const { data, status } = await axios({
                method: "post",
                url: "https://api.imgbb.com/1/upload?key=767c1b05763de4a87cc7fd24cab766bb",
                data: uploadData
            })
            if (status) {
                RichText.current?.insertHTML(`
                    <img src=${data.data.image.url} >
                    `);
                console.log(photo)
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false)
            setViewImage(false)
            setViewCamera(false)
        }
    }

    function deleteFormat() {
        // RichText.current?.setContentHTML(
        //     content + `<br/><br/><div></div>`,
        // );
        RichText.current?.setContentHTML(
            ""
        );
    }





    return (
        <>
            <Modal
                visible={viewImage}
                onRequestClose={() => setViewImage(false)}
                animationType="slide"
                transparent={true}
            >
                {/* {loading ? <LoadingView />} */}
                {loading ? <LoadingView /> : viewCamera ?
                    <CameraSnap
                        pilihData={(data) => {
                            uploadPict(data)
                        }}
                    />
                    :
                    <View
                        style={styles.containerModal}
                    >
                        <TouchableOpacity style={styles.buttonModal} onPress={() => {
                            setViewCamera(true)
                        }
                        } >
                            <Icon name="camera" size={20} color={'#000'} />
                            <Text style={styles.textButton}>Ambil Gambar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonModal} onPress={imageLibrary}>
                            <Icon name="images" size={20} color={'#000'} />
                            <Text style={styles.textButton}>Dari Gallery</Text>
                        </TouchableOpacity>
                    </View>
                }
            </Modal>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, paddingBottom: 30 }}>
                <ScrollView>
                    <RichEditor
                        disabled={false}
                        containerStyle={styles.editor}
                        ref={RichText}
                        style={styles.rich}
                        placeholder={"Tulis Catatan ....."}
                        onChange={(text) => {
                            SetEditorContent(text)
                        }}
                        // editorInitializedCallback={editorInitializedCallback}
                        onHeightChange={handleHeightChange}
                    />
                </ScrollView>
                <RichToolbar
                    style={[styles.richBar]}
                    editor={RichText}
                    disabled={false}
                    iconTint={"black"}
                    selectedIconTint={"#E9897E"}
                    disabledIconTint={"purple"}
                    onPressAddImage={onPressAddImage}
                    iconSize={30}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.checkboxList,
                        actions.insertImage,
                        actions.setStrikethrough,
                        actions.heading1,
                        actions.blockquote,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.code,
                        actions.line,
                        actions.undo,
                        'deleteFormat'
                    ]}
                    iconMap={{
                        "deleteFormat": ({ tintColor }) => (
                            <Icon name="eraser" size={30} color={tintColor} />
                        ),
                    }}
                    deleteFormat={deleteFormat}
                />
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    editor: {
        backgroundColor: "black",
    },
    rich: {
        minHeight: 300,
        flex: 4,
        paddingHorizontal: 20,
        fontSize: 18
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    containerModal: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E9897E" },
    buttonModal: {
        width: 200,
        height: 70,
        backgroundColor: "#fff",
        marginVertical: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    textButton: {
        marginHorizontal: 10,
        fontSize: 18
    }
})


const mapStateToProps = state => {
    const { editor } = state;
    const { content } = editor
    console.log("dari editor", content)
    return {
        content
    };
}
const mapDispatchToProps = {
    SetEditorContent,

}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
