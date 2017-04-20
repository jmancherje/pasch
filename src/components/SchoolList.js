// @flow
import React from 'react';
import { ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';

import Divider from './Divider';

const nonFavoriteIcon = {
  name: 'heart-o',
  type: 'font-awesome',
  color: 'pink',
  style: {
    paddingRight: 15,
    fontSize: 35,
  },
};

export default class SchoolList extends React.Component {
  props: {
    setSelection: Function,
    schools: Array<Object>,
    navigation: Object,
  };
  static navigationOptions = ({ navigation }) => ({
    title: 'PA Schools',
    headerRight: (
      <Icon
        size={ 33 }
        name="gear"
        type="evilicon"
        color="#517fa4"
        containerStyle={{ marginRight: 20 }}
        onPress={() => navigation.navigate('Filter')}
      />
    )
  });

  // TODO: make each list item it's own component
  // To prevent binding in render
  viewSchoolInfo = (selection: Object) => {
    this.props.setSelection(selection);
    this.props.navigation.navigate('SchoolInfo', { title: selection.name });
  };

  // TODO: same as above
  // toggleSchoolFavorite = (selection) => {
  //   this.props.favoriteSchool(selection);
  // };

  render() {
    // Safety First:
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={{ marginTop: 0 }}>
          { (!Array.isArray(this.props.schools) || !this.props.schools.length) ? <Divider title="No Schools, try adjusting filters" /> : (
            this.props.schools.map((school, index, list) => {
              if (school.isLabel) {
                return <Divider title={school.title} key={school.title}/>;
              }
              return (
                <SwipeRow
                  key={`${school.name}_${school.state}_${index}`}
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  disableRightSwipe
                >
                  <ListItem
                    containerStyle={styles.standaloneRowBack}
                    component={ TouchableHighlight }
                    title={school.name}
                    subtitle={school.state}
                    onPress={ () => console.log('clicked back item') }
                    rightIcon={ nonFavoriteIcon }
                  />
                  <ListItem
                    containerStyle={styles.foregroundRow}
                    component={ TouchableHighlight }
                    onPress={ this.viewSchoolInfo.bind(this, {
                      name: school.name,
                      state: school.state,
                    }) }
                    title={school.name}
                    subtitle={school.state}
                    titleContainerStyle={styles.title}
                    rightIcon={{ name: 'star', type: 'evilicon', color: '#517fa4', size: 33 }}
                    avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/en/6/61/Touro_University_California_seal.png' }}
                  />
                </SwipeRow>
              );
            })
          ) }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  standaloneRowBack: {
    backgroundColor: '#dee8f7',
  },
  foregroundRow: {
    backgroundColor: '#fff',
  },
  title: {
    width: 200
  },
  hiddenItem: {
    padding: 30
  }
});
