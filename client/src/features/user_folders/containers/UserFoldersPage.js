import { UserFolderList } from "../components/UserFolderList";
import { UserLayout } from "../../../shared/components/layouts/UserLayout";
import { FolderOptions } from "../components/FolderOptions";

export function UserFoldersPage() {
  return (
    <UserLayout sidebarContent={<FolderOptions />}>
      <UserFolderList />
    </UserLayout>
  );
}
