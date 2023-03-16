import { FrontendApi, Configuration } from '@ory/client';
import { env } from '$env/dynamic/public';

export const OryService = new FrontendApi(
    new Configuration({
        basePath: env.PUBLIC_SDK_URL ?? "https://ory-public.k8s.odzi.dog/",
    })
);