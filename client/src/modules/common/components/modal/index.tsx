import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@modules/common/components/ui"
import React, { Fragment } from "react"

import { ModalProvider, useModal } from "@lib/context/modal-context"
import X from "@modules/common/icons/x"

type ModalProps = {
  isOpen: boolean
  close: () => void
  size?: "small" | "medium" | "large"
  search?: boolean
  children: React.ReactNode
  'data-testid'?: string
}

const Modal = ({
  isOpen,
  close,
  size = "medium",
  search = false,
  children,
  'data-testid': dataTestId
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[75]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-md h-screen" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={clx(
              "flex min-h-full justify-center p-4 text-center",
              {
                "items-center": !search,
                "items-start": search,
              }
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                data-testid={dataTestId}
                className={clx(
                  "flex flex-col justify-between w-full transform p-6 text-left align-middle transition-all max-h-[85vh] my-auto overflow-hidden",
                  {
                    "max-w-md": size === "small",
                    "max-w-lg": size === "medium",
                    "max-w-2xl": size === "large",
                    "bg-transparent shadow-none": search,
                    "bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-line rounded": !search,
                  }
                )}
              >
                <ModalProvider close={close}>{children}</ModalProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { close } = useModal()

  return (
    <Dialog.Title className="flex items-center justify-between pb-3 border-b border-line">
      <div className="text-large-semi font-medium text-ink">{children}</div>
      <div>
        <button onClick={close} data-testid="close-modal-button" className="text-ink-muted hover:text-ink transition-colors p-1">
          <X size={18} />
        </button>
      </div>
    </Dialog.Title>
  )
}

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
          <Dialog.Description className="flex text-sm text-ink-muted items-center justify-center pt-2 pb-4">
            {children}
          </Dialog.Description>
  )
}

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex-1 overflow-y-auto py-3 pr-1 my-1 min-h-0 no-scrollbar">{children}</div>
}

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center justify-end gap-x-3 pt-3 border-t border-line mt-auto">{children}</div>
}

Modal.Title = Title
Modal.Description = Description
Modal.Body = Body
Modal.Footer = Footer

export default Modal
