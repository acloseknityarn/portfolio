---
title: >-
  Server-Side vs Client-Side Rendering: A Practical Guide
publishDate: 2024-07-01 22:45:00
description: |
  A Bare Bones Practical Guide to Understanding Server Side and Client Side Rendering
tags:
  - ssr
  - csr
  - user experience
  - guide
---

<!-- ## Outline:

1. Server-Side Rendering (SSR)

- Recipes listing page example
- Anchor tag behavior and server response
- Fastify GET route example for `recipe/:id`

2. Client-Side Rendering (CSR)

- Motivation: Improving user experience
- Addressing latency issues
- Implementing loaders and dynamic DOM manipulation

3. Implementing CSR: browser.js

- Event delegation with `ul` click handler
- Event bubbling explanation
- Code walkthrough:
  - Preventing default behavior
  - Fetching data
  - Updating DOM

4. Comparison and Conclusion

- SSR vs CSR: Performance and user experience
- Best practices for choosing between them

&nbsp;

## Introduction:

Picture this: It's 1995, and you're waiting for your dial-up modem to screech its way onto the internet. You click a link, and boom – a full page loads, straight from the server to your CRT monitor. Fast forward to today, and you're scrolling through a slick web app, watching content pop up instantly as you interact. What changed?

Welcome to the evolution of web rendering, folks. We've come a long way from those server-side days of the '90s to the JavaScript-powered, client-side wonders of the modern web. But here's the kicker – both approaches are still kicking, and choosing between them can make or break your web project.
I've been in the trenches, wrestling with these decisions, and let me tell you – it's not always clear cut. That's why I'm fired up to break it down for you. We're going to roll up our sleeves and get our hands dirty with some real code. I'm talking about building a recipe app with Fastify, showing you the nitty-gritty of both server-side and client-side rendering.

By the time we're done, you'll have a solid grasp on when to use each approach, and more importantly, why. So grab your favorite beverage, fire up your code editor, and let's dive into the world of web rendering. Trust me, your future self (and your users) will thank you for it. -->

### Server Side Rendering

Server Sided Rendering, means that html is ready-to-display to your browser page like a ready-made meal.

We will be referencing to a Recipe app using Fastify to compare this on code level.

Recipe app includes a recipe creating, recipe listing page & recipe details page.

We start the fastify server in a `server.mjs` file with starting plugins & importantly the request handlers or get end points for browsing the pages.

In our recipe listing page, we have list of recipe's with anchor tags.

On the click of an anchor tag, browser initiates a get request to the href of the anchor tag. The browser changes the url of the page.

In our recipes app listing page, recipes are list of anchor tags.

```html
<ul>
  <li>
    <a href="/recipes/a5c524cf-7896-435f-a54a-0539cb0047af">Besan Chilla</a>
  </li>
  <li>
    <a href="/recipes/033a5e9c-c985-4774-b205-d2c7540c986c">Chana Chaat</a>
  </li>
  <li>
    <a href="/recipes/1fa0e975-7af5-4378-a4f5-054872ec7eee">Paneer Biryani</a>
  </li>
  <li>
    <a href="/recipes/f65c8bda-3ad0-4c3a-9033-5d84ad2f7711">Egg Biryani</a>
  </li>
  <li>
    <a href="/recipes/a456abb4-0fc3-466c-b503-986d0b90857c">Chilli Paneer</a>
  </li>
  <li>
    <a href="/recipes/b895e230-a8dd-44d7-b167-9a16621bcc20">Rajma Rice</a>
  </li>
  <li>
    <a href="/recipes/46baa689-38eb-41f9-b4e2-bcd676656cc8">Kadi Chawal</a>
  </li>
</ul>
```

With the click of a specific anchor tag recipe say Paneer Biryani, a get request is initiated to `/recipes/1fa0e975-7af5-4378-a4f5-054872ec7eee`

To handle any request we have used fastify framework to create a server. Where we create get handlers for specific urls/paths, so that we can return a response from those handlers.

```javascript
fastify.get("/recipes/:id", async function getRecipeHandler(request, reply) {});
```

