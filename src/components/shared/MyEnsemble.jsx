import style from "./MyEnsemble.module.css";

export default function MyEnsemble({ name, genre, link }) {
  return (
    <>
      <div className={style.card}>
        <div>
          <h1 className={style.title}>{name}</h1>
          <div className={style.genre}> &#127925; {genre}</div>
          <div className={style.spans}>
            <a href="ensemble.link">{link}</a>
          </div>
        </div>
      </div>
    </>
  );
}
