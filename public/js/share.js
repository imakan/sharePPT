// 主要提供换背景图
(function() {
    window.launchApp = appName => {
        let data = {
            appName:appName
        }
        fetch('/launch', 
        {
            method:"post",
            body:JSON.stringify(data)
        })
    .then(function(response) {
            console.log(response)
            // handle HTTP response
            }, function(error) {
             // handle network error
            })
    };
})();