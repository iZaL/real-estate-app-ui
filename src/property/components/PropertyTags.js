import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PropertyTags = ({items}) => {
  return (
    <View style={styles.container}>
      {items.map((item, i) => <Text key={i} style={styles.tag}> #{item} </Text>)}
    </View>
  );
};

PropertyTags.propTypes = {
  items: React.PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 2,
  },
  tag: {
    color: 'gray',
    fontSize: 11,
  },
});

export default PropertyTags;
