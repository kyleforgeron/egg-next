import {
  BannerBlock,
  CardBlock,
  ContentBlock,
  Card,
} from 'components';

export const getComponent = (pageTitle, component, cards, page, pageMeta) => {
  switch (component.sys.contentType.sys.id) {
    case "bannerBlock":
      return <BannerBlock key={component.sys.contentType.sys.id} bannerBlock={component} {...{ page, pageTitle, pageMeta }} />;
    case "cardBlock":
      return <CardBlock key={component.sys.contentType.sys.id} {...{ cards, pageTitle }} />;
    case "contentBlock":
      return <ContentBlock key={component.sys.contentType.sys.id} contentBlock={component} />;
    case "featuretteBlock":
      return <Card key={component.sys.contentType.sys.id} featuretteBlock={component} />;
    default:
      return null;
  }
};
