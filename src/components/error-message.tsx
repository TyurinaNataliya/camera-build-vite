import 'react-toastify/dist/ReactToastify.css';

function ErrorMessage(): JSX.Element {
  return (
    <div style={{ marginTop: 300, marginLeft: 400, marginBottom: 300 }}>
      <span>
        Упс.. Что-то с сервером. Наши разработчики уже решают эту проблему
      </span>
      <p>
        <span>
          Просим понять, простить и чуточку подождать, скоро всё заработает.
        </span>
      </p>
    </div>
  );
}
export { ErrorMessage };
