import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"

const { createContext } = require("react")

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  //useEffect(() => console.log(selectedUser), [selectedUser])

  return (
    <AdminContext.Provider
      value={{
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
