import { RouterProvider } from "react-router-dom";
import router from "@/lib/router";
import { LanguageProvider, ThemeProvider } from "@/contexts";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
