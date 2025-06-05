'use client';

import { Link } from 'waku';

import { useEffect, useState } from 'react';

import { GodsResponse } from '../../logic/gods/types/god';
import { getGodSlug } from '../../logic/gods/utils/slug';
import { sortGods } from '../../logic/gods/utils/sort';
import { GodProfile } from './profile';

interface GodsListProps {
  gods: GodsResponse;
}

export const GodsList = ({
  gods: ssrGods,
  instantMount = false,
}: GodsListProps & {
  gods: GodsResponse;
  instantMount?: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(instantMount);
  const [show, setShow] = useState({
    showAttributes: {
      pantheon: true,
    },
  });

  const gods = sortGods(ssrGods.data, {
    sortBy: 'Name',
    sortOrder: 'asc',
  });

  const [amountLimit, setAmountLimit] = useState(12);

  const [limitedGods, setLimitedGods] = useState(() => gods.slice(0, amountLimit));

  const handleLimit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.target as HTMLButtonElement;
    const isButton = target.tagName === 'BUTTON';

    let currentTarget = target;
    if (!isButton) {
      currentTarget = target.closest('button') as HTMLButtonElement;
    }
    const all = currentTarget.getAttribute('data-trigger-get-all') === 'true';

    if (all === true) {
      setLimitedGods(gods);
      setAmountLimit(gods.length);
      return;
    }

    const newAmount = limitedGods.length + 12;
    const reachedLimit = newAmount >= gods.length;

    if (reachedLimit) {
      setLimitedGods(gods);
      setAmountLimit(gods.length);
      return;
    }

    setAmountLimit(newAmount);
    setLimitedGods(gods.slice(0, newAmount));
  };

  useEffect(() => {
    const showAllQuery = new URLSearchParams(window.location.search).get('showAll');
    if (showAllQuery === 'true') {
      setLimitedGods(gods);
      setAmountLimit(gods.length);
    }
    setShow((prev) => ({
      ...prev,
      showAttributes: {
        ...prev.showAttributes,
        pantheon: true,
      },
    }));
    setTimeout(() => {
      setIsMounted(true);
    }, 200);
  }, []);

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center pb-10"
      style={{
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 py-5 sm:gap-4">
        {limitedGods.map((god) => {
          if (!god) return null;
          return (
            <Link key={god.id} to={`/god/${getGodSlug(god.attributes.Name)}`}>
              <GodProfile
                god={god}
                show={{
                  pantheon: show.showAttributes.pantheon,
                }}
              />
            </Link>
          );
        })}

        <div className="bg-background text-foreground fixed bottom-5 left-3 rounded-md border p-2">
          <span className="sr-only">
            Showing now {limitedGods.length} of {gods.length} gods
          </span>
          {limitedGods.length} / {gods.length} gods
        </div>

        <button
          className="bg-background text-foreground fixed right-3 bottom-25 flex max-h-20 max-w-20 cursor-pointer flex-col rounded-md border p-2 disabled:pointer-events-none"
          onClick={handleLimit}
          disabled={limitedGods.length >= gods.length}
          style={{
            display: limitedGods.length >= gods.length ? 'none' : '',
          }}
          data-trigger-get-all="true"
        >
          <div className="flex max-h-20 max-w-20 flex-col">
            <span className="sr-only">Show all gods</span>
            <span className="max-w-10">Load All</span>
          </div>
        </button>

        <button
          className="bg-background text-foreground fixed right-3 bottom-5 flex max-h-20 max-w-20 cursor-pointer flex-col rounded-md border p-2 disabled:pointer-events-none"
          onClick={handleLimit}
          disabled={limitedGods.length >= gods.length}
        >
          <div
            style={{
              display: limitedGods.length >= gods.length ? 'none' : '',
            }}
            className="flex max-h-20 max-w-20 flex-col"
          >
            <span className="sr-only">Show more gods</span>
            <span className="max-w-10">Load More</span>
          </div>
          <div
            style={{
              display: limitedGods.length >= gods.length ? '' : 'none',
            }}
            className="flex max-h-20 max-w-20 flex-col"
          >
            <span className="sr-only">Showing all available gods</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="checkmark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="22"
              height="22"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
