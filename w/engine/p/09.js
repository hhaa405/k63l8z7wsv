v><div style='font-size:12px;opacity:.9;margin-top:4px'>上週第 1 名，聊天室名字旁會出現「🏆 股神」標籤一整週</div></div>`;
 o+=sg.length?sg.map((r,i)=>`<div class='skrow2'${r.n==S.name?" style='outline:2px solid #e11d48'":""}><span>${md[i]||i+1}</span><b>${esc(String(r.n).slice(0,12))}${r.n==S.name?" <small>（你）</small>":""}</b><em style='color:#e11d48;font-weight:800'>+${mny(r.g)}</em></div>`).join(""):"<div class='gmsg'>📈<br>這週還沒有人上榜<br>買股票、等它漲，就有機會當股神</div>";
 o+=`<div class='x5sub'>獲利由伺服器依你每小時回報的持股，乘上真實股價的漲跌估算（同一小時內買了又賣、手續費不計）。要連上網路持有股票才會累積，每小時更新一次。</div>`;
 const fm=SKD.fame||[];if(fm.length)o+=`<div class='x5h'>🏛️ 名人堂</div>`+fm.map(f=>`<div class='skrow2' style='display:block'><small>${skWkRange(f.w)}</small><br>${f.top.map((r,i)=>`${md[i]} <b>${esc(String(r.n).slice(0,12))}</b> <small style='color:#e11d48'>+${mny(r.g)}</small>`).join("　")}</div>`).join("");
 return o}
function SKTAB(t){SKU.tab=t;SKU.sel=null;render()}
function SKSEL(c){SKU.sel=c;SKU.q=1000;render();const s=document.querySelector(".ph .sc");s&&(s.scrollTop=0)}
function SKCH(v){SKU.ch=v;render()}
function STKX(){if(!skFresh())skFetch();else skPlan();
 if(!SKD)return"<div class='gmsg'>📈<br>正在連線證券交易所…<br><small>需要網路才能看行情</small></div>";
 const k=stkS(),nx=new Date(SKD.nx),upd=`<div class='skup'>🕒 台灣時間 ${skTime(SKD.t).split(" ")[1]} 行情・${String(nx.getHours()).padStart(2,"0")}:${String(nx.getMinutes()).padStart(2,"0")} 更新${skFresh()?"":"・<b>更新中…</b>"}</div>`;
 if(SKU.sel=="IDX")return skIdxX(upd);
 if(SKU.sel){const s=skSt(SKU.sel);if(!s){SKU.sel=null;return STKX()}const ch=s.p-s.pc,h=k.h[s.c],md=(SKD.mood||{})[s.c]||[0,0],mt=md[0]+md[1],bull=mt?Math.round(md[0]/mt*100):50,tp=(SKD.top||{})[s.c]||[];
  let o=`<button class='x5b off' style='background:var(--s1,#eee);color:var(--t1,#333);margin-bottom:8px' onclick='SKSEL(null)'>← 回行情</button>${upd}
  <div class='skhd'><div><small>${s.c} ${skRisk(s)}</small><b>${esc(s.n)}</b></div><div style='text-align:right'><div class='skbig' style='color:${skCol(ch)}'>${skPx(s.p)}</div><div style='color:${skCol(ch)};font-weight:800'>${skSign(ch)} ${skPx(Math.abs(ch))}（${skPct(s).toFixed(2)}%）${skTag(s)}</div></div></div>
  ${skChTabs()}${skChart(s)}
  <div class='skgrid'><div>開盤<b>${skPx(s.o)}</b></div><div>昨收<b>${skPx(s.pc)}</b></div><div>最高<b style='color:${skCol(s.h-s.pc)}'>${skPx(s.h)}</b></div><div>最低<b style='color:${skCol(s.l-s.pc)}'>${skPx(s.l)}</b></div><div>漲停<b style='color:#e11d48'>${s.lu==null?"無限制":skPx(s.lu)}</b></div><div>跌停<b style='color:#16a34a'>${s.ld==null?"無限制":skPx(s.ld)}</b></div></div>
  <div class='x5h'>💼 我的持股</div><div class='x5info'>${h?`持有 <b>${skLot(h.q)}</b>・平均成本 <b>${skPx(h.c/h.q)}</b><br>市值 <b>${mny(h.q*s.p)}</b>・未實現損益 <b style='color:${skCol(h.q*s.p-h.c)}'>${h.q*s.p-h.c>=0?"+":""}${mny(h.q*s.p-h.c)}</b>`:"還沒有持股"}</div>
  <div class='x5h'>🛒 下單（1 張 = 1000 股）</div>${skModeTabs()}${SKU.mode==1?skShortX(s):`  <div class='x5chips'>${[[100,"100 股"],[1000,"1 張"],[5000,"5 張"],[10000,"10 張"],[50000,"50 張"]].map(a=>`<button class='${SKU.q==a[0]?"on":""}' onclick='SKQ(${a[0]})'>${a[1]}</button>`).join("")}<button onclick='SKQ("max")'>現金買最多</button>${h?`<button onclick='SKQ("all")'>全部持股</button>`:""}</div>
  <input id='skq' class='x5q' type='number' inputmode='numeric' min='1' value='${SKU.q||""}' oninput='SKQIN(this)' placeholder='輸入股數'>
  <div class='x5info' id='skfee'>${skFeeTx()}</div>
  <div style='display:flex;gap:8px;margin:6px 0 4px'><button class='x5b' style='flex:1;background:#e11d48;padding:13px' onclick='SKTRADE("b")'>買進</button><button class='x5b' style='flex:1;background:#16a34a;padding:13px' onclick='SKTRADE("s")'>賣出</button></div>
  <div class='x5sub'>現金 ${mny(S.cash)}・每支最多持有 1000 張・手續費 0.1425%（最低 20 元）・賣出另收交易稅 0.3%</div>`}
  <div class='x5h'>🏦 三大法人買賣超（今日）</div><div class='skgrid'><div>外資<span>${skFlow(s.f[0])}</span></div><div>投信<span>${skFlow(s.f[1])}</span></div><div>散戶<span>${skFlow(s.f[2])}</span></div></div>${s.yf?`<div class='x5sub'>昨日：外資 ${s.yf[0]>0?"+":""}${s.yf[0]} 張・投信 ${s.yf[1]>0?"+":""}${s.yf[1]} 張・散戶 ${s.yf[2]>0?"+":""}${s.yf[2]} 張</div>`:""}
  <div class='x5h'>🗣️ 玩家情緒（今日）</div><div class='skmood'><i style='width:${bull}%'></i></div><div class='x5sub'>${mt?`<b style='color:#e11d48'>${bull}% 看多</b>・<b style='color:#16a34a'>${100-bull}% 看空</b>（今天玩家買進 ${md[0]} 次、賣出 ${md[1]} 次）`:"今天還沒有玩家交易"}</div>
  <div class='x5h'>💰 股利</div><div class='x5sub'>${s.dy>0?`每週日 0:00 配發，大約是股價的 ${(s.dy*100).toFixed(2)}%。<b>上一週一直持有</b>的股數才領得到。`:"這支股票不配股利，靠漲跌賺價差"}</div>
  <div class='x5h'>🏆 大股東</div>${tp.length?tp.map((r,i)=>`<div class='skrow2'><span>${i+1}</span><b>${esc(String(r[0]).slice(0,12))}</b><em>${skLot(r[1])}</em></div>`).join(""):"<div class='x5sub'>還沒有資料（每小時更新）</div>"}`;
  return o}
 const tabs=["行情","持股","🏆 股神榜","新聞","大股東"];let o=`<div class='x5tabs'>${tabs.map((n,i)=>`<button class='${SKU.tab==i?"on":""}' onclick='SKTAB(${i})'>${n}</button>`).join("")}</div>${upd}`;
 if(SKU.tab==0){o+=skIdxCard()+SKD.s.map(s=>{const ch=s.p-s.pc,h=k.h[s.c];return`<div class='x5row skrow' onclick='SKSEL("${s.c}")'><div class='x5mid'><b>${esc(s.n)} ${skTag(s)}</b><small>${s.c} ${skRisk(s)}${h?"・持有 "+skLot(h.q):""}</small></div>${skSpark(s)}<div class='skpx'><b style='color:${skCol(ch)}'>${skPx(s.p)}</b><small style='color:${skCol(ch)}'>${skSign(ch)} ${Math.abs(skPct(s)).toFixed(2)}%</small></div></div>`}).join("");
  const nw0=SKD.news&&SKD.news[0];nw0&&(o+=`<div class='x5info' onclick='SKTAB(3)' style='cursor:pointer'>📰 <b>${esc(nw0.tx)}</b>　<small>${skTime(nw0.t)}</small></div>`);
  o+=`<div class='x5sub'>股價全服同步，每 10 分鐘更新一次，跟遊戲裡睡覺、過天無關。每天台灣時間 0:00 收盤，漲跌幅上限 ±10%（興櫃股票沒有漲跌幅限制，風險最高）。</div>`}
 else if(SKU.tab==1){let tv=0,tc=0;const ids=Object.keys(k.h);ids.forEach(c=>{const h=k.h[c];tv+=h.q*(skP(c)||h.c/h.q);tc+=h.c});
  o+=`<div class='skhd' style='display:block'><small>持股總市值 ${skWho()}</small><div class='skbig'>${mny(tv)}</div><div style='font-weight:800;color:${skCol(tv-tc)}'>未實現 ${tv-tc>=0?"+":""}${mny(tv-tc)}</div><small>已實現損益 <b style='color:${skCol(k.pl)}'>${k.pl>=0?"+":""}${mny(k.pl)}</b>・累計股利 <b>${mny(k.dvT)}</b></small></div>`;
  o+=ids.length?ids.map(c=>{const h=k.h[c],s=skSt(c),p=s?s.p:h.c/h.q,pl=h.q*p-h.c;return`<div class='x5row skrow' onclick='SKSEL("${c}")'><div class='x5mid'><b>${c} ${esc(s?s.n:"")}</b><small>${skLot(h.q)}・成本 ${skPx(h.c/h.q)}</small></div><div class='skpx'><b>${mny(h.q*p)}</b><small style='color:${skCol(pl)}'>${pl>=0?"+":""}${mny(pl)}</small></div></div>`}).join(""):"<div class='gmsg'>📈<br>還沒有持股<br>到「行情」挑一支買買看</div>";
  o+=skShortList();
  if(k.lg.length)o+=`<div class='x5h'>📒 交易紀錄</div>`+k.lg.slice(0,30).map(l=>`<div class='skrow2' style='display:block'><b>${esc(l.x)}</b><br><small>${skTime(l.t)}・${esc(l.d||"")}</small></div>`).join("")}
 else if(SKU.tab==2){o+=skGodX()}
 else if(SKU.tab==3){const ns=SKD.news||[];o+=ns.length?ns.map(n=>`<div class='x5row skrow' onclick='SKSEL("${n.c||"IDX"}")'><div class='x5ic' style='font-size:20px'>${n.c?(n.up?"📈":"📉"):"📊"}</div><div class='x5mid'><b>${esc(n.tx)}</b><small>${n.c?n.c+" "+esc((skSt(n.c)||{n:""}).n):"大盤消息"}・${skTime(n.t)}</small></div></div>`).join(""):"<div class='gmsg'>📰<br>最近沒有新聞</div>"}
 else{o+=SKD.s.map(s=>{const tp=(SKD.top||{})[s.c]||[];return`<div class='x5h'>${s.c} ${esc(s.n)}</div>`+(tp.length?tp.slice(0,5).map((r,i)=>`<div class='skrow2'><span>${i+1}</span><b>${esc(String(r[0]).slice(0,12))}</b><em>${skLot(r[1])}</em></div>`).join(""):"<div class='x5sub'>還沒有人持有</div>")}).join("")+"<div class='x5sub'>每小時更新一次；被標記異常的帳號不列入。</div>"}
 return o}
{const i=APPS.findIndex(a=>a[3]=="wal");APPS.splice(i>=0?i+1:2,0,["股市","📈","#e11d48","stk"])}
{const _a=appX;appX=function(a){return a=="stk"?STKX():_a(a)}}
{const c=document.createElement("style");c.textContent=`.skup{font-size:12px;color:var(--t3,#888);margin:-2px 2px 8px}.skrow{cursor:pointer}.skpx{display:flex;flex-direction:column;align-items:flex-end;min-width:74px;flex:none}.skpx b{font-size:16px}.skpx small{font-size:12px;font-weight:800}
.sktg{font-size:11px;font-weight:900;color:#fff;border-radius:6px;padding:1px 5px;margin-left:4px;vertical-align:2px}.sktg.up{background:#e11d48}.sktg.dn{background:#16a34a}
.skhd{display:flex;justify-content:space-between;align-items:center;background:var(--s0,#fff);border-radius:16px;padding:12px 14px;box-shadow:0 1px 5px #0001}.skhd small{color:var(--t3,#888);font-size:12px;display:block}.skhd b{font-size:20px}.skbig{font-size:30px;font-weight:900;line-height:1.1}
.skchart{position:relative;background:var(--s0,#fff);border-radius:16px;padding:8px 8px 22px;box-shadow:0 1px 5px #0001}.skax{position:absolute;right:10px;top:8px;bottom:24px;display:flex;flex-direction:column;justify-content:space-between;font-size:10px;color:var(--t3,#999);pointer-events:none}.skax2{display:flex;justify-content:space-between;font-size:10px;color:var(--t3,#999);padding:0 2px;position:absolute;left:8px;right:8px;bottom:4px}
.skgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px}.skgrid div{background:var(--s0,#fff);border-radius:12px;padding:8px;font-size:12px;color:var(--t3,#888);display:flex;flex-direction:column;gap:2px;box-shadow:0 1px 4px #0001}.skgrid b{font-size:15px;color:var(--t1,#222)}
.skmood{height:12px;border-radius:9px;background:#16a34a;overflow:hidden}.skmood i{display:block;height:100%;background:#e11d48}
.skrow2{display:flex;gap:10px;align-items:center;background:var(--s0,#fff);border-radius:12px;padding:8px 12px;margin-bottom:6px;font-size:14px}.skrow2 span{width:22px;font-weight:900;color:#f59e0b}.skrow2 b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}.skrow2 em{font-style:normal;color:var(--t2,#666);font-size:13px}.skrow2 small{color:var(--t3,#888)}
.skidx{background:linear-gradient(135deg,#fff7ed,#fff1f2)!important;border:1.5px solid #fecdd3}.skrk{display:inline-block;color:#fff;font-size:10px;font-weight:800;border-radius:5px;padding:0 5px;margin-left:3px;vertical-align:1px;line-height:16px}.chks{font-size:11px;font-weight:800;border-radius:6px;padding:1px 5px;background:#fde68a33;color:#b45309;margin-left:2px}`;document.head.appendChild(c)}
// 存檔碼也要帶著持股
{const _ex=x5Extra;x5Extra=function(){const s=_ex.apply(this,arguments);try{const k=S.x5&&S.x5.sk;if(!k||!k.h||!Object.keys(k.h).length&&!k.pl&&!k.dvT&&!(k.s&&Object.keys(k.s).length))return s;const o=s?JSON.parse(s):{};o.sk={h:k.h,mq:k.mq,wk:k.wk,pl:Math.round(k.pl||0),dvT:k.dvT||0,s:k.s||{},ban:k.ban||0};return JSON.stringify(o)}catch{return s}}}
// 聊天室：伺服器蓋章的股市身分（散戶／中實戶／大戶）
{const _ci=chIngest;chIngest=function(m){if(m&&m.__ok&&typeof m.ms=="string"&&m.ks==null){try{const o=JSON.parse(m.ms);if(o.ks>=1&&o.ks<=3)m.ks=o.ks|0;if(o.sg===1)m.sg=1}catch{}}return _ci.apply(this,arguments)}}
{const _b=window.spBadge;window.spBadge=function(m){const t=_b?_b(m):"";return t+(m&&m.__ok&&m.sg?" <span class='chks' style='background:#fde047;color:#7c2d12'>🏆 股神</span>":"")+(m&&m.__ok&&m.ks?" <span class='chks'>"+["","🐜 散戶","🐟 中實戶","🐳 大戶"][m.ks]+"</span>":"")}}

/* ===== 先賣後買（現股當沖做空）：不用先付錢，當天 23:55 前一定要買回 =====
   額度＝現金；沒買回會在 23:55 被強制回補並加收 10% 罰金；賠到現金不夠就是「違約交割」，7 天不能當沖 */
const SKS={lv:10,tax:.0015,pen:.1,cutH:23,cutM:55,ban:7*864e5};
function skSh(){const k=stkS();k.s=k.s||{};return k.s}
const skTwDay=()=>Math.floor((Date.now()+SKT.tz)/864e5);
const skTwMin=()=>{const d=new Date(Date.now()+SKT.tz);return d.getUTCHours()*60+d.getUTCMinutes()};
const skCutMin=SKS.cutH*60+SKS.cutM;
const skLate=()=>skTwMin()>=skCutMin;
// 一筆空單目前的損益（賣出價金－買回成本，還沒扣費用）
const skShPL=(o,p)=>o.a-o.q*p;
function skShFee(a,b){const f1=Math.max(SKT.minFee,Math.round(a*SKT.fee)),f2=Math.max(SKT.minFee,Math.round(b*SKT.fee)),t=Math.round(a*SKS.tax);return f1+f2+t}
{const _nw=x5nw;x5nw=function(){let v=_nw.apply(this,arguments);try{const s=S.x5&&S.x5.sk&&S.x5.sk.s;if(s)for(const c in s){const o=s[c];if(o&&o.q>0)v+=skShPL(o,skP(c)||o.a/o.q)}}catch{}return Math.max(0,v)}}
const skShUsed=()=>{let u=0;const s=skSh();for(const c in s)u+=s[c].a||0;return u};
function skShFeeTx(){const s=skSt(SKU.sel);if(!s||!SKU.q)return"";const a=SKU.q*s.p;return`先賣 <b>${mny(a)}</b>，現在<b>不用付錢</b>・買回時才結算損益，費用約 ${mny(skShFee(a,a))}（手續費＋當沖交易稅 0.15%）`}
function skBanLeft(){const k=stkS();return Math.max(0,(k.ban||0)-Date.now())}
function SKSHORT(side){const c=SKU.sel,s=skSt(c);if(!s)return;if(!skFresh()){toast("股價更新中，請稍等一下");skFetch(true);return}
 const q=Math.floor(SKU.q);if(!(q>0))return toast("請輸入股數");const k=stkS(),sh=skSh(),o=sh[c],p=s.p;
 if(side=="s"){if(lv()<SKS.lv)return toast("先賣後買要 Lv"+SKS.lv+" 以上才能使用");if(skBanLeft())return toast("違約交割處分中，還要 "+Math.ceil(skBanLeft()/864e5)+" 天才能當沖");
  if(skLate())return toast("23:55 之後不能再先賣，明天再來");if(p<=s.ld)return toast("跌停價不能先賣");
  if(o&&o.day!==skTwDay())return toast("昨天的空單還沒結算，請稍等");
  if((o?o.q:0)+q>SKT.maxq)return toast("每支股票最多先賣 1000 張");
  const a=q*p;if(skShUsed()+a>S.cash)return toast("當沖額度不足：先賣的總金額不能超過你的現金 "+mny(S.cash));
  const n=o||{q:0,a:0,day:skTwDay()};n.q+=q;n.a+=a;sh[c]=n;
  k.lg.unshift({t:Date.now(),x:"先賣 "+c+" "+s.n+" "+skLot(q)+" @ "+skPx(p),d:"今天 23:55 前要買回"});const v=k.kb[c]=k.kb[c]||[0,0];v[1]++}
 else{if(!o||o.q<q)return toast("沒有這麼多空單可以買回");skShCover(c,q,p,0)}
 k.lg.length>40&&(k.lg.length=40);try{sfx.coin()}catch{}toast((side=="s"?"📉 先賣 ":"📈 買回 ")+c+" "+s.n+" "+skLot(q));save();render()}
// 買回結算（自己按，或 23:55 被強制回補；pen＝罰金比例）
function skShCover(c,q,p,pen){const k=stkS(),sh=skSh(),o=sh[c];if(!o||!o.q)return;q=Math.min(q,o.q);const a=o.a*q/o.q,b=q*p,fee=skShFee(a,b),fine=Math.round(b*(pen||0)),pl=a-b-fee-fine;
 o.q-=q;o.a-=a;if(o.q<=0)delete sh[c];const n=(skSt(c)||{n:""}).n,c0=S.cash;let bad=0;
 if(pl>=0)S.cash+=pl;else if(S.cash+pl>=0)S.cash+=pl;else{bad=-pl-S.cash;S.cash=0;k.ban=Date.now()+SKS.ban;k.vio=(k.vio||0)+1}
 k.pl+=S.cash-c0;
 S.log.unshift((pl>=0?"+":"-")+mny(Math.abs(pl))+(pen?" 當沖強制回補 ":" 當沖買回 ")+c+" "+n);
 k.lg.unshift({t:Date.now(),x:(pen?"⚠️ 沒在 23:55 前買回，被強制回補 ":"買回 ")+c+" "+n+" "+skLot(q)+" @ "+skPx(p),d:(pl>=0?"賺 ":"賠 ")+mny(Math.abs(pl))+"（費用 "+mny(fee)+(fine?"＋罰金 "+mny(fine):"")+"）"+(bad?"・⚠️ 現金不夠付，違約交割！7 天不能當沖":"")});
 if(!pen){const v=k.kb[c]=k.kb[c]||[0,0];v[0]++}
 if(bad)setTimeout(()=>toast("⚠️ 違約交割！現金不夠付當沖虧損，7 天內不能先賣後買"),600)}
// 23:55 一到（或隔天才打開遊戲），還沒買回的空單一律強制回補
function skShForce(){try{if(!S||!S.x5||!S.x5.sk||!S.x5.sk.s)return;const sh=skSh(),today=skTwDay(),late=skLate();let did=[];
 for(const c in sh){const o=sh[c];if(!o||!o.q){delete sh[c];continue}const s=skSt(c);if(!s)continue;let p=0;
  if(o.day===today){if(!late)continue;p=s.p}
  else{const back=today-o.day;p=back===1?s.pc:(s.d[s.d.length-back]||s.pc)}   // 當天的收盤價
  const q=o.q;skShCover(c,q,p,SKS.pen);did.push(c+" "+s.n+" "+skLot(q))}
 if(did.length){toast("⏰ 當沖時間到，已強制回補："+did.join("、"));save();ui.app=="stk"&&render()}}catch{}}
{const _r=skRoll;skRoll=function(){_r.apply(this,arguments);skShForce()}}
setInterval(()=>{if(!document.hidden)skShForce()},3e4);
{const _bp=bbPayload;bbPayload=function(){const p=_bp.apply(this,arguments);try{const s=S.x5&&S.x5.sk&&S.x5.sk.s;if(s){const h={};for(const c in s)s[c].q>0&&(h[c]=s[c].q);if(Object.keys(h).length)p.sks=h}}catch{}return p}}
function SKMODE(v){SKU.mode=v;render()}
function skModeTabs(){return`<div class='x5tabs'><button class='${SKU.mode!=1?"on":""}' onclick='SKMODE(0)'>現股買賣</button><button class='${SKU.mode==1?"on":""}' onclick='SKMODE(1)'>📉 先賣後買（當沖）</button></div>`}
function SKQSH(v){const s=skSt(SKU.sel);if(!s)return;const o=skSh()[SKU.sel];if(v=="max"){SKU.q=Math.max(0,Math.min(Math.floor((S.cash-skShUsed())/s.p),SKT.maxq-(o?o.q:0)))}else if(v=="all")SKU.q=o?o.q:0;else SKU.q=v;render()}
function skLeftTx(){const m=skCutMin-skTwMin();return m<=0?"<b style='color:#e11d48'>已過 23:55</b>":`還有 <b>${Math.floor(m/60)} 小時 ${m%60} 分</b>`}
function skShortX(s){const o=skSh()[s.c];
 let h=`<div class='x5info'>${o?`今天先賣 <b>${skLot(o.q)}</b>・平均賣出價 <b>${skPx(o.a/o.q)}</b><br>目前損益（未扣費用） <b style='color:${skCol(skShPL(o,s.p))}'>${skShPL(o,s.p)>=0?"+":""}${mny(skShPL(o,s.p))}</b><br><small>⏰ 23:55 前一定要買回，${skLeftTx()}</small>`:`目前沒有空單・當沖額度剩 <b>${mny(Math.max(0,S.cash-skShUsed()))}</b><br><small>⏰ 今天 23:55 截止，${skLeftTx()}</small>`}</div>`;
 if(lv()<SKS.lv)return h+`<div class='gmsg'>🔒<br>先賣後買要 <b>Lv${SKS.lv}</b> 以上才能使用<br><small>你現在 Lv${lv()}</small></div>`+skShHelp();
 if(skBanLeft()&&!o)return h+`<div class='gmsg'>⛔<br>違約交割處分中<br><small>還要 ${Math.ceil(skBanLeft()/864e5)} 天才能當沖</small></div>`+skShHelp();
 h+=`<div class='x5chips'>${[[1000,"1 張"],[5000,"5 張"],[10000,"10 張"],[50000,"50 張"]].map(a=>`<button class='${SKU.q==a[0]?"on":""}' onclick='SKQSH(${a[0]})'>${a[1]}</button>`).join("")}<button onclick='SKQSH("max")'>額度最多</button>${o?`<button onclick='SKQSH("all")'>全部買回</button>`:""}</div>
 <input id='skq' class='x5q' type='number' inputmode='numeric' min='1' value='${SKU.q||""}' oninput='SKQIN(this)' placeholder='輸入股數'>
 <div class='x5info' id='skfee'>${skShFeeTx()}</div>
 <div style='display:flex;gap:8px;margin:6px 0 4px'><button class='x5b' style='flex:1;background:#16a34a;padding:13px' onclick='SKSHORT("s")'>先賣（做空）</button><button class='x5b' style='flex:1;background:#e11d48;padding:13px' onclick='SKSHORT("b")'>買回</button></div>`;
 return h+skShHelp()}
function skShHelp(){return`<div class='x5sub'>📉 <b>先賣後買（當沖做空）</b>：覺得今天會跌，就先賣出，跌了再買回來賺價差，<b>不用先付錢</b>。<br>・<b>當天 23:55 前一定要買回</b>。沒買回會被系統用當時價格<b>強制回補，另收 10% 罰金</b><br>・先賣的總金額不能超過你的現金（當沖額度）<br>・股票<b>漲了就會賠錢</b>，買回時結算；手續費照收，當沖交易稅減半為 0.15%<br>・賠到現金不夠付就是 <b>⚠️ 違約交割</b>：現金歸零，<b>7 天不能當沖</b><br>・Lv${SKS.lv} 以上才能使用，每支最多 1000 張</div>`}
{const _q=SKQIN;SKQIN=function(el){_q.apply(this,arguments);if(SKU.mode==1){const e=document.getElementById("skfee");e&&(e.innerHTML=skShFeeTx())}}}
function skShortList(){const sh=skSh(),ids=Object.keys(sh).filter(c=>sh[c].q>0);if(!ids.length)return"";
 return`<div class='x5h'>📉 今天的當沖空單（23:55 前要買回）</div>`+ids.map(c=>{const o=sh[c],s=skSt(c),p=s?s.p:o.a/o.q,pl=skShPL(o,p);return`<div class='x5row skrow' onclick='SKU.mode=1;SKSEL("${c}")'><div class='x5mid'><b>${c} ${esc(s?s.n:"")}</b><small>先賣 ${skLot(o.q)}・均價 ${skPx(o.a/o.q)}</small></div><div class='skpx'><b style='color:${skCol(pl)}'>${pl>=0?"+":""}${mny(pl)}</b><small>未扣費用</small></div></div>`}).join("")}
// 股市裡按「‹ 返回」：在個股／大盤頁面先回到行情，不會直接跳回桌面
{const _b=BACK2;BACK2=function(){if(ui.app=="stk"&&SKU.sel&&!document.querySelector("#bidov,#itd")){SKU.sel=null;render();const s=document.querySelector(".ph .sc");s&&(s.scrollTop=0);return}return _b.apply(this,arguments)}}

/* ===== 好友私訊、加好友：改走自家伺服器（ntfy 在手機網路共用 IP 時常被擋，造成傳不出去、加不到好友）===== */
const FRDM={h:null,tp:""};
const dmIsFr=t=>typeof t=="string"&&t.indexOf("twblindbox-pinc3r-fr-")==0;
function dmQ(){return FRDM.tp?"?f="+encodeURIComponent(FRDM.tp):""}
{const _s=x5Sub;x5Sub=function(topic,onmsg){if(dmIsFr(topic)){const ch=FRDM.tp!==topic;FRDM.h=onmsg;FRDM.tp=topic;
  // 聊天室連線已經開著、但還沒帶收件匣：重連一次，之後私訊就會即時推送
  const W2=window.__ch2ws;if(ch&&W2&&W2.ws&&W2.ws.readyState<2&&!/[?&]f=/.test(W2.ws.url||"")){try{W2.ws.close()}catch{}}}
 return _s.apply(this,arguments)}}
function dmPush(id,t,body){if(!FRDM.h||typeof body!="string")return;X5Q.push(FRDM.h,JSON.stringify({id,time:Math.floor((+t||Date.now())/1e3),event:"message",topic:FRDM.tp,message:body}));X5QT||(X5QT=setTimeout(x5Pump,0))}
function dmIn(o){if(o.t==="dmh"&&Array.isArray(o.l))o.l.forEach(x=>x&&dmPush(x.id,x.t,x.body));else if(o.t==="dm")dmPush(o.id,o.t2,o.body)}
{const _p=x5Pub;x5Pub=async function(t,o){
  if(dmIsFr(t)&&BBS.tok){for(let i=0;i<3;i++){try{const c=new AbortController(),tm=setTimeout(()=>c.abort(),8e3);
    const r=await fetch(BB+"/dm/send?t="+encodeURIComponent(t),{method:"POST",signal:c.signal,headers:{authorization:"Bearer "+BBS.tok,"content-type":"text/plain"},body:JSON.stringify(o)}).finally(()=>clearTimeout(tm));
    if(r.ok){try{if(o&&o.k=="dm"&&o.i){const x=x5S();for(const f in x.cv){const v=(x.cv[f]||[]).find(m=>m.i===o.i);if(v){v.sv=1;save();ui.app=="chat"&&typeof frRefresh=="function"&&frRefresh();break}}}}catch{}return await r.json().catch(()=>({}))}if(r.status==401){try{bbDead({status:401})}catch{}break}if(r.status==400||r.status==403||r.status==413)break}catch{}
   await new Promise(z=>setTimeout(z,1200*(i+1)))}
   return _p.apply(this,arguments)}
  return _p.apply(this,arguments)}}

/* ===== 💖 贊助作者（綠界實況主收款）：只給感謝標籤，不給遊戲幣或道具 ===== */
const DONATE_URL="";            // 綠界審核通過後，把贊助網址貼在這裡
const DONORS=[];                // 感謝名單（作者確認收款後手動加入）
function DONGO(){if(!DONATE_URL)return toast("贊助通道正在申請中，開通後會在更新日誌通知大家");try{window.open(DONATE_URL,"_blank","noopener")}catch{location.href=DONATE_URL}}
function DONCP(){const t=(S.name||"玩家")+"（ID："+(BBS.id||"")+"）";(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast("已複製，付款時貼在留言欄"),()=>toast(t))}
function DONX(){const amt=[["🧋","請作者喝杯珍奶",50],["🍱","請作者吃個便當",100],["💪","大力支持",300],["🏆","超級感謝",500]];
 return`<div class='skhd' style='display:block;background:linear-gradient(135deg,#ec4899,#f97316);color:#fff;text-align:center;padding:20px 16px'><div style='font-size:42px'>💖</div><b style='font-size:22px'>贊助作者</b><div style='font-size:14px;margin-top:6px;line-height:1.7'>台灣包裹盲盒是免費遊戲，由作者一個人製作。<br>贊助會用來支付伺服器費用，讓遊戲能繼續更新。</div></div>
${DONATE_URL?"":"<div class='x5info' style='text-align:center;background:#fff7ed;color:#9a3412'>⏳ <b>贊助通道正在向綠界申請中</b><br>開通後就能贊助，會在更新日誌通知大家。謝謝你的支持！</div>"}
 <div class='x5h'>贊助方案（自由選擇金額）</div>${amt.map(a=>`<div class='x5row'><div class='x5ic'>${a[0]}</div><div class='x5mid'><b>${a[1]}</b><small>NT$ ${a[2]}</small></div></div>`).join("")}
 <div class='x5sub'>也可以自訂其他金額。可用超商代碼、ATM 轉帳付款，由綠界科技安全處理，遊戲不會碰到你的付款資料。</div>
 <div class='x5h'>🎁 贊助後會得到</div><div class='x5info'>・聊天室、排行榜名字旁的「<b>💖 贊助者</b>」標籤<br>・遊戲裡的感謝名單<br><small>作者確認收款後手動設定，約 1–3 天。</small></div>
 <div class='x5h'>⚠️ 贊助前請看</div><div class='x5info'>・贊助<b>不會</b>得到遊戲幣、道具或存檔碼，也不影響排行榜。<br>・付款時請在<b>留言欄</b>寫上你的遊戲名稱和玩家 ID，作者才知道是誰。<br>・<b>未成年請先問過家長</b>再贊助。<br>・官方贊助<b>只有這個按鈕</b>。聊天室或私訊裡別人貼的付款連結都是假的，不要點。</div>
 <div class='x5info' style='text-align:center'>你的遊戲名稱和 ID：<b>${esc(S.name||"玩家")}</b>（${esc(BBS.id||"尚未連線")}）<br><button class='x5b off' style='background:var(--s1,#eee);color:var(--t1,#333);margin-top:6px' onclick='DONCP()'>複製，付款時貼在留言欄</button></div>
 <button class='x5big2' style='background:${DONATE_URL?"#ec4899":"#aab"};margin-top:6px' onclick='DONGO()'>${DONATE_URL?"💖 前往贊助（綠界安全付款）":"⏳ 贊助通道申請中，敬請期待"}</button>
 <div class='x5h'>🙏 感謝名單</div>${DONORS.length?`<div class='x5info'>${DONORS.map(n=>"💖 "+esc(n)).join("<br>")}</div>`:"<div class='x5sub' style='text-align:center'>還沒有人上榜，成為第一位贊助者吧！</div>"}
 <div class='x5sub' style='text-align:center'>有問題請在 IG 私訊作者 @pin.c3r_</div>`}
APPS.push(["贊助作者","💖","#ec4899","don"]);
{const _a=appX;appX=function(a){return a=="don"?DONX():_a(a)}}

/* ===== 開始畫面：換手機的人可以直接用 Google 讀回雲端存檔 ===== */
function stGoogleH(){try{if(!GCID)return"";
 if(clIAB())return`<div class='stg'>☁️ 有 Google 雲端存檔？<br><small>IG、脆、LINE 裡面不能用 Google 登入，請點右上角「⋯」→ 用 Safari／Chrome 開啟</small></div>`;
 if(CL.linked)return"";
 return`<div class='stg'>☁️ 換手機？用 Google 讀回雲端存檔<div id='gbtn' style='min-height:44px;display:flex;justify-content:center;margin-top:6px'></div></div>`}catch{return""}}
// 開始畫面比雲端存檔的程式先畫出來，所以先放一個空位，等程式都載入後再補上
function stFill(){const el=document.getElementById("stgw");if(!el||el.dataset.f)return;const h=stGoogleH();el.dataset.f="1";el.innerHTML=h;h&&setTimeout(()=>{try{clMount()}catch{}},0)}
function stGoogle(){setTimeout(stFill,0);return"<div id='stgw'></div>"}
setTimeout(stFill,0);setTimeout(stFill,800);
{const c=document.createElement("style");c.textContent=`.stg{background:#ffffff1f;border:1px solid #ffffff33;border-radius:14px;padding:10px 12px;color:#fff;font-size:14px;font-weight:700;text-align:center;line-height:1.6}.stg small{font-weight:500;color:#fffc}`;document.head.appendChild(c)}
