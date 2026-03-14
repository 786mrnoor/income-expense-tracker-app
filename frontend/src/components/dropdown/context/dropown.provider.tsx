import { useState } from "react";
import { DropdwonContext, DropdwonDispatchContext } from "./dropdown.context";

export default function DropownProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <DropdwonContext value={show}>
      <DropdwonDispatchContext value={setShow}>
        {children}
      </DropdwonDispatchContext>
    </DropdwonContext>
  )
};
