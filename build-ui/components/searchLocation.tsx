
const SearchComponent = () => {
    return (
        <View style={styles.searchContainer}>
            <HStack>
                <View style={styles.inputSearch}>
                    <View>
                        <Image />
                        <Text >2972 Westheimer Rd. Santa Ana</Text>
                    </View>
                </View>
                <Image />
            </HStack>

        </View>
    );
};


const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#ffffff', 
        borderRadius: 24, 
        padding: 16, 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 3, 
    },
    inputSearch: {
        backgroundColor: '#f8fafc', 
        borderRadius: 56, 
        paddingVertical: 10,
        paddingHorizontal: 16, 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexShrink: 0,
        width: 326,
        height: 46,
        position: 'relative',
        marginRight: 16,
    },
});

