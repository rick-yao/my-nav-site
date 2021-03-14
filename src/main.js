// $lastLi = $('.insert-icon')
let $siteList = $('.siteList')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
let hashMap = xObject || [{logo: 'Y',logoType: 'img', link: 'https://Youtube.com'},{logo: 'V', logoType: 'text',link: 'https://v2ex.com'}]
const simplifyUrl = (url) => {
    return url.replace('https://','').replace('http://','').replace('www.','')
}
const render= () =>{
    $siteList.find('li:not(.insert-icon)').remove()
    hashMap.forEach((node,index)=> {
        const $li = $(
            `<li>
            <a href="${node.link}">
              <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.link)}</div>
                <div class="deleteButton">
                    <svg class="icon">
                        <use xlink:href="#icon-delete"></use>
                     </svg>
              </div>
              </div>
            </a>
          </li>
            `
        ).insertBefore('.insert-icon') 
        $li.on('click', '.deleteButton', (e)=> {
            e.preventDefault()
            hashMap.splice(index,1)
            render()
            })

        })
    }


render();

$('.icon-wrapper')
    .on('click',()=>
    {
        let typeUrl = window.prompt('请问你要添加的网址是什么')
    if(typeUrl.indexOf('http')!==0){
    typeUrl = 'http://' + typeUrl
    hashMap.push({logo: simplifyUrl(typeUrl)[0], logoType: 'text',link: typeUrl})
    $siteList.find('li:not(.insert-icon)').remove()
    render();
        }
    })
window.onbeforeunload = () =>{
const string = JSON.stringify(hashMap)
localStorage.setItem('x',string)
}