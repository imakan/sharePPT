title: 调研H5页面在微信中直接呼端
speaker: imakan
js: 
    - ./js/share.js
css: ['./css/share.css']
prismTheme: dark

<slide class="bg-black aligncenter" video="//ali.static.yximgs.com/udata/pkg/fe/kwai_video.c8e339ab.mp4 autoplay loop .background.dark"> 

# open app {.text-landing.text-subtitle.text-shadow.animated.fadeInRight}

统一唤起快手app的开发工具包 {.text-intro.animated.fadeInUp.delay-800}

[:fa-gitlab: web-util](https://npm.corp.kuaishou.com/-/web/detail/@ks/web-util){.button.ghost.animated.flipInX.delay-1500}



<slide class="no2-content bg-black aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

### 应用场景 {.text-landing.text-shadow}

:::flexblock

<span class='testContent animated fadeInDown'>假装在微信中打开的</span>
<div class='teslaContenWrap animated bounceIn delay-300'>
    ![](/img/iphone.png){.iphone}
    <iframe src="http://auto.chenzhongtech.com/auto/teslaCommunity?fromHome=1&layoutType=4&source=unknown&inter_source=brand_list" class='teslaconten'  scrolling="auto"></iframe>
</div>

---

<div class='animated tobuild flipInX'>
    <span class='testContent'>假装在微信中分享了</span>
    <div class='teslaContenWrap'>
        ![](/img/iphone.png){.iphone}
        ![](/img/tesladialog.png){.tesladialog}
    </div>
</div>

---

<div class='animated tobuild fadeInRight'>
    <span class='testContent'>最终在快手中打开了</span>
    <div class='teslaContenWrap'>
        ![](/img/iphone.png){.iphone}
        <iframe src="http://t.chenzhongtech.com/auto/teslaCommunity?fromHome=1&layoutType=4&source=unknown&inter_source=brand_list" class='teslaconten'  scrolling="auto"></iframe>
    </div>
</div>

:::


<slide class="no3-content bg-black aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# :原理:[open-app](http://git.corp.kuaishou.com/ks-ad/ad-fe/web-util/blob/master/src/open-app/index.js#L123) {.text-shadow.animated.lightSpeedIn}

微信6.5.16以上提供了白名单通道, 可以直接唤起app{.text-intro.animated.fadeInUp.delay-800}
```javascript {style="font-size:13px;width:80%;margin:0 auto;" ..tobuild.fadeInUp}
// 微信6.5.16以上提供了白名单通道, 可以直接唤起app
var wxMatch = / MicroMessenger\/([0-9.]+)/.exec(navigator.userAgent);
if (wxMatch && config.wxAppId && util.isGteVersion(wxMatch[1], '6.5.16')) {
    wxAsyncReady().then(function(res) {
        if (res.result === 1 && res.appId === config.wxAppId) {
            // 参数 parameter 是唤起之后，app 内打开的路径。通过 schemeUrl 截取，例：home?from=abc
            res.wx.invoke(
                'launchApplication',
                {
                    appID: config.wxAppId,
                    parameter: formattedUrlObj.schemeUrl.substring(
                        formattedUrlObj.schemeUrl.indexOf('://') + 3
                    ),
                },
                function(res) {
                    if (res.err_msg !== 'launchApplication:ok') {
                        config.needDownLoad && openOrDownLoadApp(config, formattedUrlObj);
                    } else {
                        sendLog(
                            logType.APP_WECHAT_WHITELIST_SUCCESS,
                            config.position,
                            config.appCode
                        );
                    }
                }
            );
        } else {
            config.needDownLoad && openOrDownLoadApp(config, formattedUrlObj);
        }
    });
} else {
    openOrDownLoadApp(config, formattedUrlObj);
}
```

<slide class="no4-content bg-black" image="https://source.unsplash.com/n9WPPWiPPJw/">

# :结论: {.text-landing.text-subtitle.text-shadow.aligncenter.animated.lightSpeedIn}

::: div {.content-left.tobuild.animated.fadeInRight}

+ 配置项

```javascript{style="font-size:13px;height:300px;" ..fadeInUp..slow}
{
    adidDownloadUrl: "https://promotion-partner.kuaishou.com/rest/n/promotion/p"
    appCode: "KWAI"
    appName: "快手"
    appStore: "https://itunes.apple.com/app/apple-store/id440948110?pt=572643&mt=8"
    appid: "100228415"
    defaultUniversalLinkUrl: "https://m.ssl.kuaishou.com/app/"
    downloadStatus: "undownload"
    downloadUrl: "https://m.viviv.com/download/kwai"
    extraParam: {}
    installStatus: 0
    mainPage: "https://www.kuaishou.com"
    marketUrl: "market://details?id=com.smile.gifmaker"
    needDownLoad: true
    packageName: "com.smile.gifmaker"
    position: "打开快手App"
    query: {fromHome: "1", layoutType: "4", source: "unknown", inter_source: "brand_list", title: "特斯拉"}
    schemeUrl: "kwai://work/3xib9qszf88eh4s?userId=212774567"
    shouldOpenInBrowserDialog: false
    sys: {android: true, ios: true}
    useUniversalLink: true
    wxAppId: "wx9227d48257374438"
    wxRequestUrl: "/rest/wd/wemedia/signShareUrl"
    yingyongbao: "http://a.app.qq.com/o/simple.jsp?pkgname=com.smile.gifmaker&g_f=99"
}
```
:::

::: div {.content-right.tobuild.animated.fadeInRight}

+ 新增白名单域名 [kngx](https://kngx.corp.kuaishou.com/location/manage)
    - **viviv.com**
    - **kuai-fei**
    - **chenzhongtech.com**
    - **m.etoote.com**

---
+ 对接人：[`徐明`](){onclick="launchApp('kim')"}
:::

---
::: div {.content-conten.tobuild.animated.fadeInRight}

+ [动态域名](https://wiki.corp.kuaishou.com/pages/viewpage.action?pageId=264694894)：https://wiki.corp.kuaishou.com/pages/viewpage.action?pageId=264694894
:::


















