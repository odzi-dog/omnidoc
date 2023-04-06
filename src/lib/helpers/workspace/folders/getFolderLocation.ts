import type { MappedWorkspace } from "$lib/stores/Application";

export function getFolderLocation(hierarchy: MappedWorkspace["hierarchy"], folderId: string): Array<string> {
    let currentFolder = hierarchy.get(folderId);
    if (!currentFolder) return [];

    const location: Array<string> = [];

    while (currentFolder != null) {
        location.push(currentFolder?.id);
        currentFolder = hierarchy.get(currentFolder?.folder ?? "");
    };

    return location.reverse();
};