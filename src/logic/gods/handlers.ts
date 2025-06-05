import { SMITE2_GODS_ENDPOINT, SMITE2_GODS_ENDPOINT_PARAMS } from './constants';
import { GodsResponse } from './types/god';

interface GetGodsParams {
  page?: number;
  pageSize?: number;
  lng?: string;
  di?: {
    fetcher: (params: { url: string; requestInit?: RequestInit }) => Promise<{
      data: GodsResponse | null;
      error: Error | null;
    }>;
  };
}

const fetchGods = async ({ url, requestInit }: { url: string; requestInit?: RequestInit }) => {
  try {
    const res = await fetch(url, requestInit);
    if (!res.ok) {
      throw new Error(`Error fetching gods: ${res.statusText}`);
    }
    return {
      data: await res.json(),
      error: null,
    } as {
      data: GodsResponse;
      error: null;
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    } as {
      data: null;
      error: Error;
    };
  }
};

export const getGods = async ({
  page = 1,
  pageSize = 900,
  lng = 'en-US',
  di = {
    fetcher: fetchGods,
  },
}: GetGodsParams) => {
  const urlBase = new URL(SMITE2_GODS_ENDPOINT);

  urlBase.searchParams.append('lng', lng);
  urlBase.searchParams.append('pagination[page]', page.toString());
  urlBase.searchParams.append('pagination[pageSize]', pageSize.toString());

  const defaultParams = Object.entries(SMITE2_GODS_ENDPOINT_PARAMS.default).filter(([key]) => {
    return !/lng|pagination\[page\]|pagination\[pageSize\]/.test(key);
  });

  for (const [key, value] of defaultParams) {
    urlBase.searchParams.append(key, `${value}`);
  }

  return await di.fetcher({
    url: urlBase.toString(),
    requestInit: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
};
