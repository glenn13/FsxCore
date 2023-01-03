import Base from './base';
const merge = require('deepmerge');

export default merge(Base, {
  color: {
    primary: '#d0d0d0',
  },
  bgColor: {
    primary: '#ffffff',
    secondary: '#4e4e4e',
  },
  sidebar: {
    bgColor: '#383838',
    active: '#3e3e3e',
  },
  content: {
    bgColor: '#292929',
  },
  panel: {
    bgColor: '#383838',
  },
  shadow: {
    color: '#272626',
  },
  text: {
    color: '#ffffff',
  },
  background: '#333',
});
