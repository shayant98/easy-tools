const presets = [
	{
		title: "Title",
		value: `
# Project Title

A brief description of what this project does and who it's for

`,
	},
	{
		title: "Environment Variables",
		value: `
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

\`API_KEY\`

\`ANOTHER_API_KEY\`
`,
	},
	{
		title: "Deployment",
		value: `

## Deployment

To deploy this project run

\`\`\`bash
  npm run deploy
\`\`\`


`,
	},
	{
		title: "Run Locally",
		value: `

## Run Locally

Clone the project

\`\`\`bash
  git clone https://link-to-project
\`\`\`

Go to the project directory

\`\`\`bash
  cd my-project
\`\`\`

Install dependencies

\`\`\`bash
  npm install
\`\`\`

Start the server

\`\`\`bash
  npm run start
\`\`\`


`,
	},
	{
		title: "API Reference",
		value: `## API Reference

#### Get all items

\`\`\`http
  GET /api/items
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`api_key\` | \`string\` | **Required**. Your API key |

#### Get item

\`\`\`http
  GET /api/items/\${id}
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`id\`      | \`string\` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


`,
	},
	{
		title: "FAQ",
		value: `## FAQ

#### Question 1

Answer 1

#### Question 2

Answer 2


`,
	},
	{
		title: "Features",
		value: ` ## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

`,
	},

	{
		title: "Installation",
		value: `
    ## Installation

Install my-project with npm

\`\`\`bash
  npm install my-project
  cd my-project
\`\`\`

`,
	},
	{
		title: "Screenshot",
		value: `## Screenshots
    ![Screenshot](https://via.placeholder.com/400x300)

`,
	},
	{
		title: "Authors",
		value: `
    ## Authors
     - [@yltsakcir](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

    `,
	},
	{
		title: "License",
		value: `
    ## License
    [MIT](https://choosealicense.com/licenses/mit/)
    `,
	},
	{
		title: "Acknowledgements",
		value: `## Acknowledgements
    - [awesome-readme](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`,
	},

	{
		title: "Support",
		value: `## Support

    `,
	},
];

export default presets;
