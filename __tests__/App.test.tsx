/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it,describe,expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

describe('Circle class', ()=> {
  describe('area is calculated when', ()=> {
    it('sets the radius', ()=> {
      expect(1+1).toEqual(2);
      });
    it('sets the diameter', ()=> { 
      expect(1+1).toEqual(2);

     });
    it('sets the circumference', ()=>{ 
      expect(1+1).toEqual(3);
     });
  });
});