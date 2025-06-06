import type { God } from '../../../logic/gods/types/god';
import { connect } from '../../../logic/utils/connect';
import { GodsPageBySlugModel } from './logic/model';
import { Dummy_GodsPageBySlug } from './ui';

const mapIncomingPropsToPassthroughProps = ({ rawGodsData }: { rawGodsData: God }) => {
  const title = GodsPageBySlugModel.getTitle(rawGodsData);
  const truncedLore = GodsPageBySlugModel.getTruncedLore(rawGodsData);

  return {
    title,
    truncedLore,
    gods: rawGodsData,
  };
};

const mapDispatchToProps = () => {
  return {
    dispatch: () => {},
  };
};

const GodsPageBySlugEnhanced = connect(
  mapIncomingPropsToPassthroughProps,
  mapDispatchToProps
)(Dummy_GodsPageBySlug);

export { GodsPageBySlugEnhanced as GodsPageBySlug };
