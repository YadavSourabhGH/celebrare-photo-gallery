import { useState } from 'react';
import HeartIcon from './HeartIcon';

export default function PhotoCard({ photo, isFavourite, onToggle }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <li className="group overflow-hidden rounded-xl border border-line bg-white transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none">
      <div className="aspect-[4/3] overflow-hidden bg-line/60">
        {imageFailed ? (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Photo unavailable
          </div>
        ) : (
          <img
            src={`https://picsum.photos/id/${photo.id}/640/480`}
            alt={`Photograph by ${photo.author}`}
            width="640"
            height="480"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0">
          <p className="mb-1 text-[11px] text-muted">Photograph by</p>
          <h2 className="truncate text-sm font-medium text-ink" title={photo.author}>
            {photo.author}
          </h2>
        </div>
        <button
          type="button"
          aria-label={`${isFavourite ? 'Remove from' : 'Add to'} favourites: photo ${photo.id} by ${photo.author}`}
          aria-pressed={isFavourite}
          onClick={() => onToggle(photo.id)}
          className={`flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
            isFavourite ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'text-muted hover:bg-canvas hover:text-rose-600'
          }`}
        >
          <HeartIcon filled={isFavourite} className="size-5" />
        </button>
      </div>
    </li>
  );
}
