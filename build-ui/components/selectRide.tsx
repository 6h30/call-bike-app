
const SelectRideComponent = () => {
    return (
      <View style={styles.listRideContainer}>
        <View style={styles.frame91}>
          <View style={styles.frame88}>
            <View style={styles.frame95}>
              <View style={styles.iconTaxiOptionB}>
                <Image style={styles.group} source={require('./group0.svg')} />
              </View>
              <View style={styles.frame87}>
                <Text style={styles.normal}>Normal</Text>
                <View style={styles.frame94}>
                  <Text style={styles.price}>$1.99</Text>
                  <View style={styles.frame134}>
                    <Image style={styles.iconClock} source={require('./icon-clock-16-x-160.svg')} />
                    <Text style={styles.time}>2 min</Text>
                  </View>
                  <View style={styles.frame135}>
                    <Image style={styles.iconUserCircle} source={require('./icon-user-circle-16-x-160.svg')} />
                    <Text style={styles.seats}>4 Seats</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.group11}>
            <View style={styles.ellipse19}></View>
            <View style={styles.ellipse18}></View>
          </View>
        </View>

        <View style={styles.choiceRide}>
          <Text>Popular</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    listRideContainer: {
        background: var(--view-view-primary-lighter, #f1fcf6);
        border-radius: var(--spacing-spacing-16px, 16px);
        border-style: solid;
        border-color: var(--border-border-primary, #38c274);
        border-width: 1.5px;
        padding: var(--spacing-spacing-8px, 8px) var(--spacing-spacing-16px, 16px)
          var(--spacing-spacing-8px, 8px) var(--spacing-spacing-16px, 16px);
        display: flex;
        flex-direction: row;
        gap: var(--spacing-spacing-24px, 24px);
        align-items: flex-start;
        justify-content: flex-start;
        position: relative;
      },
    choiceRide: {
        background: var(--view-view-secondary-darker, #0e1824);
        border-radius: var(--spacing-spacing-4px, 4px);
        padding: 0px var(--spacing-spacing-4px, 4px) 0px
          var(--spacing-spacing-4px, 4px);
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 50px;
        height: 16px;
        position: absolute;
        left: 284px;
        top: -9px;
      },
});