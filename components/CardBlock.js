import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import parse from 'html-react-parser';
import { richTextOptions } from "utils";
import Image from "next/image";

const CardBlock = ({ cardBlock, cards }) => {
  const output = cardBlock.fields.cards.map(({ sys }) => {
    const card = cards.find((item) => item.sys.id === sys.id);
    return (
      <article key={sys.id}>
        <a href="#" className="image">
          <Image
            src={`https:${card.fields.image.fields.file.url}`}
            height={card.fields.image.fields.file.details.image.height}
            width={card.fields.image.fields.file.details.image.width}
          />
        </a>
        <h3 className="major">{card.fields.sectionTitle}</h3>
        {parse(documentToHtmlString(card.fields.content, richTextOptions))}
      </article>
    );
  });
  return (
    <section id={cardBlock.fields.sectionLink} className="wrapper alt style1">
      <div className="inner">
        <h2 className="major">{cardBlock.fields.sectionTitle}</h2>
        <section className="card">{output}</section>
      </div>
    </section>
  );
};

export default CardBlock;
