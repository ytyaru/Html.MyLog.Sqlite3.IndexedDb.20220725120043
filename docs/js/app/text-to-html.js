class TextToHtml {
    static toHtml(str) { return this.br(this.autoLink(str)) }
    static br(str) { return str.replace(/\r\n|\n/g, '<br>') }
    //static autoLink(str) { return this.autoLinkIpfs(this.autoLinkHttps(str)) }
    static autoLink(str) {
        let res = this.autoMedia(str); if (str !== res) { return res }
        return this.autoLinkIpfs(this.autoLinkHttps(str)) }
    static autoLinkHttps(str) { // https://twitter.com/
        const regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
        return str.replace(
            regexp_url, 
            (all, url, h, href)=>`<a href="h${href}">${url}</a>`
        );
    }
    static autoLinkIpfs(str) { // ipfs://QmZZrDCuCV5A3WsxbbC6UCtrHtNs2eVyfJwF7JcJJoJGwV
        // https://hanzochang.com/articles/8
        // https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch
        // ipfs://QmZZrDCuCV5A3WsxbbC6UCtrHtNs2eVyfJwF7JcJJoJGwV
        // https://ipfs.io/ipfs/QmZZrDCuCV5A3WsxbbC6UCtrHtNs2eVyfJwF7JcJJoJGwV
        const regexp_url = /((ipfs?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
        return str.replace(
            regexp_url, 
            (all, url, h, href)=>`<a href="${url}">${url}</a>`
        );
    }
    static autoMedia(str) {
        let res = this.autoImg(str); if (str !== res) { return res }
        res = this.autoVideo(str); if (str !== res) { return res }
        res = this.autoAudio(str); if (str !== res) { return res }
        return str
    }
    //static autoMedia(str) { return this.autoImg(this.autoVideo(this.autoAudio(str))) }
    static autoImg(str) {
        const regexp_url = /((https?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+\.(png|gif|jpg|jpeg|webp|avif)))/g; // ']))/;
        return str.replace(regexp_url, (all, url, href)=>`<img src="${href}">`)
    }
    /*
    static autoImg(str) {
        const regexp_url = /((https?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+\.(png|gif|jpg|jpeg|webp|avif)))/g; // ']))/;
        if (str.match(regexp_url)) {
            const img = new Image()
            let attrs = ''
            // https://stackoverflow.com/questions/70767676/await-dispatchevent-how-to-listen-synchronously-to-a-dispatchevent-when-listene
            img.addEventListener('load', async(event) => {
                const width = event.target.naturalWidth
                const height = event.target.naturalHeight
                const threshold = 128
                let w = width
                let h = height
                while (w < threshold || h < threshold) {
                    w *= 2
                    h *= 2
                }
                // 128未満の場合ドット絵と判断し256以上になるよう整数倍する
                attrs=`width="${w}" height="${h}"` + (w===width&&h===height) ? '' || ' class="pixel-art"'
            })
            img.dispatchEvent(new Event('load'))
            return str.replace(regexp_url, (all, url, href)=>`<img src="${href}" ${attrs}>`)
        }
        return str
    }
    */
    static autoVideo(str) {
        let res = this.autoVideoFile(str); if (str !== res) { return res }
        res = this.autoVideoYoutube(str); if (str !== res) { return res }
        return str
    }
    static autoVideoFile(str) {
        const regexp_url = /((https?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+\.(mp4|avi|wmv|mpg|flv|mov|webm|mkv|asf)))/g; // ']))/;
        return str.replace(regexp_url, (all, url, href)=>`<video controls width="320" src="${url}"></video>`)
    }
    static autoVideoYoutube(str) { // https://www.youtube.com/watch?
        const regexp_url = /https:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+)/
        const match = str.match(regexp_url)
        if (match && 1 < match.length) {
            return `<iframe width="320" height="240" src="https://www.youtube.com/embed/${match[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        }
        return str
    }
    static autoAudio(str) {
        const regexp_url = /((https?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+\.(wav|mp3|ogg|flac|wma|aiff|aac|m4a)))/g; // ']))/;
        return str.replace(regexp_url, (all, url, href)=>`<audio controls width="320" src="${url}"></audio>`)
    }
}
