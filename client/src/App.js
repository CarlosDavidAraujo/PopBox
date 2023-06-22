import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { FolderProvider } from "./contexts/FolderContext";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

function App() {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AuthProvider>
        <FolderProvider>
          <Routes />
        </FolderProvider>
      </AuthProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default App;
