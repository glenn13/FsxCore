const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {},
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    borderColor: ['responsive', 'hover', 'focus', 'active'],
    borderStyle: ['responsive', 'hover', 'focus'],
    borderWidth: ['responsive', 'hover', 'focus'],
    width: ['responsive', 'important'],
  },
  plugins: [
    plugin(function ({addVariant}) {
      addVariant('important', ({container}) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls(decl => {
            decl.important = true;
          });
        });
      });
    }),
  ],
  corePlugins: {
    // ...
    outline: false,
  },
  important: true,
};
