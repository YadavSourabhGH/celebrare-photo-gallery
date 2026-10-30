export const STORAGE_KEY = 'frame-favourites';

export function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];
    default:
      return state;
  }
}
