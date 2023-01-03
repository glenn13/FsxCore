import Base from './base';
const merge = require('deepmerge');

export default merge(Base, {
  color: {
    primary: '#000000',
    secondary: '#384E6E',
  },
  bgColor: {
    primary: '#4e4e4e',
    secondary: '#fff',
  },
  sidebar: {
    bgColor: '#ffffff',
    active: '#f3f7fb',
  },
  content: {
    bgColor: '#f4f7fa',
  },
  panel: {
    bgColor: '#ffffff',
  },
  shadow: {
    color: '#dedede',
  },
  text: {
    color: '#333333',
  },
  background: '#fff',
});
