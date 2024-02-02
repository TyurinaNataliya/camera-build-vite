import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TypeProductReview } from '../../../type-data/type';
import { useAppDispatch } from '../../../hooks/store';
import { postReviewProduct } from '../../../services/thunk/post-review-product';
import { fetchReviewsProductAction } from '../../../services/thunk/fetch-reviews-product';
import {
  MAX_COUNT_LETTERS_INPUT,
  MAX_COUNT_LETTERS_NAME,
  MIN_COUNT_LETTERS_INPUT,
  MIN_COUNT_LETTERS_NAME,
  RatingMap,
} from '../../../const';
import { fetchProductAction } from '../../../services/thunk/fetch-product';

type Props = {
  handleCloseModalReview?: () => void;
  idProduct: number;
  handleActiveModalReviewSucces?: () => void;
};

function ModalAddReview({
  handleCloseModalReview,
  idProduct,
  handleActiveModalReviewSucces,
}: Props): JSX.Element {
  const [ratingStars, setRatingStars] = useState<string>('');
  const [reviewName, setreviewName] = useState<string>('');
  const [reviewAdvantages, setReviewAdvantages] = useState<string>('');
  const [reviewDisadvantages, setReviewDisadvantages] = useState<string>('');
  const [reviewCommentary, setReviewCommentary] = useState<string>('');
  const dispatch = useAppDispatch();

  function ratingChangeHandle(evt: ChangeEvent<HTMLInputElement>) {
    setRatingStars(evt.target.value);
  }
  function nameChangeHandle(evt: ChangeEvent<HTMLInputElement>) {
    setreviewName(evt.target.value);
  }
  function advantagesChangeHandle(evt: ChangeEvent<HTMLInputElement>) {
    setReviewAdvantages(evt.target.value);
  }
  function disadvantagesChangeHandle(evt: ChangeEvent<HTMLInputElement>) {
    setReviewDisadvantages(evt.target.value);
  }
  function commentaryChangeHandle(evt: ChangeEvent<HTMLTextAreaElement>) {
    setReviewCommentary(evt.target.value);
  }
  function resetForm() {
    setRatingStars('');
    setreviewName('');
    setReviewAdvantages('');
    setReviewDisadvantages('');
    setReviewCommentary('');
  }
  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const review: TypeProductReview = {
      rating: Number(ratingStars),
      userName: reviewName,
      advantage: reviewAdvantages,
      disadvantage: reviewDisadvantages,
      review: reviewCommentary,
      cameraId: idProduct,
    };
    dispatch(postReviewProduct({ reviewData: review, productId: idProduct }));
    dispatch(fetchReviewsProductAction(Number(idProduct)));
    dispatch(fetchProductAction(Number(idProduct)));
    resetForm();
    handleCloseModalReview?.();
    handleActiveModalReviewSucces?.();
  }

  const isInvalidInputs = (nameInput: string) =>
    nameInput.length < MIN_COUNT_LETTERS_INPUT ||
    nameInput.length > MAX_COUNT_LETTERS_INPUT;

  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModalReview?.();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [handleCloseModalReview]);

  return (
    <div
      className="modal is-active"
      onMouseDown={(event) => {
        if (modalRef.current && event.target === modalRef.current) {
          handleCloseModalReview?.();
        }
      }}
      tabIndex={0}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={modalRef}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {Object.entries(RatingMap)
                        .reverse()
                        .map(([key, title]) => (
                          <Fragment key={key}>
                            <input
                              onChange={ratingChangeHandle}
                              className="visually-hidden"
                              id={`star-${key}`}
                              name="rate"
                              type="radio"
                              checked={key === ratingStars}
                              value={key}
                            />
                            <label
                              className="rate__label"
                              htmlFor={`star-${key}`}
                              title={title}
                            />
                          </Fragment>
                        ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">
                        {ratingStars ? ratingStars : 0}
                      </span>
                      <span>/</span>
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                {reviewName === '' ? (
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">
                        Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-name"
                        minLength={MIN_COUNT_LETTERS_NAME}
                        maxLength={MAX_COUNT_LETTERS_NAME}
                        onChange={nameChangeHandle}
                        value={reviewName}
                        placeholder="Введите ваше имя"
                        required
                        autoFocus
                        data-testid="user-name"
                      />
                    </label>
                    <p className="custom-input__error">Нужно указать имя</p>
                  </div>
                ) : (
                  <div
                    className={
                      (reviewName &&
                        reviewName.length < MIN_COUNT_LETTERS_NAME) ||
                      reviewName.length > MAX_COUNT_LETTERS_NAME
                        ? 'custom-input form-review__item is-invalid input'
                        : 'custom-input form-review__item  input'
                    }
                  >
                    <label>
                      <span className="custom-input__label">
                        Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-name"
                        minLength={MIN_COUNT_LETTERS_NAME}
                        maxLength={MAX_COUNT_LETTERS_NAME}
                        onChange={nameChangeHandle}
                        value={reviewName}
                        placeholder="Введите ваше имя"
                        required
                        data-testid="user-name"
                      />
                    </label>
                    <p className="custom-input__error">Нужно указать имя</p>
                  </div>
                )}

                {reviewAdvantages === '' ? (
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">
                        Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-plus"
                        minLength={MIN_COUNT_LETTERS_INPUT}
                        maxLength={MAX_COUNT_LETTERS_INPUT}
                        onChange={advantagesChangeHandle}
                        value={reviewAdvantages}
                        placeholder="Основные преимущества товара"
                        required
                        data-testid="user-advantages-product"
                      />
                    </label>
                    <p className="custom-input__error">
                      Нужно указать достоинства
                    </p>
                  </div>
                ) : (
                  <div
                    className={
                      isInvalidInputs(reviewAdvantages)
                        ? 'custom-input form-review__item is-invalid input'
                        : 'custom-input form-review__item input'
                    }
                  >
                    <label>
                      <span className="custom-input__label">
                        Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-plus"
                        minLength={MIN_COUNT_LETTERS_INPUT}
                        maxLength={MAX_COUNT_LETTERS_INPUT}
                        onChange={advantagesChangeHandle}
                        value={reviewAdvantages}
                        placeholder="Основные преимущества товара"
                        required
                        data-testid="user-advantages-product"
                      />
                    </label>
                    <p className="custom-input__error">
                      Нужно указать достоинства
                    </p>
                  </div>
                )}
                {reviewDisadvantages === '' ? (
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">
                        Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-minus"
                        minLength={MIN_COUNT_LETTERS_INPUT}
                        maxLength={MAX_COUNT_LETTERS_INPUT}
                        onChange={disadvantagesChangeHandle}
                        value={reviewDisadvantages}
                        placeholder="Главные недостатки товара"
                        required
                      />
                    </label>
                    <p className="custom-input__error">
                      Нужно указать недостатки
                    </p>
                  </div>
                ) : (
                  <div
                    className={
                      isInvalidInputs(reviewDisadvantages)
                        ? 'custom-input form-review__item is-invalid input'
                        : 'custom-input form-review__item input'
                    }
                  >
                    <label>
                      <span className="custom-input__label">
                        Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="user-minus"
                        minLength={MIN_COUNT_LETTERS_INPUT}
                        maxLength={MAX_COUNT_LETTERS_INPUT}
                        onChange={disadvantagesChangeHandle}
                        value={reviewDisadvantages}
                        placeholder="Главные недостатки товара"
                        required
                      />
                    </label>
                    <p className="custom-input__error">
                      Нужно указать недостатки
                    </p>
                  </div>
                )}
                {reviewCommentary === '' ? (
                  <div className="custom-textarea form-review__item">
                    <label>
                      <span className="custom-textarea__label">
                        Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea
                        name="user-comment"
                        minLength={MIN_COUNT_LETTERS_INPUT}
                        maxLength={MAX_COUNT_LETTERS_INPUT}
                        onChange={commentaryChangeHandle}
                        value={reviewCommentary}
                        placeholder="Поделитесь своим опытом покупки"
                        required
                      />
                    </label>
                    <div className="custom-textarea__error">
                      Нужно добавить комментарий
                    </div>
                  </div>
                ) : (
                  <div
                    className={
                      isInvalidInputs(reviewCommentary)
                        ? 'custom-textarea form-review__item is-invalid textarea'
                        : 'custom-textarea form-review__item is-valid textarea'
                    }
                  >
                    <label>
                      <span className="custom-textarea__label">
                        Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea
                        name="user-comment"
                        minLength={MIN_COUNT_LETTERS_INPUT}
                        maxLength={MAX_COUNT_LETTERS_INPUT}
                        onChange={commentaryChangeHandle}
                        value={reviewCommentary}
                        placeholder="Поделитесь своим опытом покупки"
                        required
                      />
                    </label>
                    <div className="custom-textarea__error">
                      Нужно добавить комментарий
                    </div>
                  </div>
                )}
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={ratingStars === ''}
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseModalReview}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export { ModalAddReview };
