import { useEffect } from "react"

export function useDetectClick(
  ref: React.RefObject<HTMLElement>,
  cb: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb()
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (ref.current && event.key === "Escape") {
        cb()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [ref, cb])
}
