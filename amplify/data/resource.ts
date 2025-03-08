import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
// The section below creates various database tables based on the provided models.
// Each model has its own fields and authorization rules.
=========================================================================*/

const schema = a.schema({
  Images: a
    .model({
      id: a.id(),
      link: a.string(),
      descriptions: a.string(),
      positions: a.string(),
      paragraphID: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Messages: a
    .model({
      id: a.id(),
      mail: a.string(),
      nom: a.string(),
      note: a.string(),
      numero: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Agenda: a
    .model({
      id: a.id(),
      name: a.string(),
      date: a.date(),
      description: a.string(),
      image: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Rubrique: a
    .model({
      id: a.id(),
      text: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Paragraph: a
    .model({
      id: a.id(),
      text: a.string(),
      title: a.string(),
      articlesID: a.string(),
      order: a.integer(),
      Images: a.hasMany("Images", "paragraphID"), // Added second parameter
    })
    .authorization((allow) => [allow.publicApiKey()]),

  USER: a
    .model({
      id: a.id(),
      name: a.string(),
      editor: a.boolean(),
      Articles: a.hasMany("Articles", "userID"), // Added second parameter
      admin: a.boolean(),
      logid: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Articles: a
    .model({
      id: a.id(),
      Titles: a.string(),
      images: a.string(),
      userID: a.string(),
      rubrique: a.string(),
      Paragraphs: a.hasMany("Paragraph", "articlesID"), // Added second parameter
      carrousel: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

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
// Go to your frontend source code. From your client-side code, generate a
// Data client to make CRUDL requests to your tables. (THIS SNIPPET WILL ONLY
// WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
// Fetch records from the database and use them in your frontend component.
// (THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>