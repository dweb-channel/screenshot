(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{3440:(e,t,a)=>{Promise.resolve().then(a.bind(a,9879))},9879:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>w});var r=a(5155),i=a(2115),l=a(1620);let n=e=>{let{width:t,height:a,imageUrl:i,imageStyle:l}=e;return(0,r.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:(0,r.jsxs)("div",{style:{width:"".concat(t,"px"),height:"".concat(a,"px"),position:"relative",backgroundColor:"white",borderRadius:"45px",border:"12px solid black",overflow:"hidden",boxShadow:"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"},children:[(0,r.jsx)("div",{style:{position:"absolute",top:0,width:"40%",height:"30px",backgroundColor:"black",left:"30%",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}}),(0,r.jsx)("div",{style:{position:"absolute",top:"12px",left:"50%",transform:"translateX(-50%)",width:"80px",height:"8px",backgroundColor:"#1a1a1a",borderRadius:"4px"}}),(0,r.jsx)("div",{style:{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"white",position:"relative"},children:(0,r.jsx)("div",{style:{flex:1,position:"relative",width:"100%",height:"100%",overflow:"hidden",backgroundColor:"white",borderRadius:"30px"},children:i&&l&&(0,r.jsx)("img",{src:i,style:{position:"absolute",width:"".concat(l.width,"px"),height:"".concat(l.height,"px"),left:"".concat(l.x,"px"),top:"".concat(l.y,"px"),objectFit:"cover"},alt:"preview"})})})]})})},o=(e,t)=>{let a,r,i,l;let n=e/t;return n>1320/2868?(i=-((a=(r=2868)*n)-1320)/2,l=0):(i=0,l=-((r=(a=1320)/n)-2868)/2),{width:a,height:r,x:i,y:l}},s=e=>new Promise(t=>{let a=new Image;a.onload=()=>{t({width:a.width,height:a.height})},a.src=e});function d(e){var t;let{id:a,imageUrl:d,text:c,originalWidth:h,originalHeight:x,onTextChange:p,onImageReplace:m}=e,u=(0,i.useRef)(null),{width:g,height:f,x:w,y:v}=o(h,x),b=async()=>{if(u.current)try{let e=await l.$E(u.current,{width:1320,height:2868,pixelRatio:2,quality:1,skipAutoScale:!0,backgroundColor:"#ffffff",style:{transform:"scale(".concat(4,")"),transformOrigin:"top left"}}),t=document.createElement("a");t.download="screenshot.png",t.href=e,t.click()}catch(e){console.error("生成图片失败:",e)}};return(0,r.jsxs)("div",{className:"space-y-4 flex flex-col items-center p-4",children:[(0,r.jsxs)("div",{ref:u,className:"relative w-full h-full m-4",children:[(0,r.jsx)("div",{style:{width:"100%",textAlign:"center"},children:(0,r.jsx)("h1",{style:{fontSize:"35px",fontWeight:"bold",color:"black",margin:0,fontFamily:"system-ui,-apple-system",whiteSpace:"pre-wrap"},children:(null===(t=c.match(/.{1,4}/g))||void 0===t?void 0:t.join("\n"))||c})}),(0,r.jsx)(n,{width:330,height:717,imageUrl:d,imageStyle:{width:.25*g,height:.25*f,x:.25*w,y:.25*v}})]}),(0,r.jsxs)("div",{className:"space-y-2 w-full max-w-[330px] relative",children:[(0,r.jsx)("textarea",{className:"w-full p-2 border rounded-lg resize-none",rows:2,placeholder:"输入要显示的文字...",value:c,onChange:e=>p(a,e.target.value)}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[(0,r.jsxs)("label",{className:"w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer text-center",children:["替换图片",(0,r.jsx)("input",{type:"file",className:"hidden",accept:"image/*",onChange:async e=>{var t;let r=null===(t=e.target.files)||void 0===t?void 0:t[0];if(r)try{let e=await new Promise(e=>{let t=new FileReader;t.onloadend=()=>e(t.result),t.readAsDataURL(r)}),{width:t,height:i}=await s(e);m(a,e,t,i)}catch(e){console.error("读取图片失败:",e)}}})]}),(0,r.jsx)("button",{onClick:b,className:"w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600",children:"下载当前"})]})]})]})}var c=a(3463),h=a(9795);function x(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,h.QP)((0,c.$)(t))}let p=e=>{let{number:t=20}=e,[a,l]=(0,i.useState)([]);return(0,i.useEffect)(()=>{l([...Array(t)].map(()=>({top:-5,left:Math.floor(Math.random()*window.innerWidth)+"px",animationDelay:1*Math.random()+.2+"s",animationDuration:Math.floor(8*Math.random()+2)+"s"})))},[t]),(0,r.jsx)(r.Fragment,{children:[...a].map((e,t)=>(0,r.jsx)("span",{className:x("pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"),style:e,children:(0,r.jsx)("div",{className:"pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent"})},t))})};function m(e){let{onFilesSelected:t}=e,[a,l]=(0,i.useState)(!1);return(0,r.jsxs)("label",{className:"".concat("w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"," ").concat(a?"border-blue-500":""," relative overflow-hidden"),onDragOver:e=>{e.preventDefault(),l(!0)},onDragLeave:e=>{e.preventDefault(),l(!1)},onDrop:e=>{e.preventDefault();let{files:a}=e.dataTransfer;t(a),l(!1)},children:[(0,r.jsx)(p,{number:30}),(0,r.jsx)("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:e=>{let{files:a}=e.target;a&&t(a)}}),(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("p",{className:"text-gray-600",children:"拖拽图片到这里或点击上传"}),(0,r.jsx)("p",{className:"text-sm text-gray-400 mt-2",children:"支持多张图片上传"})]})]})}var u=a(1934);function g(e){let{className:t,words:a,delay:i}=e,l=a.split(""),n={initial:{y:100,opacity:0},animate:e=>({y:0,opacity:1,transition:{delay:e*(i||.05)}})};return(0,r.jsx)("div",{className:"flex justify-center  mb-8",children:l.map((e,a)=>(0,r.jsx)(u.P.h1,{variants:n,initial:"initial",animate:"animate",custom:a,className:x("font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-4xl md:leading-[5rem]",t),children:" "===e?(0,r.jsx)("span",{children:"\xa0"}):e},a))})}let f=e=>new Promise(t=>{let a=new Image;a.onload=()=>{t({width:a.width,height:a.height})},a.src=e});function w(){let[e,t]=(0,i.useState)([]),a=async e=>{let a=[];for(let t=0;t<e.length;t++){let r=e[t];if(r.type.startsWith("image/"))try{let e=await new Promise(e=>{let t=new FileReader;t.onloadend=()=>e(t.result),t.readAsDataURL(r)}),{width:i,height:l}=await f(e);a.push({id:"".concat(Date.now(),"-").concat(t),imageUrl:e,text:"",originalWidth:i,originalHeight:l})}catch(e){console.error("读取图片失败:",e)}}t(e=>[...e,...a])},l=(e,a)=>{t(t=>t.map(t=>t.id===e?{...t,text:a}:t))},n=(e,a,r,i)=>{t(t=>t.map(t=>t.id===e?{...t,imageUrl:a,originalWidth:r,originalHeight:i}:t))};return(0,r.jsxs)("main",{className:"container mx-auto p-4 min-h-screen",children:[(0,r.jsx)(g,{words:"App Store 批量截图生成器",delay:.05}),(0,r.jsx)("div",{className:"mb-8",children:(0,r.jsx)(m,{onFilesSelected:a})}),(0,r.jsx)("div",{className:"flex flex-wrap",children:e.map(e=>(0,r.jsx)(d,{...e,onTextChange:l,onImageReplace:n},e.id))}),e.length>0&&(0,r.jsx)("div",{className:"mt-8 text-center text-gray-500",children:(0,r.jsx)("p",{children:'提示：点击"下载当前"按钮下载单张图片'})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[361,441,517,358],()=>t(3440)),_N_E=e.O()}]);