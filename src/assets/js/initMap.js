export default {
    init: function() {
        return new Promise((resolve, reject) => {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://map.qq.com/api/gljs?v=1.exp&key=CGABZ-3AN3O-I77WS-SGE22-NM6YF-ATBPN&callback=onTMapCallback";
            document.body.appendChild(script);
            // 等待页面加载完毕回调
            window.onTMapCallback = function() {
                resolve(TMap)
                console.log(resolve)
            }
        })
    },
    initqq: function() {
        // return new Promise((resolve, reject) => {
        var script = document.createElement("script");
        script.type = "text/javascript";
        // script.src = "https://map.qq.com/api/js?v=2.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&callback=onqqMapCallback";
        script.src = "https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js";
        document.body.appendChild(script);
        // 等待页面加载完毕回调
        // window.onqqMapCallback = function() {
        //     resolve(qqMap)
        //     console.log(resolve)
        // }
        // })
    }
}