"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type State = {
  stack: string[];
};

type Action =
  | { type: "OPEN"; path: string }
  | { type: "PUSH"; path: string }
  | { type: "BACK" }
  | { type: "CLOSE" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN":
      return { stack: [action.path] };
    case "PUSH":
      return { stack: [...state.stack, action.path] };
    case "BACK":
      if (state.stack.length <= 1) return state;
      return { stack: state.stack.slice(0, -1) };
    case "CLOSE":
      return { stack: [] };
  }
}

type DetailPaneAPI = {
  path: string | null;
  isOpen: boolean;
  canGoBack: boolean;
  open: (path: string) => void;
  push: (path: string) => void;
  back: () => void;
  close: () => void;
};

const DetailPaneContext = createContext<DetailPaneAPI | null>(null);

export function DetailPaneProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { stack: [] });
  const pathname = usePathname();

  // Close pane when sidebar navigation changes the page
  useEffect(() => {
    dispatch({ type: "CLOSE" });
  }, [pathname]);

  const api: DetailPaneAPI = {
    path: state.stack.length > 0 ? state.stack[state.stack.length - 1] : null,
    isOpen: state.stack.length > 0,
    canGoBack: state.stack.length > 1,
    open: (path) => dispatch({ type: "OPEN", path }),
    push: (path) => dispatch({ type: "PUSH", path }),
    back: () => dispatch({ type: "BACK" }),
    close: () => dispatch({ type: "CLOSE" }),
  };

  return (
    <DetailPaneContext.Provider value={api}>
      {children}
    </DetailPaneContext.Provider>
  );
}

export function useDetailPane(): DetailPaneAPI {
  const ctx = useContext(DetailPaneContext);
  if (!ctx) {
    throw new Error("useDetailPane must be used within DetailPaneProvider");
  }
  return ctx;
}
