// @flow
import React from 'react';
import {
  View,
  Slider,
} from 'react-native';
import {
  Button,
  Text,
  Body,
  CheckBox,
  ListItem,
  Row,
  Grid,
  Col,
} from 'native-base';
import MultiSlider from 'react-native-multi-slider';

const initialMinGpa = 2.5;
const initialMaxGpa = 4.0;

type Props = {
  filter: Object,
  filterSet?: boolean,
  addFilter: Function,
  property: 'minGpa'|'averageGpa',
};

export default class GpaFilter extends React.Component {
  props: Props;
  state: {
    checked: boolean,
    isEditing: boolean,
    upperBound: number,
    lowerBound: number,
  };
  constructor(props: Props) {
    super(props);

    console.log('constructor props', this.props);
    const isActiveFilter = Boolean(this.props.filter.property);
    // Initialize these values IF the user already has
    // A filter set for minimum GPA
    this.state = {
      checked: isActiveFilter,
      isEditing: false,
      upperBound: this.props.filter.max || initialMaxGpa,
      lowerBound: this.props.filter.min || initialMinGpa,
    };
  }

  toggleSelection = () => {
    this.setState({ checked: !this.state.checked });
  };

  setMin = (value: number) => {
    this.setState({ lowerBound: value });
  };

  setMax = (value: number) => {
    this.setState({ upperBound: value });
  };

  addFilter = () => {
    const { lowerBound, upperBound } = this.state;
    let type;
    const min = lowerBound;
    const max = upperBound;
    if (
      (lowerBound === initialMinGpa && upperBound === initialMaxGpa) ||
      (lowerBound !== initialMinGpa && upperBound !== initialMaxGpa)
    ) {
      type = 'between';
    } else if (lowerBound === initialMinGpa) {
      type = 'below';
    } else {
      type = 'above';
    }
    this.props.addFilter({
      type,
      min: +min.toFixed(2),
      max: +max.toFixed(2),
      property: this.props.property,
      isActive: true,
    });
  };

  render() {
    // If a filter exists
    const showEditingTools = (this.state.isEditing && this.props.filter.isActive) ||
      (this.state.checked && !this.props.filter.isActive);
    let filterDescription = `Between ${this.state.lowerBound && this.state.lowerBound.toFixed(2)} and ${this.state.upperBound && this.state.upperBound.toFixed(2)}`;

    if (this.state.lowerBound === initialMinGpa && this.state.upperBound === initialMaxGpa) {
      filterDescription = 'Slide the min or max value to define a filter';
    } else if (this.state.lowerBound === initialMinGpa) {
      filterDescription = `Below ${this.state.upperBound.toFixed(2)}`;
    } else if (this.state.upperBound === initialMaxGpa) {
      filterDescription = `Above ≥ ${this.state.lowerBound.toFixed(2)}`;
    }
    return (
      <View>
        <ListItem onPress={ this.toggleSelection } >
          <CheckBox checked={ this.state.checked } onPress={ this.toggleSelection }  />
          <Body>
            <Text>Minimum Gpa</Text>
          </Body>
        </ListItem>
        { showEditingTools ?
          (<ListItem>
            <Body>
              <Grid>
                <Row>
                  <Text>
                    { filterDescription }
                  </Text>
                </Row>
                <MultiSlider
                  trackStyle={styles.track}
                  min={ 2.5 }
                  max={ 4.0 }
                  step={ 0.05 }
                  values={ [2.5, 4.0] }
                  onValuesChangeStart={(values) => console.log('start',values)}
                  onValuesChange={(values) => { this.setState({ lowerBound: values[0], upperBound: values[1] })}}
                  onValuesChangeStop={(values) => console.log('end', values)}
                  touchDimensions={{ height: 50, width: 50, borderRadius: 25, slipDisplacement: 50 }}
                />
                <Button block small onPress={ this.addFilter } style={{ marginTop: 10 }}>
                  <Text>Add Filter</Text>
                </Button>
              </Grid>
            </Body>
          </ListItem>)
        : null }
      </View>
    );
  }
}

const styles = {
  track: {
    height: 2.0
  }
};
