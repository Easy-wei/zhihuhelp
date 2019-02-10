import moment from 'moment'
class OPF {
    index = 0 // 生成id

    title = ""
    creator = ''
    identifier = 'helloworld'
    language = 'zh-cn'

    publishTime = moment().format('YYYY-MM-DDTHH:mm:ss') + 'Z'
    publisher = 'zhihuhelp'

    manifestItemList: Array<string> = []
    spineItemList: Array<string> = []

    get content() {
        return `<?xml version='1.0' encoding='utf-8'?>
<package xmlns="http://www.idpf.org/2007/opf" 
         version="3.0" 
         xml:lang="${this.language}" 
         unique-identifier="pub-id">
    <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:title id="title">${this.title}</dc:title>

        <dc:creator id="creator">${this.creator}</dc:creator>
        
        <dc:identifier id="pub-id">${this.identifier}</dc:identifier>
        <meta refines="#pub-id" property="identifier-type" scheme="xsd:string">15</meta>
        
        <dc:language>${this.language}</dc:language>
        
        <meta property="dcterms:modified">${this.publishTime}</meta>

        <dc:publisher>${this.publisher}</dc:publisher>

        <meta content="cover-image" name="cover"/>
    </metadata>
    <manifest>
    ${this.manifestItemListString}
    </manifest>
    <spine toc="ncx">
    ${this.spineItemListString}
    </spine>
</package>
    `

    }

    get manifestItemListString() {
        return this.manifestItemList.join('')
    }

    get spineItemListString() {
        return this.spineItemList.join('')
    }

    constructor() {
        this.manifestItemList = []
        this.spineItemList = []

        // 初始化基础元素
        this.manifestItemList.push(`<item id="toc" properties="nav" href="toc.xhtml" media-type="application/xhtml+xml"/>`)
    }

    addHtml(filename: string) {
        this.index = this.index + 1
        this.manifestItemList.push(` <item href="./html/${filename}" id="index_${this.index}" media-type="application/xhtml+xml" />`)
        this.spineItemList.push(` <itemref idref="index_${this.index}" />`)
    }

    addCss(filename: string) {
        this.index = this.index + 1
        this.manifestItemList.push(` <item href="./css/${filename}" id="index_${this.index}" media-type="text/css" />`)
    }

    addImage(filename: string) {
        this.index = this.index + 1
        // 图片类型统一写成 media-type="text/jpeg", 应该没事
        this.manifestItemList.push(` <item href="./image/${filename}" id="index_${this.index}" media-type="text/jpeg" />`)
    }
}

export default OPF