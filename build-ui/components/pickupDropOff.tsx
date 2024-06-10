
const PickComponent = () => {
    return (
        <View style={styles.pickContainer}>
            <HStack>
                <View style={styles.pickdrop}>
                    <View>
                        <VStack>
                            <Text>Pick-up</Text>
                            <Text>My current location</Text>
                        </VStack>
                    </View>
                </View>

                <View>line</View>

                <View style={styles.pickdrop}>
                    <View>
                        <VStack>
                            <Text>Drop off (optional)</Text>
                            <Text>3517 W. Gray St. Utica, Pennsylvania 57867</Text>
                        </VStack>

                    </View>
                </View>
            </HStack>

        </View>
    );
};


const styles = StyleSheet.create({
    pickContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        position: 'relative',
    },
    pickdrop: {
        display: 'flex',
        flexDirection: 'column',
        margin: 8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        flexShrink: 0,
        position: 'relative',
    },
});
