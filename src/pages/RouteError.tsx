import { Link, isRouteErrorResponse, useRouteError } from "react-router"
import styles from "./NotFound.module.css"

function describeError(error: unknown): { code: string; title: string; text: string; detail?: string } {
  if (isRouteErrorResponse(error)) {
    return {
      code: String(error.status),
      title: error.status === 404 ? "Страница не найдена" : "Ошибка навигации",
      text:
        error.status === 404
          ? "Такой страницы не существует или она была удалена"
          : "Не удалось открыть страницу. Попробуйте обновить или вернуться на главную",
      detail: typeof error.data === "string" ? error.data : error.statusText || undefined,
    }
  }

  if (error instanceof Error) {
    return {
      code: "500",
      title: "Что-то пошло не так",
      text: "Страница не смогла загрузиться. Попробуйте обновить или вернуться на главную",
      detail: import.meta.env.DEV ? error.message : undefined,
    }
  }

  return {
    code: "500",
    title: "Что-то пошло не так",
    text: "Страница не смогла загрузиться. Попробуйте обновить или вернуться на главную",
  }
}

function RouteError() {
  const error = useRouteError()
  const { code, title, text, detail } = describeError(error)

  if (import.meta.env.DEV) {
    console.error("Ошибка маршрута:", error)
  }

  return (
    <div className={styles.page}>
      <p className={styles.code}>{code}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      {detail && <pre className={styles.detail}>{detail}</pre>}
      <div className={styles.actions}>
        <Link className={styles.link} to="/">На главную</Link>
        {/* Полная перезагрузка, а не navigate(): если сломался сам роутер,
            восстановление не должно зависеть от него. */}
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => window.location.reload()}>
          Обновить
        </button>
      </div>
    </div>
  )
}

export default RouteError
