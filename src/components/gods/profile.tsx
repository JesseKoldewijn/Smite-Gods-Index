import type { God } from '../../logic/gods/types/god';
import { cn } from '../../logic/utils/cn';

interface GodProfileProps {
  god: God;
  isCard?: boolean;
  show?: {
    pantheon?: boolean;
    abilities?: boolean;
    lore?: boolean;
  };
}

export const GodProfile = ({ god, isCard = true, show = {} }: GodProfileProps) => {
  if (!god) return null;
  if (!god.attributes) return null;

  const {
    lore: showLore = false,
    abilities: showAbilities = false,
    pantheon: showPantheon = false,
  } = show;

  const { Name, Subtitle, Lore, Portrait, pantheon, Ability } = god.attributes;

  return (
    <div
      className={cn('flex gap-2', {
        'h-screen max-h-[580px] w-max min-w-0 border p-4': isCard,
        'w-full flex-col': !isCard,
      })}
    >
      <div
        className={cn('flex', {
          'flex-col items-center justify-between gap-4 sm:flex-row': !isCard,
          'flex-col items-start gap-1': isCard,
        })}
      >
        <div
          className={cn('flex flex-col', {
            'w-full gap-1 text-center': isCard,
            'items-start gap-2': !isCard,
          })}
        >
          <strong>{Name}</strong>
          <i>{Subtitle}</i>
        </div>

        <div
          className={cn('flex flex-col items-center gap-2', {
            'w-full': isCard,
            'w-auto pb-10': !isCard,
          })}
        >
          {Portrait?.data.attributes.url && (
            <img
              src={Portrait.data.attributes.url}
              alt={`${Name} portrait`}
              height={Portrait.data.attributes.height ?? 200}
              width={Portrait.data.attributes.width ?? 200}
              className="rounded-md pt-1"
              loading="lazy"
            />
          )}

          {showPantheon && (
            <div className="mx-auto flex h-full items-center gap-2 pt-1">
              {pantheon?.data?.attributes?.Image?.data?.attributes?.url && (
                <img
                  src={pantheon.data.attributes.Image.data.attributes.url}
                  alt={`${pantheon.data.attributes.Name} icon`}
                  width={pantheon.data.attributes.Image.data.attributes.width}
                  height={pantheon.data.attributes.Image.data.attributes.height}
                  className="h-8 w-auto rounded-md"
                />
              )}
              {pantheon?.data?.attributes?.Name && <span>{pantheon.data.attributes.Name}</span>}
            </div>
          )}
        </div>
      </div>

      {showLore && (
        <div className="flex flex-col gap-2 pb-4" dangerouslySetInnerHTML={{ __html: Lore }} />
      )}

      <GodProfileAbilities godAbilities={Ability} show={showAbilities} />
    </div>
  );
};

const GodProfileAbilities = ({
  godAbilities,
  show = false,
}: {
  godAbilities: God['attributes']['Ability'];
  show?: boolean;
}) => {
  if (!godAbilities || !show) return null;

  return (
    <div>
      <strong>Abilities</strong>
      <div className="flex flex-col">
        {godAbilities &&
          Object.values(godAbilities).map((ability) => (
            <div key={ability.id} className="flex gap-2 border-t py-2">
              {ability.Icon?.data?.attributes.url && (
                <img
                  src={ability.Icon.data.attributes.url}
                  alt={`${ability.Name} icon`}
                  width={ability.Icon.data.attributes.width}
                  height={ability.Icon.data.attributes.height}
                  className="my-auto h-20 w-20 rounded-md border"
                  loading="lazy"
                />
              )}
              <div>
                <strong>
                  {ability.Slot} - {ability.Name}
                </strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: ability.Description,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
