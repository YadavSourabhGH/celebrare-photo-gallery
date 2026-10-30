import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, loadFavourites, STORAGE_KEY } from '../reducers/favouritesReducer';
import HeartIcon from './HeartIcon';
import PhotoCard from './PhotoCard';

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [favourites]);

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();
    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, search]);

  function toggleFavourite(id) {
    dispatch({ type: 'toggle', id });
  }

  return (
    <div className="min-h-screen bg-canvas font-sans text-ink antialiased">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" width="36" height="36" />
            <span className="font-display text-3xl tracking-tight">frame<span className="text-accent">.</span></span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted" aria-live="polite" aria-atomic="true">
            <HeartIcon className="size-4 text-accent" />
            <span><span className="font-semibold text-ink">{favourites.length}</span> {favourites.length === 1 ? 'favourite' : 'favourites'}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14 lg:px-10">
        <div className="mb-9 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">A collection of moments</p>
            <h1 className="font-display text-[40px] leading-tight tracking-tight sm:text-5xl">Photo gallery</h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">A little of everything. Find a photographer you like and save the moments that catch your eye.</p>
          </div>

          <div className="w-full lg:max-w-sm">
            <label htmlFor="search" className="mb-2 block text-xs font-medium text-ink">Search by photographer</label>
            <div className="relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                id="search"
                type="search"
                value={search}
                onChange={handleSearch}
                placeholder="Try a name, like Alejandro"
                autoComplete="off"
                className="h-12 w-full rounded-lg border border-line bg-white pl-11 pr-4 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-2 focus:outline-accent/15"
              />
            </div>
          </div>
        </div>

        {storageError && (
          <p role="alert" className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Your browser could not save favourites. They will only stay selected until you refresh.
          </p>
        )}

        {loading ? (
          <div role="status" className="flex min-h-80 flex-col items-center justify-center gap-4 text-sm text-muted">
            <span aria-hidden="true" className="size-8 animate-spin rounded-full border-2 border-line border-t-accent motion-reduce:animate-none" />
            Loading photos…
          </div>
        ) : error ? (
          <div role="alert" className="rounded-xl border border-line bg-white px-6 py-16 text-center">
            <h2 className="mb-2 font-display text-2xl">The gallery could not load</h2>
            <p className="text-sm leading-6 text-muted">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between gap-3 border-t border-line pt-5 text-xs text-muted">
              <p role="status" aria-atomic="true">
                <span className="font-semibold text-ink">{filteredPhotos.length}</span> {filteredPhotos.length === 1 ? 'photo' : 'photos'}{search.trim() ? ` of ${photos.length}` : ''}
              </p>
              <span>Click a heart to keep a favourite</span>
            </div>

            {filteredPhotos.length > 0 ? (
              <ul aria-label="Photo gallery" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {filteredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={favourites.includes(photo.id)}
                    onToggle={toggleFavourite}
                  />
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed border-line py-20 text-center">
                <h2 className="mb-2 font-display text-2xl">No photographers found</h2>
                <p className="px-5 text-sm text-muted">Try another name or clear your search to see all photos.</p>
              </div>
            )}
          </>
        )}

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-xs text-muted">
          <span>A few moments worth keeping.</span>
          <span>Photography from <a href="https://picsum.photos" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Lorem Picsum</a></span>
        </footer>
      </main>
    </div>
  );
}
