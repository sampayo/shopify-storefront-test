import React from 'react';
import ReactDOM from 'react-dom';
// import toJson from 'enzyme-to-json';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
