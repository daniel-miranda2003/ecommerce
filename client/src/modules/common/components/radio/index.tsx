import { clx } from "@modules/common/components/ui"

const Radio = ({ checked, 'data-testid': dataTestId }: { checked: boolean, 'data-testid'?: string }) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className="group relative flex h-5 w-5 items-center justify-center outline-none"
      data-testid={dataTestId || 'radio-button'}
    >
      <div
        className={clx(
          "flex h-[14px] w-[14px] items-center justify-center rounded-full border transition-all duration-200",
          checked
            ? "border-ink bg-ink"
            : "border-line bg-white hover:border-ink-muted",
          "group-disabled:opacity-40 group-disabled:cursor-not-allowed"
        )}
      >
        {checked && (
          <span className="flex items-center justify-center">
            <div className="rounded-full bg-white h-1.5 w-1.5" />
          </span>
        )}
      </div>
    </button>
  )
}

export default Radio