This is the definition of a get handler in a fastify server. The first argument matches the url pattern & the second argument is a function which will be called when the fastify server receives a request.

```js
fastify.get("/recipes/:id", async function getRecipeHandler(request, reply) {
  const { currentRecipesData } = await readRecipes({ retType: "json" }); // [!code highlight]

  const recipe = currentRecipesData.find(
    (recipe) => recipe.id === request.params.id
  );

  if (!recipe) {
    return reply.code(404).send("Recipe not found");
  }

  // type of this response is a node stream ( by default all html responses are streams)
  return reply.render("./recipe.hbs", { recipe: recipe });
});
```

In above code snippet, highlighted line is getting recipes from the database.

```js
fastify.get("/recipes/:id", async function getRecipeHandler(request, reply) {
  const { currentRecipesData } = await readRecipes({ retType: "json" });

  // [!code highlight:8]
  const recipe = currentRecipesData.find(
    (recipe) => recipe.id === request.params.id
  );

  if (!recipe) {
    return reply.code(404).send("Recipe not found");
  }

  // type of this response is a node stream ( by default all html responses are streams)
  return reply.render("./recipe.hbs", { recipe: recipe });
});
```

`recipe` variable searches the database recipes list for a recipe whose id matches the id provided by the request or the URL parameters.

If no matching recipe is found, the server responds with a 404 status code and the response "Recipe not found".

```js
fastify.get("/recipes/:id", async function getRecipeHandler(request, reply) {
  const { currentRecipesData } = await readRecipes({ retType: "json" });

  const recipe = currentRecipesData.find(
    (recipe) => recipe.id === request.params.id
  );

  if (!recipe) {
    return reply.code(404).send("Recipe not found");
  }

  // type of this response is a node stream ( by default all html responses are streams)
  return reply.render("./recipe.hbs", { recipe: recipe }); // [!code highlight]
});
```

The final line of code says: If the matching recipe is found, it renders an Handlebars template "recipe.hbs" with the recipe data.

To summarise for Server Side Rendering, the whole fastify's server behaviour of processing a request, fetching the data & rendering a full HTML page for the browser prehand is called Server-Sided Rendering.

### Client Side Rendering

Client-Side Rendering is more like a meal kit delivery service. The initial delivery will have ingredients and instructions (initial HTML, JS) but won't be edible till it's prepared.

Before 2005, only Server Side Rendering was possible.

<!-- behaviour (anchor tag, white screen) -->
<!-- behavious is a problem in long latency of network (internet connectg) -->
<!-- we can do better -->
<!-- CSR concept (dynamic data fetching + dynamic html rendering (JS)) -->
<!-- code explain (browser.js) -->

<!-- high latency me: a visitor of the website might get irritated seeing white screen -->

On click of an anchor tag, browser has to wait for the response to come back from the server. This waiting is shown as white screen to any user. At high latency this white screen lasts long enough for a bad user experience.

The solution to this is Client Side Rendering. In CSR we fetch data dynamically & the html is also rendered dynamically. This is what we'll do:

1. We'll prevent the get call for the href of anchor tag, so that the request doesn't go to the server and we don't see white screen.
2. We initiate a dynamic request to fetch the recipe data. While the data is loading, we display a loader indicator in front of that anchor tag.
3. Once the recipe data is received, we generate the required HTML to display it in the browser.

<!-- -Why do I need CSR????? What problem does it solve????
CSR is required to remove the white screen while loading a url to make the user experience better

-HOW to do CSR -->

<!-- After that, in order to enhance the user experience and reduce loading times Client Side Rendering came into picture.

CSR helps in removing white screen while loading a url instead showing a loader by writing some client side JS, dynamically fetching data and dynamically creating html. Additionally having some initial html to be shown. -->

In our Recipe app this code is written in browser.js file. We'll go through this file line by line running in the browser.

Our browser.js looks like this:

