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

  plop.setGenerator('crud-static-entity', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the entity in the singular:',
      },
      {
        type: 'input',
        name: 'namePlural',
        message: 'Enter the name of the entity in the plural:',
      },
    ],
    actions: [
      // controller
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          `{{ kebabCase name }}.controller.ts`,
        ),
        templateFile: 'templates/crud-static-entity/controller.ts.hbs',
      },
      // model
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          `{{ kebabCase name }}.module.ts`,
        ),
        templateFile: 'templates/crud-static-entity/module.ts.hbs',
      },
      // dto's
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'dto',
          `create-{{ kebabCase name }}.dto.ts`,
        ),
        templateFile: 'templates/crud-static-entity/dto/create.dto.ts.hbs',
      },
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'dto',
          `update-{{ kebabCase name }}.dto.ts`,
        ),
        templateFile: 'templates/crud-static-entity/dto/update.dto.ts.hbs',
      },
      // entity
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'entities',
          `{{ kebabCase name }}.entity.ts`,
        ),
        templateFile: 'templates/crud-static-entity/entities/entity.ts.hbs',
      },
      // use-cases
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'use-cases',
          `create-{{ kebabCase name }}.service.ts`,
        ),
        templateFile:
          'templates/crud-static-entity/use-cases/create.service.ts.hbs',
      },
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'use-cases',
          `delete-{{ kebabCase name }}.service.ts`,
        ),
        templateFile:
          'templates/crud-static-entity/use-cases/delete.service.ts.hbs',
      },
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'use-cases',
          `update-{{ kebabCase name }}.service.ts`,
        ),
        templateFile:
          'templates/crud-static-entity/use-cases/update.service.ts.hbs',
      },
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'use-cases',
          `get-all-{{ kebabCase name }}.service.ts`,
        ),
        templateFile:
          'templates/crud-static-entity/use-cases/get-all.service.ts.hbs',
      },
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'use-cases',
          `get-one-by-id-{{ kebabCase name }}.service.ts`,
        ),
        templateFile:
          'templates/crud-static-entity/use-cases/get-one-by-id.service.ts.hbs',
      },
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'modules',
          '{{ kebabCase name }}',
          'use-cases',
          `index.ts`,
        ),
        templateFile: 'templates/crud-static-entity/use-cases/index.ts.hbs',
      },
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
        templateFile: 'templates/crud-static-entity/seeder.ts.hbs',
        data: {
          timestamp: new Date().getTime(),
        },
      },
      {
        type: 'add',
        path: resolve(
          __dirname,
          '..',
          'src',
          'config',
          'database',
          'migrations',
          `{{ timestamp }}-create-table-{{ kebabCase name }}.ts`,
        ),
        templateFile: 'templates/crud-static-entity/migration.ts.hbs',
        data: {
          timestamp: new Date().getTime(),
        },
      },
    ],
  });
};
