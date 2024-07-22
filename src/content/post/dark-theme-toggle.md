---
title: >-
  How to implement Dark Theme using Local Storage
publishDate: 2024-07-11 15:00:00
description: |
  A practical guide for creating a light/dark theme toggle with JavaScript, including HTML setup, CSS styling, and user preference handling.
tags:
  - javascript
  - frontend
  - darkmode
  - accessibility
---

<!-- Outline:

1. Introduction

   - Purpose of theme toggle

2. Component Structure

   - HTML structure of the theme toggle

3. Styling the Toggle

   - CSS for button and icons
   - Handling light and dark themes

4. JavaScript Implementation

   - Custom HTML element: ThemeToggle
   - Toggling theme functionality
   - Initializing and maintaining state

5. Conclusion -->

<!-- To understand light/dark theme on a website, we'll create a simple web page with a single button that will toggle theme on every click. -->

This guide outlines the technical implementation of a light/dark theme toggle for web applications.

##### HTML Structure

The toggle is implemented using a simple button element:

```html
<button>
  <span class="theme-label light">Light</span>
  <span class="theme-label dark">Dark</span>
</button>
```

We have made a clickable component `button` in html, and added span elements inside it. The span elements adds `theme-label`, `light` and `dark` classes & have text Light and Dark to represent corresponding theme.
This structure provides a foundation for applying styles and attaching event listeners.

<!-- Addtionally, For accessbility: ensuring the theme toggle is usable by people with disabilities, we have added and made the `<span>Dark Theme</span>` hidden -->

##### JavaScript Implementation

<!-- Implementing the click event functionality requires a state listener which we will acheive using JavaScript. The code looks like this: -->

The core functionality is implemented through JavaScript, utilizing DOM manipulation and event handling:

```js
const button = document.querySelector("button");

/** Set the theme to dark/light mode. */
const setTheme = (dark) => {
  document.documentElement.classList[dark ? "add" : "remove"]("theme-dark");
};

// Toggle the theme when a user clicks the button.
button.addEventListener("click", () => setTheme(!isDark()));

// Initialize button state to reflect current theme.
setTheme(isDark());

function isDark() {
  return document.documentElement.classList.contains("theme-dark");
}
```

<!-- END OF JS FILE -->

```js
const button = document.querySelector("button");
```

This selects the button element from our html.

```js
const setTheme = (dark) => {
  document.documentElement.classList[dark ? "add" : "remove"]("theme-dark");
};
```

This creates a function `setTheme` with a parameter dark which will be a truthy or falsy value. Accordingly, it adds or removes a class `theme-dark` to the root element or document.documentElement or `html` element of the page.

```js
button.addEventListener("click", () => setTheme(!isDark()));
```

This creates an event listener for the button, which essentially says set the opposite theme to what it was presently after the click. We'll talk about the `isDark` function further.

```js
function isDark() {
  return document.documentElement.classList.contains("theme-dark");
}
```

Lastly the function `isDark` as the name suggests, returns true if the page is in dark theme, else false. Internally, at the code level it is checking if our html has the class 'theme-dark' or not.

##### CSS Implementation

The visual representation of the theme is controlled through CSS, utilizing CSS custom properties (also known as CSS variables) for dynamic style switching:

We have added the event listener to our button for adding or removing class `theme-dark` from the html element but haven't relfected a change on the page physically. To acheive this we have to use css styles conditionally on the `theme-dark` class. Our CSS file looks like this:

```css
:root {
  --gray-999: #ffffff;
}

:root.theme-dark {
  --gray-999: #090b11;
}

body {
  background-color: var(--gray-999);
}

/* button styles */
.theme-label {
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
}
```

root targets the html element of the page. Be preference, our logic says light theme means applying styles to `:root` and dark theme means applying styles to the same element but an added class of `theme-dark`.

We are using custom css styles in it which are just colors keeping in mind what color scheme should be shown light vs dark. To show all this on the web page, all we need to do is apply the color `---gray-999` to the background color of our body. This makes the class logic we wrote in our JS file complete and visible in our page.

##### Enhanced Styling

Additionally, we need CSS implementation to provide visual feedback on the current theme state.

As of right now, if we click the button in our page it will toggle the theme of the page but there is no indicator to know which theme is currently applied. This creates a poor user interface experience.

<br>
The visual indication of the button's state is accomplished through CSS styling.

Updated css file will look like:

```css
:root {
  --gray-0: #090b11;
  --gray-200: #3d4663;
  --gray-999: #ffffff;
  --accent-regular: #9fd3c7;
}

:root.theme-dark {
  --gray-0: #ffffff;
  --gray-200: #c3cadb;
  --gray-999: #090b11;
  --accent-regular: #9fd3c7;
}

body {
  background-color: var(--gray-999);
  color: var(--gray-200);
}

button {
  display: flex;
  padding: 0;
  cursor: pointer;
}

.theme-label {
  z-index: 1;
  position: relative;
  display: flex;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
}

.theme-label.light::before {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background-color: var(--accent-regular);
}

html.theme-dark .theme-label.light::before {
  transform: translateX(100%);
}
```