```js
const recipeListEl = document.getElementById("recipe-list");

recipeListEl.addEventListener("click", async (event) => {
  // it will not do its default behaviour, which is to try to go to the server to fetch the page (GET)
  if (event.target.tagName !== "A") {
    return;
  }

  // if the click has originated from a link
  event.preventDefault();
  const href = event.target.getAttribute("href");
  // we have to dynamically to go `/recipes/<id>`
  window.history.pushState(null, null, href);

  // we have to show the loader for this particular a tag
  const spinner = event.target.nextElementSibling;
  spinner.classList.remove("hide");

  // fetch for an api that returns a particular recipe
  // `/recipes/<id>`
  const urlToFetchJSONFrom = `/api${href}`;

  // response object
  const response = await fetch(urlToFetchJSONFrom);
  // extract json out of response object
  const data = await response.json();
  console.info(data);

  // ul hide
  spinner.classList.add("hide");
  recipeListEl.classList.add("hide");

  // Loop over the keys of the data
  // for each key, we will find the paragraph element with the same id
  // and set the text content of that paragraph to the value of the key

  const fullRecipePlaceholderEl = document.getElementById(
    "full-recipe-placeholder"
  );
  fullRecipePlaceholderEl.classList.remove("hide");

  // array of arrays, each array is a key value pair of the object passed in the argument
  const jsonInArrayFormat = Object.entries(data);

  const filteredData = jsonInArrayFormat.filter(([key, value]) => {
    return key !== "id";
  });

  filteredData.forEach(([key, value]) => {
    const paragraph = document.getElementById(key);
    paragraph.textContent = value;
  });
});
// end of event listener

window.addEventListener("popstate", function (event) {
  // Check if the current URL path is '/recipes'
  if (window.location.pathname === "/recipes") {
    // Refresh the page
    window.location.reload();
  }
});
```

browser.js ended...

<!-- NOTE: TODO: add this code later, when we talk about coming back to recipe listing page from recipe detail page.

```js
window.addEventListener("popstate", function (event) {
  // Check if the current URL path is '/recipes'
  if (window.location.pathname === "/recipes") {
    // Refresh the page
    window.location.reload();
  }
});
```

refer: [PopStateEvent](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent) -->

```js
const recipeListEl = document.getElementById("recipe-list");
```

`recipeListEl` finds the element in the DOM with 'id=recipe-list'.

```js
recipeListEl.addEventListener("click", async (event) => {
  ...
})
```

Adding the click event listener to the recipe list element, essentially the ul element.

```js
if (event.target.tagName !== "A") {
  return;
}
```

inside the click listener, we start by conditionally checking if the click originated from an anchor tag, else we return the function early

```js
event.preventDefault();
```

This prevents the default action (which is: sending a GET request to href of anchor tag) of the anchor element on click.

```js
const href = event.target.getAttribute("href");
```

This gets the value of the "href" attribute from the clicked anchor tag

```js
window.history.pushState(null, null, href);
```

