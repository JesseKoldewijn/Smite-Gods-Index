'use client';

import { useEffect, useState } from 'react';

import { GodsList } from '../list';
import { getGodsListerPageData, godsListerDefaultValue } from './data';

const GodsListerPage = ({
  buildTimeDefaultValue,
}: {
  buildTimeDefaultValue?: typeof godsListerDefaultValue;
}) => {
  const [isLoading, setIsLoading] = useState(!buildTimeDefaultValue);
  const [{ gods, godsResponseMeta }, setData] = useState<
    Awaited<ReturnType<typeof getGodsListerPageData>>
  >(buildTimeDefaultValue ?? godsListerDefaultValue);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGodsListerPageData();
      setData(data);
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <div className="my-auto flex min-h-screen w-full flex-col items-center justify-center pt-40">
        <span className="-mt-40">Loading...</span>
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div>
        <p>
          Total Gods: {godsResponseMeta.pagination?.total} | Page:{' '}
          {godsResponseMeta.pagination?.page} | Page Size: {godsResponseMeta.pagination?.pageSize}
        </p>
      </div>
      <GodsList
        gods={{
          data: gods,
          meta: godsResponseMeta,
        }}
        instantMount={!!buildTimeDefaultValue}
      />
    </div>
  );
};

export default GodsListerPage;
