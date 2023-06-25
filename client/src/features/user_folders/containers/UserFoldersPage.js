import { UserFolderList } from "../components/UserFolderList";
import { UserLayout } from "../../../shared/components/layouts/UserLayout";
import { FolderOptions } from "../components/FolderOptions";
import { FolderNavigator } from "../components/folder-navigator/FolderNavigator";
import { RenameModal } from "../components/folder-modals/RenameModal";

export function UserFoldersPage() {
  return (
    <UserLayout header={<FolderNavigator />} sidebarContent={<FolderOptions />}>
      <UserFolderList />
    </UserLayout>
  );
}
