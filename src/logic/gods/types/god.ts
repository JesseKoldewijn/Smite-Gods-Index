import { Pantheon } from './pantheons';

export type God = {
  id: number;
  attributes: GodAttibutes;
};

export type GodsResponse = {
  data: God[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

interface GodAttibutes {
  Name: string;
  isNew: boolean;
  slug: string;
  Subtitle: string;
  Lore: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  LoreYouTubeLink: string | null;
  Blurb: any;
  Ability: GodAbility[];
  difficulty: {
    data: any;
  };
  HeaderImage: GodHeaderImage;
  pantheon: Pantheon;
  Portrait: {
    data: GodPortrait;
  };
  roles: {
    data: GodRole[];
  };
  Skin: GodSkin[];
  type: GodType;
  CommunityGuide: GodCommunityGuide[];
}

type GodAbility = {
  id: number;
  Name: string;
  Slot: string;
  Description: string;
  YouTubeLink: string;
  Buffs: any;
  Icon: {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: any;
        caption: any;
        width: 128;
        height: 128;
        formats: any;
        hash: string;
        ext: string;
        mime: string;
        size: 12;
        url: string;
        previewUrl: any;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type GodHeaderImage = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: null;
      caption: null;
      width: number;
      height: number;
      formats: {
        [key in 'thumbnail' | 'large' | 'medium' | 'small']: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          path: any;
          width: number;
          height: number;
          size: number;
          sizeInBytes: number;
          url: string;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: null;
      provider: string;
      provider_metadata: null;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type GodPortrait = {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: string;
    url: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
};

type GodRole = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    localizations: { data: any[] };
    Image: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          formats: {
            thumbnail: {
              name: string;
              hash: string;
              ext: string;
              mime: string;
              path: string | null;
              width: number;
              height: number;
              size: number;
              url: string;
            };
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: any;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
};

type GodSkinImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
};

type GodSkin = {
  id: number;
  Name: string;
  Class: string;
  Image: {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
          small?: GodSkinImageFormat;
          large?: GodSkinImageFormat;
          thumbnail?: GodSkinImageFormat;
          medium?: GodSkinImageFormat;
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type GodType = {
  data: any;
};

type GodCommunityGuide = {
  id: number;
  caption?: string;
  URL?: string;
  extPreviewThumbnail?: {
    url: string;
  };
};
