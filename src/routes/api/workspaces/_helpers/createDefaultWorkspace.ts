import type { User } from "$lib/auth";
import { getDatabase } from "$lib/database";
import { Workspace, WorkspaceDocument, WorkspaceFolder } from "$lib/database/entities";

export async function createDefaultWorkspace(user: User): Promise<Workspace> {
    const em = await getDatabase();

    const workspace = new Workspace(`${ user.username } workspace`);
    em.persist(workspace);

    // Creating example folders and text documents
    const welcomeFolder = new WorkspaceFolder("💘 Welcome!", workspace);
    em.persist(welcomeFolder);

    const welcomeInnerFolder = new WorkspaceFolder("Inner folder", workspace, welcomeFolder);
    em.persist(welcomeInnerFolder);

    const document = new WorkspaceDocument("👋 Hello there!", workspace, welcomeFolder);
    em.persist(document);

    const testDocument = new WorkspaceDocument("Test #1", workspace, welcomeInnerFolder);
    em.persist(testDocument);

    const secondTestDocument = new WorkspaceDocument("🧪 Test #2", workspace, welcomeInnerFolder);
    em.persist(secondTestDocument);

    const rootDocument = new WorkspaceDocument("Root document", workspace);
    em.persist(rootDocument);

    const secondRootDocument = new WorkspaceDocument("🌭 Furry porn", workspace);
    em.persist(secondRootDocument);

    await em.flush();
    return workspace;
};