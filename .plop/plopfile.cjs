const { resolve } = require('path');

module.exports = function (plop) {
  plop.setGenerator('seed', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the title of the seeder:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'config',
          'database',
          'seeders',
          `{{ timestamp }}-{{ kebabCase name }}.ts`,
        ),
        templateFile: 'templates/template-seeder.ts.hbs',
        data: {
          timestamp: new Date().getTime(),
        },
      },
    ],
  });
};
