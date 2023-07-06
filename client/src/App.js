import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Routes from "./routes"
import { AuthProvider } from "./contexts/AuthContext"
import { FolderProvider } from "./contexts/FolderContext"
import { useState } from "react"

function App() {
  const [queryClient] = useState(new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FolderProvider>
          <Routes />
        </FolderProvider>
      </AuthProvider>
      {/*  <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}

export default App
