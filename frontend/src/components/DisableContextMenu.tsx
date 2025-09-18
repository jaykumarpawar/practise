import React, { useEffect, ReactNode, JSX } from "react";

interface DisableContextMenuProps {
  children: ReactNode;
}

export function DisableContextMenu({
  children,
}: DisableContextMenuProps): JSX.Element {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent): void => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return <div>{children}</div>;
}
