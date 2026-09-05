import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { useI18n } from "@lib/i18n/provider"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder, defaultValue, className, children, ...props },
    ref
  ) => {
    const { t } = useI18n()
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            "relative flex items-center text-sm border border-line bg-white rounded-base hover:border-ink-muted focus-within:border-ink transition-colors duration-200",
            className,
            {
              "text-ink-muted": isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            {...props}
            className="appearance-none flex-1 bg-transparent border-none px-4 py-2.5 text-ink-soft transition-colors duration-150 outline-none cursor-pointer"
          >
            <option disabled value="">
              {placeholder || t("common.select")}
            </option>
            {children}
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none ">
            <ChevronUpDown />
          </span>
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
