/**
 * Created by wufei on 2017/11/23.
 */

import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native'
import HomeGridItem from './HomeGridItem'
import {MoreMenu} from '../../Common/MoreMenu';

class HomeGridView extends PureComponent {

    static defaultProps = {
        infos: []
    };

    onGridSelected(target) {
        if (target === 1) {
            this.props.navigation.navigate(MoreMenu.HomePage.Evaluate.menu_evaluate);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.infos.map((info, index) => (
                    <HomeGridItem
                        info={info}
                        key={index}
                        onPress={() => this.onGridSelected(index)}/>
                ))}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
export default HomeGridView;
