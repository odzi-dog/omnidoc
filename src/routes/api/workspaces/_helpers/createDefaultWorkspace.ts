import type { User } from "$lib/auth";
import { getDatabase } from "$lib/database";
import { Workspace, WorkspaceDocument, WorkspaceFolder } from "$lib/database/entities";

export async function createDefaultWorkspace(user: User): Promise<Workspace> {
    const em = getDatabase();

    const workspace = new Workspace(`${ user.username } workspace`);
    em.persist(workspace);

    // Creating example folders and text documents
    const welcomeFolder = new WorkspaceFolder("💘 Welcome!", workspace);
    em.persist(welcomeFolder);

    const welcomeDocument = new WorkspaceDocument("👋 Hello there!", workspace, welcomeFolder);
    em.persist(welcomeDocument);

    const helpDocument = new WorkspaceDocument("Need help?", workspace, welcomeFolder);
    em.persist(helpDocument);

    await em.flush();
    return workspace;
};