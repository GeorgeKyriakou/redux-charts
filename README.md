# React Redux Disney Character hub

Built on top of the vite-template-redux [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)
Also uses [Highcharts](https://www.highcharts.com/?credits) to display statistics pie chart

## Goals / Requirements

- Present characters fetched from the disney API
- Use react query cache as state management
- Display table with characters info
- Table is sortable by name
- Table is paginated with navigation buttons
- There is a filter (search) functionality by name
- There is a filter (search) functionality by appearance in tv show
- Opens character detail modal sheet
- Opens statistics modal to display pie chart of tv show appearances
- Is accessible

## Usage

To run the app locally, in your terminal at the root of the project `npm install && npm run dev`

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