We've added some additional custom css variable colors and styled the button component and it's inner elements. Let's break them down

```cs
button {
  display: flex;
  padding: 0;
  cursor: pointer;
}
```

`display: flex` This makes the button element of flexible length.
<br>
We also want the button to have no padding, this removes any default padding being applied to the element.
The `cursor: pointer;` CSS property changes the mouse cursor to a hand icon when hovering over an element, signaling the users that it's clickable or interactive.

```css
.theme-label {
  z-index: 1;
  position: relative;
  display: flex;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
}
```

Above code targets both the span elements inside the button to be styled.

`z-index: 1` ensures the labels appear above other elements with lower z-index value where we'll make another element further in the code.<br>
`position: relative` establishes a positioning context for absolute positioning of child elements.<br>
`display: flex` creates a flex container, allowing for easier positioning of the content<br>
`padding: 0.5rem` adds internal spacing.<br>
`width: 2rem` and height: 2rem set fixed dimensions, creating a square shape.<br>
`font-size: 1rem` defines the text size within the label.

```css
.theme-label.light::before {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background-color: var(--accent-regular);
}
```

This CSS block creates a pseudo-element for the light span element. <br><br>
`content: ""` makes the pseudo element empty but visible if given any background color.
`z-index: -1` positions it behind the main content, so that we can see the span element text.
`position: absolute and inset: 0` expands the pseudo-element to occupy the full dimensions of its parent element.
`background-color: var(--accent-regular)` sets its background color using the CSS variable defined in the `:root` classes.

By this we have shown a background color to the light text span, when the theme is in light mode. The opposite for the dark theme is incomplete.

```css
html.theme-dark .theme-label.light::before {
  transform: translateX(100%);
}
```

This CSS rule applies a transformation to the pseudo-element (`::before`) of light span make in the previous code block only when the `html` element has the class theme-dark.

`transform: translateX(100%)` shifts the pseudo-element horizontally by 100% of its own width to the right.

Creating a visual toggle effect between light and dark themes. As the theme changes, the visible indicator switches between the light and dark positions on the button.

Lastly we want `localStorage` to be used, say when the page is opened for the first time and no theme is selected by default. We will add this code in our JavaScript file. Essentially, we want this code to be running the first, before our present JavaScript toggle & event listening functions. <br>
Our updated JavaScript file would look like this:

```js
function onLoadThemeInit() {
  const getThemePreference = () => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };
  const isDark = getThemePreference() === "dark";
  document.documentElement.classList[isDark ? "add" : "remove"]("theme-dark");

  if (typeof localStorage !== "undefined") {
    // Watch the document element and persist user preference when it changes.
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("theme-dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
}

function setThemeEvents() {
  // ----- event click logic ------
  const button = document.querySelector("button");

  /** Set the theme to dark/light mode. */
  const setTheme = (dark) => {
    document.documentElement.classList[dark ? "add" : "remove"]("theme-dark");
    button.setAttribute("aria-pressed", String(dark));
  };

  // Toggle the theme when a user clicks the button.
  button.addEventListener("click", () => setTheme(!isDark()));

  // Initialize button state to reflect current theme.
  setTheme(isDark());

  function isDark() {
    console.log(document.documentElement.classList.contains("theme-dark"));
    return document.documentElement.classList.contains("theme-dark");
  }
}

onLoadThemeInit();
setThemeEvents();
```

We'll focus on the highlighted code, as we've explained the remaining code above.
The script code above implements theme preference handling using localStorage.

**NOTE**: We have enclosed the previous js code in the function `setThemeEvents` handling the listeners & the new code in a `onLoadThemeInit` function. Since we want the load theme logic to run before the listener, we'll call them accordingly. If we don't do this, there'll be multiple function declarations for `isDark` which changes the intended behaviour.

The `getThemePreference()` function: Checks if localStorage is available and contains a 'theme' item. If not, it falls back to the system preference using `window.matchMedia()`.

`const isDark = getThemePreference() === 'dark';` checks if the theme is dark through the function defined above & adds the class `theme-dark` to html through
`document.documentElement.classList[isDark ? 'add' : 'remove']('theme-dark');`

Lastly,

```js
if (typeof localStorage !== "undefined") {
  // Watch the document element and persist user preference when it changes.
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains("theme-dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}
```

sets up a MutationObserver to watch for changes to the root element of the document or `html`. When the 'theme-dark' class is added or removed, it updates the theme preference in localStorage.

This build us a dark theme toggle button using localStorage where the theme will not loose it's state on a refresh.
<br>

#### For testing:

<iframe src="https://codesandbox.io/p/devbox/dark-theme-toggle-dxr57q?embed=1&file=%2Fpackage.json"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="dark-theme-toggle"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
