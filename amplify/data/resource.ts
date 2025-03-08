import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Images: a.model({
    link: a.string(),
    descriptions: a.string(),
    positions: a.string(),
    paragraphID: a.id().required(),
    paragraph: a.belongsTo('Paragraph', 'paragraphID'),
  }).authorization(allow => [
    allow.publicApiKey().to(['read']),
    allow.authenticated()
  ]),

  Messages: a.model({
    mail: a.string(),
    nom: a.string(),
    note: a.string(),
    numero: a.string(),
  }).authorization(allow => [
    allow.publicApiKey().to(['read', 'create']),
    allow.authenticated()
  ]),

  Agenda: a.model({
    name: a.string(),
    date: a.string(),
    description: a.string(),
    image: a.string(),
  }).authorization(allow => [
    allow.publicApiKey().to(['read']),
    allow.authenticated()
  ]),

  Rubrique: a.model({
    text: a.string(),
  }).authorization(allow => [
    allow.publicApiKey().to(['read']),
    allow.authenticated()
  ]),

  Paragraph: a.model({
    text: a.string(),
    title: a.string(),
    articlesID: a.id().required(),
    article: a.belongsTo('Articles', 'articlesID'),
    order: a.integer(),
    images: a.hasMany('Images', 'paragraphID'),
  }).authorization(allow => [
    allow.publicApiKey().to(['read']),
    allow.authenticated()
  ]),

  USER: a.model({
    name: a.string(),
    editor: a.boolean(),
    admin: a.boolean(),
    logid: a.string(),
    articles: a.hasMany('Articles', 'userID'),
  }).authorization(allow => [
    allow.authenticated()
  ]),

  Articles: a.model({
    Titles: a.string(),
    images: a.string(),
    userID: a.id().required(),
    user: a.belongsTo('USER', 'userID'),
    rubrique: a.string(),
    paragraphs: a.hasMany('Paragraph', 'articlesID'),
    carrousel: a.boolean(),
  }).authorization(allow => [
    // Allow public read access for articles
    allow.publicApiKey().to(['read']),
    // Allow authenticated users full access
    allow.authenticated(),
    // Allow owners to manage their own articles
    allow.owner()
  ]),
});

// Export the schema for use with generateClient
export default schema;

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
