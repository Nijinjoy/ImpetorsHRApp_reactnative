import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';

const DrawComponent = () => {
    const ref = useRef(null);

    const handleSignature = signature => {
        console.log(signature);
    };

    const handleEmpty = () => {
        console.log('Empty');
    };

    const handleClear = () => {
        ref.current.clearSignature();
    };

    const handleEnd = () => {
        ref.current.readSignature();
    };

    return (
        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ borderWidth: 0, width: WIDTH * 0.9, height: HEIGHT * 0.24, borderRadius: WIDTH * 0.02, overflow: 'hidden' }}>
                <Signature
                    ref={ref}
                    onOK={handleSignature}
                    onEmpty={handleEmpty}
                    descriptionText="Sign"
                    clearText="Clear"
                    confirmText="Save"
                    backgroundColor={colors.grey}
                    penColor="black"
                    onEnd={handleEnd}
                    containerStyle={{ flex: 0, borderRadius: WIDTH * 0.02, }}
                />
            </View>
            {/* <Button title="Clear" onPress={handleClear} /> */}
        </View>
    );
};

export default DrawComponent;

