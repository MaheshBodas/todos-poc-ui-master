# Todo's UI PoC
Todo's UI PoC is Front end application which consume Todo's Rest API server. Its sends appropriate GET request to retrive data and uses POST request to create objects on server side.

 Here is brief introduction to functionality it offers.

1. View large number of Todo's user just need to keep scrolling down in order to load additional Todo's records in Grid.
2. User can re-arrange the Todo's records via Drag and Drop. The re-ordering of Todo's is persisted on page refresh.
3. View All Todo's screen lets user to view list of Todo's using Client side Pagination.


### It makes use of following technology.
- ReactJS, Element React component library, Redmond theme from jQuery UI, FontAwesome, TypeScript, lint.
- Redux for global state store, Redux-thunk middleware.
- Axios library to communicate with server, uses token authentication.
## Demo
![demo](https://github.com/MaheshBodas/chinook-poc-ui-master/blob/master/blob/Dashboard.png)

## Build Setup

``` bash

# Clone project
git clone https://github.com/MaheshBodas/chinook-poc-ui-master.git

# Install dependencies
npm install

# serve with hot reload at localhost:9528
serve -s build

# build for production with minification
react-scripts build

# Running unit test cases
npm run test

```

## File Structure

Within the download you'll find the following directories and files:

```
todos-poc-ui-master
├── blob
│   └── Dashboard.png
├── CHANGELOG.md
├── config.yml
├── docker-compose.yaml
├── Dockerfile
├── LICENSE.md
├── package.json
├── package-lock.json
├── README.md
├── setnvm.sh
├── src
│   ├── _actions
│   │   ├── alert.actions.js
│   │   ├── authentication.actions.js
│   │   ├── index.js
│   │   ├── user.actions.js
│   │   └── viewalltodos.action.js
│   ├── api
│   │   ├── auth.js
│   │   ├── session.js
│   │   └── table.js
│   ├── App.js
│   ├── _components
│   │   ├── ComposableContainer
│   │   │   ├── card.css
│   │   │   └── ComposableContainer.tsx
│   │   ├── InfiniteScrollGrid
│   │   │   └── InfiniteScrollGrid.jsx
│   │   ├── LoaderComponent
│   │   │   └── LoaderComponent.jsx
│   │   ├── TodaysTodoGrid
│   │   │   └── TodaysTodoGrid.jsx
│   │   ├── ToggleContainer
│   │   │   ├── card.css
│   │   │   └── ToggleContainer.tsx
│   │   ├── utils.js
│   │   ├── ViewTodoGrid
│   │   │   ├── ViewTodoGrid.css
│   │   │   ├── ViewTodoGrid.css.js
│   │   │   └── ViewTodoGrid.jsx
│   │   └── ViewTodoGridRedux
│   │       ├── ViewTodoGridRedux.css
│   │       ├── ViewTodoGridRedux.css.js
│   │       └── ViewTodoGridRedux.jsx
│   ├── components
│   │   ├── account
│   │   │   ├── AccountProfileDetails.js
│   │   │   └── AccountProfile.js
│   │   ├── DashboardLayout.js
│   │   ├── DashboardNavbar.js
│   │   ├── DashboardSidebar.js
│   │   ├── GlobalStyles.js
│   │   ├── Logo.js
│   │   ├── MainLayout.js
│   │   ├── MainNavbar.js
│   │   └── NavItem.js
│   ├── _constants
│   │   ├── alert.constants.js
│   │   ├── authentication.constants.js
│   │   ├── index.js
│   │   ├── user.constants.js
│   │   └── viewalltodos.constants.js
│   ├── _helpers
│   │   ├── auth-header.js
│   │   ├── fake-backend.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── store.js
│   ├── icons
│   │   ├── Facebook.js
│   │   └── Google.js
│   ├── _images
│   │   ├── ListLoading.gif
│   │   └── viewalltrack.jpg
│   ├── index.js
│   ├── __mocks__
│   │   └── axios.js
│   ├── pages
│   │   ├── Account.js
│   │   ├── Login.js
│   │   ├── NotFound.js
│   │   └── Register.js
│   ├── react-app-env.d.ts
│   ├── _reducers
│   │   ├── alert.reducer.js
│   │   ├── authentication.reducer.js
│   │   ├── index.js
│   │   ├── registration.reducer.js
│   │   ├── users.reducer.js
│   │   └── viewalltodos.reducer.js
│   ├── routes.js
│   ├── _services
│   │   ├── authentication.services.js
│   │   ├── index.js
│   │   ├── user.service.js
│   │   └── viewalltodos.services.js
│   ├── serviceWorker.js
│   ├── __tests__
│   │   ├── App.test.js
│   │   ├── Dashboard.test.js
│   │   └── ToggleContainer.test.js
│   ├── theme
│   │   ├── index.js
│   │   ├── shadows.js
│   │   └── typography.js
│   ├── utils
│   │   ├── auth.js
│   │   ├── dateutils.js
│   │   ├── getInitials.js
│   │   └── request.js
│   └── views
│       ├── AboutMe
│       │   ├── AboutMe.css.js
│       │   ├── AboutMe.jsx
│       │   └── package.json
│       ├── Dashboard
│       │   ├── classes.js
│       │   ├── Dashboard.css.js
│       │   └── Dashboard.jsx
│       ├── Login
│       │   ├── Login.jsx
│       │   └── package.json
│       └── pages
│           ├── login
│           │   └── Login.js
│           ├── page404
│           │   └── Page404.js
│           ├── page500
│           │   └── Page500.js
│           └── register
│               └── Register.js
├── todos-ui-28-05-2021.zip
└── tsconfig.json

```

## Resources

- More freebies like this one: <https://devias.io>

## Reporting Issues:

- [Github Issues Page](https://github.com/devias-io/react-material-dashboard/issues?ref=devias-io)

## License

- Licensed under MIT (https://github.com/mahesh.bodas/todos-poc-ui-master/master/LICENSE.md)

## Contact me

- Email Us: mahesh.bodas@gmail.com
