import css from "./Options.module.css";

function Options({ total, update, reset }) {
  return (
    <div className={css.wrapper}>
      <button className={css.btn} onClick={() => update("good")} type="button">
        Good
      </button>
      <button
        className={css.btn}
        onClick={() => update("neutral")}
        type="button"
      >
        Neutral
      </button>
      <button className={css.btn} onClick={() => update("bad")} type="button">
        Bad
      </button>
      {total ? (
        <button className={css.btn} onClick={reset} type="button">
          Reset
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Options;
