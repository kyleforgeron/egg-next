export const richTextOptions = {
  renderNode: {
    "embedded-asset-block": (node) =>
      `<img className="content-image" src="${node.data.target.fields.file.url}"/>`,
  },
};