# Frame — Photo gallery

A small React photo gallery for the Celebrare frontend internship assignment. It fetches 30 photos from Picsum, filters them by author, and saves favourites in the browser.

## Run locally

Requires Node.js 20.19+ or 22.12+ and pnpm.

```sh
pnpm install
pnpm dev
```

Open the local URL printed in your terminal. To build and preview the production version:

```sh
pnpm build
pnpm preview
```

## Code layout

- `src/hooks/useFetchPhotos.js` fetches the photos and returns `photos`, `loading`, and `error`. It checks HTTP failures and cancels the request when the component unmounts.
- `src/components/Gallery.jsx` displays the loading, error, empty, and gallery states. Search matches author names without making another request.
- `src/components/PhotoCard.jsx` displays one photo, its author, and its favourite button.
- `src/reducers/favouritesReducer.js` handles the `toggle` action. It adds an ID if it is missing, or removes it if it is already saved.

Favourites use `useReducer` with a lazy initializer to read localStorage on the first render. An effect saves the IDs whenever they change. Invalid stored data falls back to an empty list; unavailable storage shows a message without stopping the gallery.

`useMemo` caches the filtered list until the photos or search text changes, so toggling a favourite does not filter the list again. `useCallback` keeps the search handler's function reference stable. Neither hook is necessary for correctness here: removing them would still leave a working search, and the performance difference for 30 photos is small.

Styling uses Tailwind CSS only. The grid has one column on mobile, two from 768px, and four from 1024px. There are no component libraries, API keys, or environment variables.

## Recording checklist

1. Show the loaded gallery, a matching author search, and a search with no matches.
2. Favourite a photo, refresh, and show that it is still selected. Unfavourite it too.
3. Walk through `useFetchPhotos`, including its loading state and error handling.
4. Explain the reducer's `toggle` action and how localStorage persistence works.
5. Explain the two memoization hooks, then describe a difficulty you actually encountered and how you solved it.

Upload your own five-minute walkthrough and submit its link with the public GitHub repository link, as requested in the assignment.
