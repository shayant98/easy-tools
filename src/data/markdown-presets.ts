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
    value: `

## API Reference

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
    title: "Title4",
    value: `
# Project Title

A brief description of what this project does and who it's for

`,
  },
];

export default presets;
