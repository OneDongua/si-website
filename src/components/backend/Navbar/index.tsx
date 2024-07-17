export default function Navbar() {
  return (
    <nav aria-label="主导航" className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <div className="navbar__items">
          <a className="navbar__brand" href="/backend">
            <div className="navbar__logo">
              <img src="/img/logo.png" alt="Logo" />
            </div>
            <b className="navbar__title text--truncate">后台管理</b>
          </a>
        </div>
        <div className="navbar__items navbar__items--right">
          <a className="navbar__item navbar__link" href="/">
            返回主页
          </a>
        </div>
      </div>
    </nav>
  );
}
