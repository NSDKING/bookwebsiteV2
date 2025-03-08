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
      paragraphID: a.string(), // Changed from a.id().index("byParagraph")
    })
    .authorization((allow) => [allow.publicApiKey()]), // Changed from allow.public()

  Messages: a
    .model({
      id: a.id(),
      mail: a.string(),
      nom: a.string(),
      note: a.string(),
      numero: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]), // Changed from allow.public()

  Agenda: a
    .model({
      id: a.id(),
      name: a.string(),
      date: a.date(),
      description: a.string(),
      image: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]), // Changed from allow.public()

  Rubrique: a
    .model({
      id: a.id(),
      text: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]), // Changed from allow.public()

  Paragraph: a
    .model({
      id: a.id(),
      text: a.string(),
      title: a.string(),
      articlesID: a.string(), // Changed from a.id().index("byArticles")
      order: a.integer(), // Changed from a.int()
      Images: a.hasMany("Images"), // Removed indexName and fields properties
    })
    .authorization((allow) => [allow.publicApiKey()]), // Changed from allow.public()

  USER: a
    .model({
      id: a.id(),
      name: a.string(),
      editor: a.boolean(),
      Articles: a.hasMany("Articles"), // Removed indexName and fields properties
      admin: a.boolean(),
      logid: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]), // Changed from allow.public()

  Articles: a
    .model({
      id: a.id(),
      Titles: a.string(),
      images: a.string(),
      userID: a.string(), // Changed from a.id().index("byUSER")
      rubrique: a.string(),
      Paragraphs: a.hasMany("Paragraph"), // Removed indexName and fields properties
      carrousel: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]), // Changed from allow.public()
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