import { getStore } from '$lib/helpers/getStore';
import { CurrentWorkspaceStore, type CurrentWorkspaceData } from '$lib/stores/Application';
import { SynchronizationStore } from '$lib/stores/Synchronization.store';
import * as Subscriptions from './subscriptions';

export async function subscribe() {
    const workspaceStore = await getStore<CurrentWorkspaceData>(CurrentWorkspaceStore);
    const SubscriptionsList = Object.values(Subscriptions).map((subscriptionClass) => new subscriptionClass(workspaceStore));
    
    // Subscribing to document list change
    SubscriptionsList.forEach((Subscription) => {
        SynchronizationStore.addSubscription(Subscription.subscriptionName, Subscription.handler);
    });
};

export async function unsubscribe() {
    const workspaceStore = await getStore<CurrentWorkspaceData>(CurrentWorkspaceStore);
    const SubscriptionsList = Object.values(Subscriptions).map((subscriptionClass) => new subscriptionClass(workspaceStore));    

    SubscriptionsList.forEach((Subscription) => {
        SynchronizationStore.unsubscribe(Subscription.subscriptionName);
    });
};