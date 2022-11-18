import {
  BannerBlock,
  CardBlock,
  ContentBlock,
  Podcast,
} from 'components';

export const getComponent = (component, cards, filteredCards, onCardSubmit) => {
  switch (component.sys.contentType.sys.id) {
    case "bannerBlock":
      return <BannerBlock key={component.sys.contentType.sys.id} bannerBlock={component} />;
    case "cardBlock":
      return <CardBlock key={component.sys.contentType.sys.id} cardBlock={component} {...{ cards, filteredCards, onCardSubmit }} />;
    case "contentBlock":
      return <ContentBlock key={component.sys.contentType.sys.id} contentBlock={component} />;
    case "featuretteBlock":
      return <Podcast key={component.sys.contentType.sys.id} featuretteBlock={component} />;
    default:
      return null;
  }
};
