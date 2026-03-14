import toast from "react-hot-toast";
import ConfirmModal, { type ConfirmModalProps } from "./confirm.toast";

export function confirm(props: Omit<ConfirmModalProps, 'onConfirm' | 'onCancel'>): Promise<boolean> {
  return new Promise(resolve => {

    toast((t) => (
      <ConfirmModal
        {...props}
        onConfirm={() => {
          toast.dismiss(t.id);
          resolve(true);
        }}
        onCancel={() => {
          toast.dismiss(t.id);
          resolve(false);
        }}
      />
    ));

  })
}