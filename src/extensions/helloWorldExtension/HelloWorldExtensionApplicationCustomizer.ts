import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HelloWorldExtensionApplicationCustomizerStrings';
import { HelloWorldLibrary } from 'spfx-library';

const LOG_SOURCE: string = 'HelloWorldExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldExtensionApplicationCustomizerProperties {
    // This is an example; replace with your own property
    testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldExtensionApplicationCustomizer extends BaseApplicationCustomizer<IHelloWorldExtensionApplicationCustomizerProperties> {
    public onInit(): Promise<void> {
        Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

        const api: HelloWorldLibrary = new HelloWorldLibrary();
        console.log('#### api', api.name());

        let message: string = this.properties.testMessage + ' - ' + api.name();
        if (!message) {
            message = '(No properties were provided.)';
        }

        Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`).catch(() => {
            /* handle error */
        });

        return Promise.resolve();
    }
}
