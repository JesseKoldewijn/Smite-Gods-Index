import { getGodsListerPageData } from '../../components/gods/listerpage/data';
import { GodsPageBySlug } from '../../components/gods/pageBySlug/enhanced';
import { getGodSlug } from '../../logic/gods/utils/slug';

const GodPage = async ({ godSlug }: { godSlug: string }) => {
  const { data } = await getData(godSlug);

  return <GodsPageBySlug rawGodsData={data} />;
};

export default GodPage;

const getData = async (slug: string) => {
  const godsData = await getGodsListerPageData();

  const god = godsData.gods.find((god) => getGodSlug(god?.attributes?.Name) === slug);

  return {
    data: god!,
  };
};

export const getConfig = async () => {
  const godsData = await getGodsListerPageData();
  return {
    render: 'static',
    staticPaths: godsData.gods.map((god) => getGodSlug(god?.attributes?.Name)),
  };
};
