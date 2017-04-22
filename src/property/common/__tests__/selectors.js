import {ACTIONS} from '../../common/actions';
import {SELECTORS} from './../selectors';
import {SELECTORS as APP_SELECTORS} from './../../../app/common/selectors';
import {createSelector} from 'reselect';
describe('Property Selectors', () => {

  test('getPrices', () => {


    // const getPrices = createSelector(
    //   propertyPrices,
    //   selectedPropertyType,
    //   APP_SELECTORS.getSelectedCountry,
    //   (prices, type, country) => prices[type][country.abbr],
    // );

    let prices = {
      'For Share' : {
        'KW':['11111','1111112','222'],
        'SA':['312','333321','442244'],
      },
      'For Sale' : {
        'KW':['123','11','22'],
        'SA':['2222','3333','4444'],
      },
    };

    let selector = createSelector(
      SELECTORS.getPrices,
      SELECTORS.getSelectedPropertyType,
      APP_SELECTORS.getSelectedCountry,
      (a, b,c) => a[b][c.abbr]
    );

    // expect(
    //   selector
    // ).toEqual(
    //   ['123','11','22']
    // );
  });

});
