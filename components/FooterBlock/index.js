import classNames from 'classnames';
import { footerColumns } from './constants';
import style from './FooterBlock.module.scss';
import { useMediaQuery } from 'utils/useMediaQuery';

const FooterBlock = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <section id="footer" className={style.footer}>
      <div className="inner">
        <div className={isMobile ? style.block : style.flex}>
          {footerColumns.map(column => (
            <div key={column.title} className={classNames(style['footer-column'], {

            })}>
              <h4 className={style['footer-column-title']}>{column.title}</h4>
              {column.links.map(link => (
                <h5 key={link.text}>
                  <a href={link.href}>{link.text}</a>
                </h5>
              ))}
            </div>
          ))}
          <div className={style['footer-column']}>
              <h4 className={style['footer-column-title']}>Subscribe</h4>
              <div className={style['footer-subscribe']}>
                <input type="email" className={style['footer-subscribe-input']} placeholder="Email address" disabled />
                <button type="button" className={style['footer-subscribe-button']} disabled>Coming soon!</button>
              </div>
            </div>
        </div>
        <div className={style['footer-divider']} />
      </div>
    </section>
  );
};

export default FooterBlock;
