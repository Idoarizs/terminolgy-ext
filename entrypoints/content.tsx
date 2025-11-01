// react
import { createRoot } from "react-dom/client";

// styling
import "@/entrypoints/popup/style.css";

// custom components
import {
  FloatingAction,
  PreferencesModal,
  AIResponseSidebar,
} from "@/components/custom";

export default defineContentScript({
  matches: ["<all_urls>"],
  allFrames: true,
  main() {
    // container
    const floatingActionContainer = document.createElement("div");
    floatingActionContainer.id = "floating-action-container";
    floatingActionContainer.style.position = "absolute";
    floatingActionContainer.style.zIndex = "999";
    floatingActionContainer.style.pointerEvents = "auto";
    document.body.appendChild(floatingActionContainer);
    const root = createRoot(floatingActionContainer);

    // state management
    let modalOpen = false;
    let sidebarOpen = false;

    // functions to render UI
    const renderUI = (x?: number, y?: number, label?: string) => {
      floatingActionContainer.style.left = x !== undefined ? `${x}px` : "0px";
      floatingActionContainer.style.top =
        x !== undefined ? `${y - 40}px` : "0px";
      floatingActionContainer.style.pointerEvents = "auto";

      if (!modalOpen) {
        root.render(
          <div>
            <FloatingAction
              onExplainClick={() => {
                sidebarOpen = true;

                if (label) {
                  root.render(
                    <AIResponseSidebar
                      open={sidebarOpen}
                      onClose={() => {
                        sidebarOpen = false;
                        renderUI();
                      }}
                      label={label}
                    />
                  );
                }
              }}
              onSettingsClick={() => {
                modalOpen = true;
                renderUI();
              }}
            />
          </div>
        );
      } else {
        root.render(
          <PreferencesModal
            open={modalOpen}
            onClose={() => {
              modalOpen = false;
              renderUI();
            }}
          />
        );
        return;
      }
    };

    // function to hide the UI
    const hideUI = () => {
      root.render(<></>);
    };

    // dom event listeners
    document.addEventListener("mouseup", () => {
      const selection = window.getSelection();

      // text selection handling
      const text = selection?.toString().trim().toLowerCase();

      if (text) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (rect) {
          renderUI(rect.left + window.scrollX, rect.top + window.scrollY, text);
          return;
        }
      }

      // image selection handling
      // const selectionNode = selection?.anchorNode?.parentElement;

      // if (selectionNode && selectionNode.tagName.toLowerCase() === "img") {
      //   const rect = selectionNode.getBoundingClientRect();
      //   renderUI(
      //     rect.left + window.scrollX,
      //     rect.top + window.scrollY,
      //     "Gambar"
      //   );
      //   return;
      // }
    });

    // hide the floating action button when selection changes
    document.addEventListener("selectionchange", () => {
      if (!window.getSelection()?.toString().trim()) {
        hideUI();
      }
    });
  },
});
