import { UserFolderList } from "../components/UserFolderList";
import { UserLayout } from "../../../shared/components/layouts/UserLayout";
import { FolderOptions } from "../components/FolderOptions";
import { FolderNavigator } from "../components/FolderNavigator";

export function UserFoldersPage() {
  return (
    <UserLayout header={<FolderNavigator />} sidebarContent={<FolderOptions />}>
      <UserFolderList />
    </UserLayout>
  );
}
