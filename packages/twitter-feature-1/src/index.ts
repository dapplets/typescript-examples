// ==UserScript==
// @name GNOSIS
// @type feature
// @description Fake news tracking for Twitter
// @author Dapplets Team
// @version 1
// @familyId TwitterFeature
// @adapterId TwitterAdapter-v1
// @icon data:image/png;base64,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
// ==/UserScript==

import { IAction, IModule, IView, ID, IFeature, ICore, IContentAdapter } from '@dapplets/dapplet-extension-types'
import { T_TwitterActionFactory, T_TwitterAdapterConfig, T_TwitterViewSet, Context, T_InsertConfig, ITwitterFeature, IButtonConfig, ITwitterAdapter } from '@dapplets/twitter-adapter/src/types'

const GNOSIS_ICON: string = 'data:image/png;base64,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';

@Feature("twitter-feature-1.dapplet-base.eth", "0.1.0")
export default class TwitterFeature implements ITwitterFeature {

    @Load("twitter-adapter.dapplet-base.eth", "0.1.0")
    public adapter: ITwitterAdapter;

    constructor() {
        console.log('Feature-1 created. calling init.');
        this.init();
    }

    public init() {
        const overlay = Core.overlay('https://localhost:8080', 'Gnosis');
        const twitterService = Core.connect("wss://localhost:8080");

        const me = this;
        let { button, menuItem } = this.adapter.actionFactories;
        this.adapter.addFeature({
            TWEET_SOUTH: [
                // call at view creation time
                button({
                    clazz: 'dapplet-tweet-south-metamask',
                    img: GNOSIS_ICON,
                    init: function (ctx) {
                        const state = this.state;
                        twitterService.subscribe(ctx.id, (msg) => {
                            if (msg && msg.like_num != undefined) {
                                state.label = msg.like_num.toString();
                            }
                        });
                    },
                    exec: function (ctx) {
                        overlay.open(() => overlay.publish('tweet_select', ctx));
                        overlay.unsubscribe('pm_attach');
                        overlay.subscribe('pm_attach', async ({ market, tweet }) => {
                            console.log('data from overlay recieved', { market, tweet });
                            const result = await Core.sendWalletConnectTx('1', ctx);
                            overlay.publish('tx_created');
                        });
                    }
                })
            ],
            TWEET_COMBO: [
                // menuItem({
                //     clazz: '',
                //     text: "hello one", 
                //     exec: (ctx:any) => core.sendWalletConnectTx({
                //         id: ctx.tweetId,
                //         author: ctx.authorId
                //     }), 
                //     //ToDo: what about global parameters?
                //     //ToDo: return state object useful bound to button state?
                // })
            ],
            DM_SOUTH: [
                button({
                    clazz: 'dapplet-dm-south-metamask',
                    img: GNOSIS_ICON,
                    exec: (ctx: any) => {
                        alert(JSON.stringify(ctx));
                        // core.sendWalletConnectTx({
                        //     id: ctx.tweetId,
                        //     author: ctx.authorId
                        // })
                    }
                    //ToDo: what about global parameters?
                    //ToDo: return state object useful bound to button state?
                    //label: (ctx:any) => ctx.text //ToDo: implement binding and reload
                })
            ]
        }); //add feature config
    }
}
