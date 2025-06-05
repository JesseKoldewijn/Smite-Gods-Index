import { God } from '../../../logic/gods/types/god';
import { GodProfile } from '../profile';

export const Dummy_GodsPageBySlug = ({
  title,
  truncedLore,
  gods,
}: {
  title: string;
  truncedLore: string;
  gods: God;
}) => {
  return (
    <div className="flex flex-col gap-4 pt-40 pb-20">
      <title>{title}</title>
      <meta name="description" content={truncedLore} />
      <div className="max-w-xl">
        <GodProfile
          god={gods}
          isCard={false}
          show={{
            pantheon: true,
            abilities: true,
            lore: true,
          }}
        />
      </div>
    </div>
  );
};
