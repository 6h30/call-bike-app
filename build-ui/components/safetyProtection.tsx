

const SafetyComponent = () => {
    return (
        <View style={styles.safetyContainer} >
            <HStack>
                <View>
                    <Text>icon</Text>
                </View>

                <View style={styles.infoSafety}>
                    <Heading>Make your trip safety first</Heading>
                    <Text>Check how make our customer is more safety</Text>
                </View>

                <View>
                    <Text>icon</Text>
                </View>
            </HStack>
        </View >
    );
};

const styles = StyleSheet.create({
    safetyContainer: {
        width: 398,
        display: 'flex',
        alignItems: 'center',
        margin: 16,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 24,
        boxShadow: '0px 2px 20px 0 rgba(0, 0, 0, 0.10)',
    },
    infoSafety: {
        display: 'flex',
        flexDirection: 'column',
        
        margin: 0, 
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexShrink: 0,
        position: 'relative',
    },

});