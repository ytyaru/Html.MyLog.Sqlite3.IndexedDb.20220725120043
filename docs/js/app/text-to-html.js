class TextToHtml {
    static toHtml(str) { return this.br(this.autoLink(str)) }
    static autoLink(str) { return this.autoLinkIpfs(this.autoLinkHttps(str)) }
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
    static br(str) { return str.replace(/\r\n|\n/g, '<br>') }
}
