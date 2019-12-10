import { IFeature } from '@dapplets/dapplet-extension-types';
import { T_TwitterViewSet, Context, T_InsertConfig, ITwitterFeature, IButtonConfig, IWidgetBuilder, IAdapterFeature, IWidgetBuilderConfig } from './types';
import { WidgetBuilder, widgets } from './widgets';
import { ITwitterAdapter, T_TwitterFeatureConfig, T_TwitterActionFactory } from "@dapplets/twitter-adapter/src/types";

let doc: Document = document; //host document we are working on (inpage.js)

@Injectable
export default class TwitterAdapter implements ITwitterAdapter {

    public actionFactories = widgets;

    private observer: MutationObserver = null;
    private features: IFeature[] = [];

    @Inject("common-lib.dapplet-base.eth")
    public library: any;

    public attachFeature(feature: IFeature, order: number): void { // ToDo: automate two-way dependency handling(?)
        if (this.features.find(f => f === feature)) return;
        this.features.splice(order, 0, feature);
        this.updateObservers();
        console.log('this.features', this.features);
    }

    public detachFeature(feature: IFeature): void {
        this.features = this.features.filter(f => f !== feature);
        this.widgetBuilders.forEach(wb => {
            const widgets = wb.widgets.get(feature);
            if (!widgets) return;
            widgets.forEach(w => w.unmount());
        });
    }

    constructor() {
        if (this.observer) return;
        if (!document || !window || !MutationObserver) throw Error('Document or MutationObserver is not available.');
        const OBSERVER_CONFIG = {
            childList: true,
            subtree: true
        }

        this.observer = new MutationObserver((mutations) => this.updateObservers());

        this.observer.observe(doc.body, OBSERVER_CONFIG);
    }

    private updateObservers() {
        this.widgetBuilders.forEach(widgetBuilder => {
            let e = doc.querySelector(widgetBuilder.querySelector);
            if (e && !widgetBuilder.observer) {
                widgetBuilder.observer = new MutationObserver((mutations) => widgetBuilder.updateWidgets(this.features, mutations));
                widgetBuilder.observer.observe(e, {
                    childList: true,
                    subtree: true
                });
            } else if (!e && widgetBuilder.observer) {
                widgetBuilder.observer.disconnect();
                widgetBuilder.observer = null;
            }
            widgetBuilder.updateWidgets(this.features);
        });
    }

    private widgetBuilders = [{
        querySelector: "main[role=main]",
        insPoints: {
            TWEET_SOUTH: {
                toContext: (node: any) => node.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, //ToDo: remove it later
                selector: "main[role=main] div[data-testid=primaryColumn] section[role=region] article div[role=group]"
            },
            TWEET_COMBO: {
                toContext: (node: any) => node.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, //ToDo: remove it later
                selector: "" //ToDo
            }
        },
        // ToDo: This selectors are unstable, because Twitter has changed class names to auto-generated.
        contextBuilder: (tweetNode: any) => ({
            id: parseInt(tweetNode.querySelector('article a time').parentNode.href.substr(tweetNode.querySelector('article a time').parentNode.href.lastIndexOf('/') + 1)),
            text: tweetNode.querySelector('div[lang]').innerText,
            authorFullname: tweetNode.querySelector('article a:nth-child(1) div span span').innerText,
            authorUsername: tweetNode.querySelector('div.r-1f6r7vd > div > span').innerText,
            authorImg: tweetNode.querySelector('article div img').getAttribute('src')
        }),
    }].map((cfg: IWidgetBuilderConfig) => new WidgetBuilder(cfg));
}
