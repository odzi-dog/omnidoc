import { getStore } from "$lib/helpers/getStore";
import { CurrentDocumentStore, type CurrentDocumentData } from "$lib/stores/Application";
import { SynchronizationStore } from "$lib/stores/Synchronization.store";
import * as Subscriptions from './subscriptions';

export async function subscribe() {
    const documentStore = await getStore<CurrentDocumentData>(CurrentDocumentStore);
    const SubscriptionsList = Object.values(Subscriptions).map((subscriptionClass) => new subscriptionClass(documentStore))

    SubscriptionsList.forEach((Subscription) => {
        console.log("Subscribe to ", Subscription.subscriptionName);
        SynchronizationStore.addSubscription(Subscription.subscriptionName, Subscription.handler);
    });
};

export async function unsubscribe() {
    const documentStore = await getStore<CurrentDocumentData>(CurrentDocumentStore);
    const SubscriptionsList = Object.values(Subscriptions).map((subscriptionClass) => new subscriptionClass(documentStore));    

    SubscriptionsList.forEach((Subscription) => {
        console.log("unsubscribe from ", Subscription.subscriptionName);
        SynchronizationStore.unsubscribe(Subscription.subscriptionName);
    });
};