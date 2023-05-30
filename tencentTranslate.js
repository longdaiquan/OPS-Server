const tencentcloud = require("tencentcloud-sdk-nodejs")
const TmtClient = tencentcloud.tmt.v20180321.Client
let useTencentClient = () => {
    const clientConfig = {
        credential: {
            secretId: process.env.TENCENT_SECRET_ID,
            secretKey: process.env.TENCENT_SECRET_KEY,
        },
        region: "ap-beijing",
        profile: {
            httpProfile: {
                endpoint: "tmt.tencentcloudapi.com",
            },
        },
    }
    // 实例化要请求产品的client对象,clientProfile是可选的
    //     腾讯云 API 文档
    //     https://cloud.tencent.com/document/api/551/15619
    //
    return new TmtClient(clientConfig)
}

async function tencentTranslate(input) {
    let params = {
        SourceText: input.text,
        Source: langCodeFilter(input?.from ?? "auto"),
        Target: langCodeFilter(input?.to ?? "zh"),
        ProjectId: 0,
    }
    let re = await useTencentClient().TextTranslate(params)
    if (re.TargetText) return re.TargetText
}

function langCodeFilter(lang) {
    if (lang == "zh-cn") return "zh"
    return lang
}

module.exports = {
    tencentTranslate
}
