# VA.gov [![Build Status](https://dev.vets.gov/jenkins/buildStatus/icon?job=testing/vets-website/master)](http://jenkins.vetsgov-internal/job/testing/job/vets-website/job/master/)

## What is this?

This is the front end repository for VA.gov. It contains application code used across the site.

There are several repositories that contain the code and content used to build VA.gov. If you're looking to get started running VA.gov locally, you should read the [Getting Started](https://department-of-veterans-affairs.github.io/veteran-facing-services-tools/getting-started) documentation.

## Common commands

Once you have the site set up locally, these are some common commands you might find useful:

| I want to...               | Then you should...                                       |
| :------------------------- | :------------------------------------------------------- |
| fetch all dependencies     | `yarn install`; run this any time `package.json` changes |
| build applications         | `yarn build`                                             |
| run the webpack dev server | `yarn watch`                                             |

## Building `vets-website`

### Building applications

`vets-website` uses [Webpack](https://webpack.js.org) to bundle application
assets.

To **build all applications**, run the following:

```sh
yarn build
```

To **build one or more applications**, you can use the `--entry` option:

```sh
yarn build --entry static-pages,auth
```

To **recompile your application when you make changes**, run:

```sh
yarn watch
```

You can also **limit the applications Webpack builds** with `--env.entry`:

```sh
yarn watch --env.entry static-pages,auth
```

The `entryname` for your application can be found in its `manifest.json` file.

If you're developing a feature that requires the API, but can't or don't want to
run it locally, you can specify `--env.api`:

```sh
yarn watch --env.api https://dev-api.va.gov
```

You will need to disable CORS in your browser when using a non-local API. Here are some helpful links that explain how to do this:

- https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome
- https://stackoverflow.com/questions/4556429/disabling-same-origin-policy-in-safari

**Note:** If you try to log on, ID.me will redirect you to the environment that
the API is set up for. So in the above example, you'd be **redirected back to
dev.va.gov.**

### Building static content

Static pages are created from the [content-build](https://github.com/department-of-veterans-affairs/content-build) repository. See the [building static content](https://github.com/department-of-veterans-affairs/content-build#building-static-content) documentation.

### Building both together

After [building the applications](#building-applications), running `yarn build` in the `../content-build` directory will build content using the generated app bundles from `vets-website/build/localhost/generated`. The full build can be seen in `../content-build/build/localhost`.

## Running tests

### Unit tests

To **run all unit tests**, use:

```sh
yarn test:unit
```

If you want to **run only one test file**, you can provide the path to it:

```sh
yarn test:unit src/applications/path/to/test-file.unit.spec.js
```

To **run all tests for a folder in src/applications**, you can use app-folder:

```sh
yarn test:unit --app-folder hca
```

To **run all tests in a directory**, you can use a glob pattern:

```sh
yarn test:unit src/applications/path/to/tests/**/*.unit.spec.js*
```

To **run tests with stack traces**, pass log-level `trace`:

```sh
yarn test:unit --log-level trace
```

To **run tests with coverage output**, you can pass the coverage option:

```sh
yarn test:unit --coverage
```

For **help with test runner usage**, you can run:

```sh
yarn test:unit --help
```

### End-to-end (E2E) / Browser tests

- E2E or browser tests run in Cypress.

**Before running Cypress tests**, first make sure that:

1. `vets-website` is served locally on port 3001
   - You can do this with `yarn watch`
1. `vets-api` is **NOT** running
   - Any required APIs will be mocked by the Cypress test that needs them.

To **open the Cypress test runner UI and run any tests within it**:

```sh
yarn cy:open
```

To **run Cypress tests from the command line**:

```sh
yarn cy:run
```

To **run specific Cypress tests from the command line**:

```sh
# Running one specific test.
yarn cy:run --spec "path/to/test-file.cypress.spec.js"

# Running multiple specific tests.
yarn cy:run --spec "path/to/test-a.cypress.spec.js,path/to/test-b.cypress.spec.js"

# Running tests that match a glob pattern.
yarn cy:run --spec "src/applications/my-app/tests/*"
yarn cy:run --spec "src/applications/my-app/tests/**/*"

# Running tests that match multiple glob patterns.
yarn cy:run --spec "src/applications/a/tests/**/*,src/applications/b/tests/**/*"
```

To **run Cypress tests from the command line on a specific browser**:

```sh
yarn cy:run --headless --browser chrome
yarn cy:run --headless --browser firefox

# Without --headless, the test runner will open and run the test.
yarn cy:run --browser chrome
yarn cy:run --browser firefox
```

**For other options with `yarn cy:run`,** [the same options for `cypress run` are applicable](https://docs.cypress.io/guides/guides/command-line.html#Commands).

### Contract tests

To run all contract tests locally:

```sh
yarn test:contract
```

To run a specific contract test:

```sh
BUILDTYPE=localhost yarn test:unit src/applications/my-app/tests/example.pact.spec.js
```

## Running a mock API for local development

In separate terminal from your local dev server, run

```sh
yarn mock-api --responses path/to/responses.js
```

See the [mocker-api usage
documentation](https://github.com/jaywcjlove/mocker-api#usage) for how to use
the `responses.js`.

**If you need to log in**, go to your browser dev tools console and enter
`localStorage.setItem('hasSession', true)` and refresh the page. This will then
trigger a `/v0/user` call, which will then get the mocked response of a logged-in
user. (Assuming you've mocked that response, of course.)

Responses to common API requests, such as `/v0/user` and
`/v0/maintenance_windows`, you can use
[`src/platform/testing/local-dev-mock-api/common.js`](src/platform/testing/local-dev-mock-api/common.js)

```javascript
const commonResponses = require('src/platform/testing/local-dev-mock-api/common');

module.exports = {
  ...commonResponses,
  'GET path/to/endpoint': { foo: 'bar' },
};
```

## More commands

After a while, you may run into a less common task. We have a lot of commands
for doing very specific things.

| I want to...                                                                                                | Then you should...                                                                                                                                                                                                                        |
| :---------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| build the production site (dev features disabled).                                                          | `yarn build:production`                                                                                                                                                                                                                   |
| deploy the production site (dev features disabled).                                                         | `node src/platform/testing/e2e/test-server.js --buildtype=vagovprod`                                                                                                                                                                      |
| reset local environment (clean out node modules, Babel cache, and runs `npm install`)                       | `yarn reset:env`                                                                                                                                                                                                                          |
| run the app pages on the site for local development                                                         | `yarn watch --env.scaffold`                                                                                                                                                                                                               |
| run the site for local development with automatic rebuilding of Javascript and sass **with** css sourcemaps | `yarn watch:css-sourcemaps` then visit `http://localhost:3001/`. You may also set `--env.buildtype` and `NODE_ENV` though setting `NODE_ENV` to production will make incremental builds slow.                                             |
| run the site for local development with automatic rebuilding of code and styles for specific **apps**       | `yarn watch --env.entry disability-benefits,static-pages`. Valid application names are in each app's `manifest.json` under `entryName`                                                                                                    |
| run the site so that devices on your local network can access it                                            | `yarn watch --host 0.0.0.0 --public 192.168.x.x:3001` Note that we use CORS to limit what hosts can access different APIs, so accessing with a `192.168.x.x` address may run into problems                                                |
| watch file changes without starting the server                                                              | `yarn watch:no-server`                                                                                                                                                                                                                    |
| run all unit tests and watch                                                                                | `yarn test:watch`                                                                                                                                                                                                                         |
| run only e2e tests                                                                                          | Make sure the site is running locally (`yarn watch`) and run the tests with `yarn test:e2e`                                                                                                                                               |
| run e2e tests in headless mode                                                                              | `yarn test:e2e:headless`                                                                                                                                                                                                                  |
| run all linters                                                                                             | `yarn lint`                                                                                                                                                                                                                               |
| run only javascript linter                                                                                  | `yarn lint:js`                                                                                                                                                                                                                            |
| run only sass linter                                                                                        | `yarn lint:sass`                                                                                                                                                                                                                          |
| run lint on JS and fix anything that changed                                                                | `yarn lint:js:changed:fix`                                                                                                                                                                                                                |
| run automated accessibility tests                                                                           | `yarn build && yarn test:accessibility`                                                                                                                                                                                                   |
| run visual regression testing                                                                               | Start the site. Generate your baseline image set using `yarn test:visual:baseline`. Make your changes. Then run `yarn test:visual`.                                                                                                       |
| add new npm modules                                                                                         | `yarn add my-module`. Use the `--dev` flag for modules that are build or test related.                                                                                                                                                    |
| get the latest json schema                                                                                  | `yarn update:schema`. This updates our [vets-json-schema](https://github.com/department-of-veterans-affairs/vets-json-schema) vets-json-schema https://github.com/department-of-veterans-affairs/ to the most recent commit.              |
| check test coverage                                                                                         | `yarn test:coverage`                                                                                                                                                                                                                      |
| run bundle analyzer on our production JS bundles                                                            | `yarn build-analyze`                                                                                                                                                                                                                      |
| generate a stats file for analysis by bundle analyzer                                                       | `NODE_ENV=production yarn build:webpack --env.buildtype=vagovprod --env.analyzer`.                                                                                                                                                        |
| load the analyzer tool on a stats file                                                                      | `yarn analyze`                                                                                                                                                                                                                            |
| add a new React app                                                                                         | `yarn new:app` (make sure you have [`vagov-content`](https://github.com/department-of-veterans-affairs/vagov-content/) and [`content-build`](https://github.com/department-of-veterans-affairs/content-build/) sibling to `vets-website`) |

## Supported Browsers

| Browser                   | Minimum version | Note                                   |
| :------------------------ | :-------------: | :------------------------------------- |
| Internet Explorer         |       11        |                                        |
| Microsoft Edge            |       13        |                                        |
| Safari / iOS Safari       |        9        |                                        |
| Chrome / Android Web view |       44        | _Latest version with >0.5% of traffic_ |
| Firefox                   |       52        | _Latest version with >0.5% of traffic_ |

## Additional Resources

1. [VA.gov Knowledge Hub](https://department-of-veterans-affairs.github.io/va.gov-team/)
1. [Docs Directory](./docs)
1. [Manual](https://github.com/department-of-veterans-affairs/va.gov-team/blob/master/platform/accessibility/testing/508-manual-testing.md) and [Automated](https://github.com/department-of-veterans-affairs/va.gov-team/blob/master/platform/accessibility/testing/508-automated-testing.md) 508 Testing
