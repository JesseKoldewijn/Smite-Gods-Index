import GodsListerPage from '../components/gods/listerpage';
import { getGodsListerPageData } from '../components/gods/listerpage/data';

const GodsPage = async () => {
  const buildTimeDefaultValue = await getGodsListerPageData();

  return (
    <>
      <title>Gods - Smite2Dex | Jereko</title>
      <meta
        name="description"
        content="Smite 2 Gods - An overview of all the currently playable gods in Smite 2."
      />
      <div className="my-auto flex w-full flex-col items-center pt-30">
        <h1 className="text-4xl font-bold tracking-tight">Smite 2 Gods</h1>
        <GodsListerPage buildTimeDefaultValue={buildTimeDefaultValue} />
      </div>
    </>
  );
};

export default GodsPage;

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
