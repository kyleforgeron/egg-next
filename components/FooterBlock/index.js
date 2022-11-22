import { footerColumns } from './constants';
import style from './FooterBlock.module.scss';

const FooterBlock = () => {
  return (
    <section id="footer" className={style.footer}>
      <div className="inner" style={{ padding: '64px 0px' }}>
        <div className={style.flex}>
          {footerColumns.map(column => (
            <div key={column.title} className={style['footer-column']}>
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
              <div>
                <input type="email" className={style['footer-subscribe-input']} placeholder="Email address" />
                <button type="button" className={style['footer-subscribe-button']}>Subscribe</button>
              </div>
            </div>
        </div>
        <div className={style['footer-divider']} />
      </div>
    </section>
  );
};

export default FooterBlock;