This updates the browser's history and URL without reloading the page & and without calling a get request. This helps us change the browser URL and yet prevent a flash of white screen.
<br>
helper article: [history.pushState](https://medium.com/@nagachaitanyakonada/javascript-window-history-pushstate-tutorial-56e2126eaff1)

```js
const spinner = event.target.nextElementSibling;
spinner.classList.remove("hide");
```

This finds the next sibling element of the clicked anchor tag and removes the hide class (display: none) to show it. The purpose of this is to show a loader svg on the anchor click.

```js
const urlToFetchJSONFrom = `/api${href}`;
// response object
const response = await fetch(urlToFetchJSONFrom);
// extract json out of response object
const data = await response.json();
```

`/api${href}` is the request URL of an api endpoint, whose response is a JSON object of the particular recipe.
<br>
2nd & 3rd lines fetches the data from the api endpoint and stores the recipe data in `data` variable.

```js
spinner.classList.add("hide");
recipeListEl.classList.add("hide");
```

After the JSON data has been fetched we hide the loader/spinner and the recipe list since we don't need them anymore.

<!-- maybe (upto your discretion and decision) you can write in a simple line the explanation of why we are hiding recipe list: 'we are hiding the recipe list, so that we can build html of the recipe details. How do we do that? As follows: -->

We are hiding the recipes list, so that we can build html of the recipe details, whose empty template is already added and hidden in recipe list html.
<br>
It looks like this:

```html
<!-- this is the recipe template, hidden before fetching the recipe details data, which is populated with appropriate data -->
<div id="full-recipe-placeholder" class="hide">
  <h1>Recipe</h1>
  <p id="recipe-name"></p>
  <p id="recipe-type"></p>
  <hr />
  <p id="recipe-content" class="pre-line"></p>
</div>
```

We are dynamically populating appropriate data to the above html using DOM APIs.

```js
const fullRecipePlaceholderEl = document.getElementById(
  "full-recipe-placeholder"
);
fullRecipePlaceholderEl.classList.remove("hide");
```

After hiding the spinner & recipe list, we need to show the hidden html for the recipe details data.

<!-- `fullRecipePlaceholderEl` gets the element to be shown as the new dynamic html & removes the 'hide' class from the DOM for showing it. -->
<!-- Note: TODO: commented the above code, because we need to explain more context about
what `fullRecipePlaceholderEl` is. What is its need? Why is it hidden and why are we removing its hide class now.
  -->

`fullRecipePlaceholderEl` targets the element in the DOM of recipe details html. We need to remove the 'hide' class in it for it to be shown.

```js
const jsonInArrayFormat = Object.entries(data); // [!code highlight]

const filteredData = jsonInArrayFormat.filter(([key, value]) => {
  return key !== "id";
});

filteredData.forEach(([key, value]) => {
  const paragraph = document.getElementById(key);
  paragraph.textContent = value;
});
```

This converts the `data` into an array of key-value pairs

```js
const jsonInArrayFormat = Object.entries(data);
// [!code highlight:4]
const filteredData = jsonInArrayFormat.filter(([key, value]) => {
  return key !== "id";
});

filteredData.forEach(([key, value]) => {
  const paragraph = document.getElementById(key);
  paragraph.textContent = value;
});
```

<!--
  TODO
  the following is not perfect, but we need to mention it somehow
  - we filter out the `id` data from recipe data, because we don't need it for the html generation of recipe data.
 -->

<!-- commenting this in favour of above comment's action to take:  This filters out the JSON data's key-value pair excluding id as key from `data` -->

This filters out the JSON data's key-value pair excluding id as key from `data`.

```js
const jsonInArrayFormat = Object.entries(data);

const filteredData = jsonInArrayFormat.filter(([key, value]) => {
  return key !== "id";
});
// [!code highlight:9]
filteredData.forEach(([key, value]) => {
  const paragraph = document.getElementById(key);
  paragraph.textContent = value;
});
```

This iterates over the `filteredData`, finds a paragraph element with the `id` matching each key, and sets its text content to the corresponding `value`. This is the dynamic html creation.

```js
window.addEventListener("popstate", function (event) {
  // Check if the current URL path is '/recipes'
  if (window.location.pathname === "/recipes") {
    // Refresh the page
    window.location.reload();
  }
});
```

<!-- GET(HTML Responses) URL => /recipes -> (SKIPPED GET REQUEST) + manually changed browser history -> /recipe/:id
<- browser history got changed back to /recipes <---- GET -->

Lastly, since we prevented sending get request for html to the server from the anchor tag (the default behaviour).

While going back from `/recipes/:id` to `/recipes` url, the browser history gets changed to '/recipes' but there is no get request sent for html response
resulting in the incorrect display of the recipe-listing page.

To solve this we listen to the popstate event on window. [popstate's definition from MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event).

> It changes the current history entry to that of the last page the user visited or, if history.pushState() has been used to add a history entry to the history stack, that history entry is used instead.

So, when coming back to `recipes/` from `/recipes/:id`, the popstate event gets triggered. We check the pathname of the window as `/recipes`, if the condition is satisfied we reload the page so that we get fresh recipes list.

<!-- there is no way for us to get back to the recipes list page. This is solved by using a popstate event listener & `reload()` the window. -->

To summarise, for client side rendering, we did the following steps

1. Prevented default behaviour of an anchor tag ( GET request ).
2. Dynamically fetched data & showed a loader indicator.
3. Dynamically generated html through client side javascript.

This helped prevent white screen in between two HTML GET requests.
