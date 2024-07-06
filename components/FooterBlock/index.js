import classNames from 'classnames';
import { footerColumns, socials } from './constants';
import style from './FooterBlock.module.scss';
import { useMediaQuery } from 'utils/useMediaQuery';
import Image from 'next/image';

const FooterBlock = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <section id="footer" className={style.footer}>
      <div className="inner">
        <div className={isMobile ? style.block : style.flex}>
          {footerColumns.map(column => (
            <div
              key={column.title}
              className={classNames(style['footer-column'], {})}
            >
              <h4 className={style['footer-column-title']}>{column.title}</h4>
              {column.links.map(link => (
                <h5 key={link.text}>
                  <a href={link.href}>{link.text}</a>
                </h5>
              ))}
            </div>
          ))}
          <div className={style['footer-column']}>
            <h4 className={style['footer-column-title']}>
              Subscribe to our Newsletter for Updates
            </h4>
            <div className={style['footer-subscribe']}>
              <a
                href="https://subscribepage.io/Educators_Going_Global_Newsletter"
                style={{ margin: '0px auto' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  type="button"
                  className={style['footer-subscribe-button']}
                >
                  SIGN ME UP!
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className={style['footer-divider']} />
        <div className={style['footer-socials']}>
          {socials.map(link => (
            <a
              href={link.href}
              key={link.alt}
              target="_blank"
              rel="noopener noreferrer"
              className={style['footer-socials--button']}
            >
              <Image src={link.src} alt={link.alt} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterBlock;
