import './loading-style.css';

function LoadingComponent(): JSX.Element {
  return (
    <div style={{ marginTop: 300, marginLeft: 100, marginBottom: 300 }}>
      <div className="preloader-5"></div>
      <span style={{ marginLeft: '45%', marginBottom: 300 }}>
        Секундочку.. Загружаю...
      </span>
    </div>
  );
}
export { LoadingComponent };
