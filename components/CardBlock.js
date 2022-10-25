import React, { useState } from "react";
import PropTypes from "prop-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import parse from "html-react-parser";
import { richTextOptions } from "utils";
import Image from "next/image";
import SearchBar from "./SearchBar";

const CardBlock = ({ cardBlock, cards, filteredCards, onCardSubmit }) => {
  const cardToHtml = (card) => (
    <article key={card.sys.id}>
      <span className="image">
        <Image
          src={`https:${card.fields.image.fields.file.url}`}
          height={card.fields.image.fields.file.details.image.height}
          width={card.fields.image.fields.file.details.image.width}
        />
      </span>
      <h3 className="major">{card.fields.sectionTitle}</h3>
      {parse(documentToHtmlString(card.fields.content, richTextOptions))}
    </article>
  );
  const output = !!filteredCards
    ? filteredCards.map((card) => cardToHtml(card))
    : cardBlock.fields.cards.map(({ sys }) =>
        cardToHtml(cards.find((item) => item.sys.id === sys.id))
      );
  return (
    <section id={cardBlock.fields.sectionLink} className="page-wrapper">
      <div className="inner">
        <h2 className="major">{cardBlock.fields.sectionTitle}</h2>
        <SearchBar variant="card" {...{ onCardSubmit }} />
        {!!filteredCards && <p>{`${filteredCards.length} ${filteredCards.length === 1 ? 'result' : 'results'}`}</p>}
        <section className="card">{output}</section>
      </div>
    </section>
  );
};

CardBlock.defaultProps = {
  filteredCards: [],
};

CardBlock.propTypes = {
  cardBlock: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  filteredCards: PropTypes.array,
  onCardSubmit: PropTypes.func.isRequired,
};

export default CardBlock;
