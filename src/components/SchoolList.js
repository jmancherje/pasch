import React, { PropTypes } from 'react';
import { ScrollView, TouchableHighlight, View, StyleSheet } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';

import schoolData from '../constants/schoolData';
import getSortedList from '../utils/getSortedList';

class Divider extends React.Component {
  render() {
    return (
      <ListItem
        title={ this.props.title }
        hideChevron
        component={ View }
        containerStyle={{ backgroundColor: '#e0e3e6'}}
      />
    );
  }
}

export default class SchoolList extends React.Component {
  static propTypes = {
    setSelection: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
  };
  static navigationOptions = {
    title: 'PA Schools',
    header: ({ navigate }) => ({
      right: (
        <Icon
          size={ 33 }
          name="gear"
          type="evilicon"
          color="#517fa4"
          containerStyle={{ marginRight: 20 }}
          onPress={() => navigate('Filter')}
        />
      )
    })
  };

  constructor(props) {
    super(props);

    const { filter: sortBy = 'state' } = this.props;

    this.state = {
      schoolList: getSortedList(sortBy, schoolData),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.setState({
        schoolList: getSortedList(nextProps.filter, schoolData)
      });
    }
  }

  // TODO: make each list item it's own component
  // To prevent binding in render
  viewSchoolInfo = (selection) => {
    this.props.setSelection(selection);
    this.props.navigation.navigate('SchoolInfo');
  };

  // TODO: same as above
  toggleSchoolFavorite = (selection) => {
    this.props.favoriteSchool(selection);
  };

  render() {
    // Safety First:
    if (!Array.isArray(this.state.schoolList) || !this.state.schoolList.length) {
      return 'Empty List?';
    }
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={{ marginTop: 0 }}>
          {this.state.schoolList.map((school, index, list) => {
            if (school.isLabel) {
              return <Divider title={school.title} key={school.title}/>;
            }
            // TODO: implement this
            // const star = favorites.includes(school.name) ? 'ios-star-outline' : 'ios-star-full';
            return (
              <SwipeRow
                key={`${school.name}_${school.state}_${index}`}
                leftOpenValue={75}
                rightOpenValue={-75}
                disableRightSwipe
              >
                <ListItem
                  component={ TouchableHighlight }
                  title="hidden"
                  subtitle="also hidden"
                  onPress={ () => console.log('clicked back item') }
                  rightIcon={{ name: 'ios-star', type: 'ionicon' }}
                />
                <ListItem
                  containerStyle={styles.standaloneRowBack}
                  component={ TouchableHighlight }
                  title={school.name}
                  onPress={ this.viewSchoolInfo.bind(this, {
                    name: school.name,
                    state: school.state,
                  }) }
                  subtitle={school.state}
                  // leftIcon={{ name: 'flight-takeoff' }}
                  rightTitle="View"
                  avatar={{ uri: 'https://upload.wikimedia.org/wikipedia/en/6/61/Touro_University_California_seal.png' }}
                />
              </SwipeRow>
            );
          })}
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
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  hiddenItem: {
    padding: 30
  }
});
