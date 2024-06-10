
const AddressComponent= () => {
    return (
        <View style={styles.addressListContainer}>
            <HStack>
                <View>
                    <Text>icon</Text>
                </View>

                <View style={styles.infoAddress}>
                    <VStack>
                        <Text>2972 Westheimer Rd. Santa Ana, Illinois 85486</Text>
                        <Text>Phnom Penh, Cambodia</Text>
                    </VStack>
                </View>
            </HStack>
        </View>
    );
};

const styles = StyleSheet.create({
    addressContainer: {
        width: 398,
        display: 'flex',
        alignItems: 'center',
        margin: 16,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 24,
        boxShadow: '0px 2px 20px 0 rgba(0, 0, 0, 0.10)',
    },
    infoAddress: {
        display: 'flex',
        flexDirection: 'column',

        margin: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexShrink: 0,
        position: 'relative',
    },

});
