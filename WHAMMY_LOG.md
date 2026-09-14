# Whammy Log

Here are a few problems I ran into while building Flashcard-o-matic and how I fixed them.

## 1. The first test was still from the starter project

### The problem

One of the original tests was still looking for the "learn react" link from Create React App. That link was no longer part of the project. The test also rendered `App` by itself, without a router.

### The cause

The test was never updated after the starter code was replaced. Since this app uses React Router, rendering `App` without a router caused the `useRoutes()` error.

### The solution

I changed the test to use `MemoryRouter` and check the app's real behavior instead. It now visits an unknown URL and checks that the `Not Found` page appears.

## 2. The form fields needed values before the API finished loading

### The problem

The Edit Deck and Edit Card pages get their information from the API. At first, the fields did not have data yet. If their values were left as `undefined`, React could complain when the fields later received real values.

### The cause

The page renders before the API request finishes. That meant the inputs could start without a value and then suddenly become controlled inputs when the response arrived.

### The solution

I started every field with an empty string. For example, the deck form starts with empty `name` and `description` values, and the card form starts with empty `front` and `back` values. The API data replaces those values later, so the inputs stay controlled the whole time.

## 3. Moving through the study cards was easy to get wrong

### The problem

The Study page needs to show the question first, reveal the answer after Flip, and then move to the next card. The last card also needs to ask whether the user wants to start again.

### The cause

The page has to remember two things: which card is showing and whether that card is flipped. If the flipped state is not reset, the next card can open on its answer. If the index keeps increasing after the last card, the page tries to display a card that does not exist.

### The solution

I kept the card number and flipped status in separate state values. Whenever the user moves to another card, I reset the flipped status. After the last card, the app asks whether to restart. Choosing restart goes back to the first card; choosing cancel returns to Home.
