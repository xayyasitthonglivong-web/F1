// ສ່ວນ 1: ຂໍ້ມູນໂຄງການຕົວຢ່າງ (ບໍ່ໄດ້ເກັບໃນຖານຂໍ້ມູນ).
const seedCampaigns = [
 {id:1,title:"ชุดกรองน้ำราคาประหยัดสำหรับຊຸມຊົນ",category:"ສິ່ງແວດລ້ອມ",creator:"ທີມ Blue Drop",goal:60000,raised:42300,days:12,emoji:"💧",art:"#dff5f1",description:"พัฒนาชุดกรองน้ำต้นทุนต่ำสำหรับครอบครัวในพื้นที่ที่เข้าถึงน้ำสะอาดได้ยาก พร้อมคู่มือดูแลรักษาและแผนส่งมอบให้ຊຸມຊົນ",supporters:86},
 {id:2,title:"ແອັບຊ່ວຍຈັດການລາຍຮັບລາຍຈ່າຍນັກສຶກສາ",category:"ເຕັກໂນໂລຊີ",creator:"Noy Studio",goal:45000,raised:29750,days:8,emoji:"📱",art:"#e8e6ff",description:"ສ້າງແອັບທີ່ໃຊ້ງ່າຍສຳລັບນັກສຶກສາ ເພື່ອຕິດຕາມລາຍຈ່າຍ ຕັ້ງເປົ້າໝາຍອອມເງິນ ແລະຮຽນຮູ້ພື້ນຖານການເງິນສ່ວນບຸກຄົນ",supporters:64},
 {id:3,title:"ຫ້ອງສະໝຸດນ້ອຍໃກ້ບ້ານ",category:"ຊຸມຊົນ",creator:"ອ່ານນຳກັນ",goal:35000,raised:35000,days:0,emoji:"📚",art:"#fff0d8",description:"ປ່ຽນພື້ນທີ່ວ່າງໃຫ້ເປັນມຸມອ່ານປຶ້ມ ມີປຶ້ມສຳລັບເດັກ ແລະໄວລຸ້ນ ພ້ອມກິດຈະກຳອ່ານຮ່ວມກັນທຸກອາທິດ",supporters:102},
 {id:4,title:"ປ່ຽນຂີ້ເຫຍື້ອພລາສຕິກເປັນກະຖາງຕົ້ນໄມ້",category:"ສິ່ງແວດລ້ອມ",creator:"Green Makers",goal:80000,raised:51600,days:19,emoji:"🌱",art:"#e5f6df",description:"ทดลองเวิร์กช็อปรีไซเคิลพลาสติกในท้องถิ่น ผลิตกระถางต้นไม้ และสร้างคู่มือให้โรงเรียนกับกลุ่มຊຸມຊົນทำตามได้",supporters:91},
 {id:5,title:"ສະໜາມຝຶກທັກສະກິລາເຍົາວະຊົນ",category:"ຊຸມຊົນ",creator:"Play Forward",goal:50000,raised:18400,days:22,emoji:"⚽",art:"#ffe7e2",description:"ຈັດຊື້ອຸປະກອນກິລາ ແລະເປີດກິດຈະກຳຝຶກພື້ນຖານໃຫ້ເຍົາວະຊົນຟຣີ ພ້ອມເປີດເຜີຍລາຍການຊື້ແລະການໃຊ້ເງິນ",supporters:37},
 {id:6,title:"ເກມອິນດີຜະຈົນໄພໃນໂລກແຟນຕາຊີ",category:"ສ້າງສັນ",creator:"Little Pixel",goal:100000,raised:68200,days:15,emoji:"🎮",art:"#e5e9ff",description:"ສ້າງເກມຜະຈົນໄພອິນດີທີ່ເນັ້ນການສຳຫຼວດ ປິດສະໜາ ແລະເລື່ອງລາວໃນໂລກແຟນຕາຊີ ພ້ອມໃຫ້ຜູ້ສະໜັບສະໜູນທົດລອງເດໂມ",supporters:143}
];
// ສ່ວນ 2: ກຳນົດສີຕາມໝວດໝູ່ ແລະຕົວແປຂອງໜ້າເວັບ.
const palettes={ເຕັກໂນໂລຊີ:"#e8e6ff",ສິ່ງແວດລ້ອມ:"#e5f6df",ຊຸມຊົນ:"#fff0d8",ສ້າງສັນ:"#ffe7e2"};
let campaigns=seedCampaigns.map(c=>({...c}));
let activeCategory="ທັງໝົດ", nextId=20, selectedCampaign=null;
const $=id=>document.getElementById(id);
const money=n=>"฿"+Number(n).toLocaleString("en-US");
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function progress(c){return Math.min(100,Math.round(c.raised/c.goal*100));}
// ສ່ວນ 3: ສະແດງໂຄງການ ຄົ້ນຫາ ກັ່ນຕອງ ແລະຄິດໄລ່ຍອດ.
function renderCampaigns(){
 const term=$("searchInput").value.trim().toLowerCase();
 const shown=campaigns.filter(c=>(activeCategory==="ທັງໝົດ"||c.category===activeCategory)&&[c.title,c.category,c.creator,c.description].join(" ").toLowerCase().includes(term));
 $("campaignGrid").innerHTML=shown.map(c=>`<article class="campaign-card">
  <div class="campaign-art" style="background:${palettes[c.category]||c.art}"><span class="category-tag">${escapeHTML(c.category)}</span><span class="art-emoji">${c.emoji}</span></div>
  <div class="campaign-body"><div class="campaign-meta"><span>โดย ${escapeHTML(c.creator)}</span><span class="dot"></span><span>${c.days===0?"ໝົດກຳນົດແລ້ວ": "ເຫຼືອ "+c.days+" ມື້"}</span></div>
   <h3>${escapeHTML(c.title)}</h3><p class="description">${escapeHTML(c.description)}</p>
   <div class="progress-top"><span>ระดมทุนได้ ${progress(c)}%</span><strong>${progress(c)}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${progress(c)}%"></div></div>
   <div class="campaign-footer"><div class="amount"><b>${money(c.raised)}</b><small>ຈາກເປົ້າໝາຍ ${money(c.goal)}</small></div><div class="card-actions"><button class="small-btn ghost" data-detail="${c.id}">รายละเอียด</button><button class="small-btn" data-support="${c.id}" ${c.days===0?"disabled title='แคมเปญครบกำหนดแล้ว'":""}>สนับสนุน ＋</button></div></div>
  </div></article>`).join("");
 $("emptyState").classList.toggle("hidden",shown.length!==0);
 $("statProjects").textContent=campaigns.length;
 $("statRaised").textContent=money(campaigns.reduce((sum,c)=>sum+c.raised,0));
}
// ສ່ວນ 4: ຟັງຊັນເປີດ/ປິດໜ້າຕ່າງ ແລະແຈ້ງເຕືອນ.
function openModal(id){$(id).classList.remove("hidden");document.body.style.overflow="hidden";}
function closeModal(id){$(id).classList.add("hidden");if(!document.querySelector(".modal-backdrop:not(.hidden)"))document.body.style.overflow="";}
function toast(message){const t=$("toast");t.textContent=message;t.classList.remove("hidden");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.add("hidden"),3200);}
function openSupport(id){selectedCampaign=campaigns.find(c=>c.id===Number(id));if(!selectedCampaign)return;$("supportCampaignName").textContent=selectedCampaign.title;$("supportCurrent").textContent=money(selectedCampaign.raised);$("supportGoal").textContent=money(selectedCampaign.goal);openModal("supportModal");}
function openDetail(id){
 const c=campaigns.find(x=>x.id===Number(id));if(!c)return;
 $("detailContent").innerHTML=`<div class="detail-art" style="background:${palettes[c.category]||c.art}">${c.emoji}</div><div class="eyebrow">${escapeHTML(c.category)} · สร้างโดย ${escapeHTML(c.creator)}</div><h2 id="detailTitle">${escapeHTML(c.title)}</h2><p class="detail-description">${escapeHTML(c.description)}</p><div class="progress-top"><span>ความคืบหน้าการระดมทุน</span><strong>${progress(c)}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${progress(c)}%"></div></div><div class="detail-info"><div><small>ยอดระดมทุน</small><b>${money(c.raised)}</b></div><div><small>เป้าหมาย</small><b>${money(c.goal)}</b></div><div><small>ผู้สนับสนุน</small><b>${c.supporters} คน</b></div><div><small>เวลาที่เหลือ</small><b>${c.days===0?"ໝົດກຳນົດແລ້ວ":c.days+" ມື້"}</b></div></div><div class="demo-note">เงื่อนไข: หากไม่ถึงเป้าหมายหรือไม่สามารถทำตามเงื่อนไขที่ประกาศไว้ จะต้องเข้าสู่กระบวนการคืนเงินตามกติกาของระบบจริง โปรเจกต์นี้เป็นข้อมูลตัวอย่าง</div><button class="btn btn-primary full-btn" data-support="${c.id}" ${c.days===0?"disabled":""}>สนับสนุนโปรเจกต์ตัวอย่าง →</button>`;
 openModal("detailModal");
}
// ສ່ວນ 5: ສະແດງບັນທຶກ Blockchain ຈຳລອງ.
function openAudit(){
 const entries=[["↗","สร้างแคมเปญ","บันทึกเป้าหมายและเงื่อนไขของโปรเจกต์","2026-10-14 09:30:12 · DEMO TX 0x71a...9bc2"],["＋","รับเงินสนับสนุน","บันทึกยอดสมมติและรหัสอ้างอิงธุรกรรม","2026-10-14 10:02:41 · DEMO TX 0x82f...13ad"],["▤","อัปเดตความคืบหน้า","เก็บประวัติการเปลี่ยนแปลงของแคมเปญ","2026-10-14 10:20:03 · DEMO BLOCK #000184"],["↺","กติกาการคืนเงิน","กำหนดเงื่อนไขเมื่อยอดไม่ถึงเป้าหมายหรือผิดเงื่อนไข","รอตรวจสอบโดยระบบจริง · DEMO"]];
 $("auditList").innerHTML=entries.map(e=>`<div class="audit-item"><span class="audit-symbol">${e[0]}</span><div><b>${e[1]}</b><p>${e[2]}</p><small>${e[3]}</small></div></div>`).join("");openModal("auditModal");
}
function showCreate(){openModal("createModal");}
["openCreateTop","openCreateHero","openCreate","openCreateBottom"].forEach(id=>$(id).addEventListener("click",showCreate));
["showAudit","showAudit2","showAudit3"].forEach(id=>$(id).addEventListener("click",openAudit));
$("learnRules").addEventListener("click",()=>document.querySelector(".rules-section").scrollIntoView({behavior:"smooth"}));
$("searchInput").addEventListener("input",renderCampaigns);
$("filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderCampaigns();});
$("campaignGrid").addEventListener("click",e=>{const s=e.target.closest("[data-support]"),d=e.target.closest("[data-detail]");if(s)openSupport(s.dataset.support);if(d)openDetail(d.dataset.detail);});
document.addEventListener("click",e=>{const s=e.target.closest("[data-support]");if(s&&!$("campaignGrid").contains(s)){const id=s.dataset.support;if(id)openSupport(id);}});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id);}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach(m=>closeModal(m.id));});
// ສ່ວນ 6: ຮັບຂໍ້ມູນຈາກຟອມສ້າງໂຄງການ.
$("createForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.target),goal=Number(f.get("goal")),days=Number(f.get("days"));
 const c={id:nextId++,title:String(f.get("title")).trim(),category:f.get("category"),creator:String(f.get("creator")).trim(),goal,raised:0,days,emoji:({ເຕັກໂນໂລຊີ:"💡",ສິ່ງແວດລ້ອມ:"🌱",ຊຸມຊົນ:"🤝",ສ້າງສັນ:"🎨"})[f.get("category")],art:palettes[f.get("category")],description:String(f.get("description")).trim(),supporters:0};
 campaigns.unshift(c);renderCampaigns();e.target.reset();closeModal("createModal");toast("ສ້າງໂຄງການຕົວຢ່າງສຳເລັດແລ້ວ");$("discover").scrollIntoView({behavior:"smooth"});
});
// ສ່ວນ 7: ຈຳລອງການສະໜັບສະໜູນ; ບໍ່ມີການຮັບເງິນຈິງ.
$("supportForm").addEventListener("submit",e=>{
 e.preventDefault();if(!selectedCampaign)return;const f=new FormData(e.target),amount=Number(f.get("amount"));if(!Number.isFinite(amount)||amount<10){toast("ກະລຸນາໃສ່ຈຳນວນເງິນຢ່າງໜ້ອຍ 10 ບາດ");return;}
 selectedCampaign.raised+=amount;selectedCampaign.supporters+=1;selectedCampaign.days=Math.max(1,selectedCampaign.days);renderCampaigns();closeModal("supportModal");closeModal("detailModal");e.target.reset();toast("ບັນທຶກການສະໜັບສະໜູນຈຳລອງ "+money(amount)+" ແລ້ວ (ບໍ່ມີການຮັບເງິນຈິງ)");
});
$("menuToggle").addEventListener("click",()=>{const nav=document.querySelector(".nav-links");nav.classList.toggle("mobile-open");});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav-links").classList.remove("mobile-open")));
renderCampaigns();


// ສ່ວນ 8: ລະບົບເຂົ້າລະບົບຈຳລອງ; ຍັງບໍ່ມີ backend ຫຼືການຢືນຢັນຕົວຕົນຈິງ
let currentUser = null;
let authMode = "login";
function updateAuthButton(){
 const button=$("authButton");
 if(!button)return;
 button.textContent=currentUser ? "ບັນຊີ: "+currentUser.name+" · ອອກຈາກລະບົບ" : "ເຂົ້າລະບົບ";
 button.classList.toggle("btn-quiet",!!currentUser);
 button.classList.toggle("btn-primary",!currentUser);
}
function openAuth(mode="login"){
 authMode=mode;
 document.querySelectorAll("[data-auth-mode]").forEach(b=>b.classList.toggle("active",b.dataset.authMode===authMode));
 $("authTitle").textContent=authMode==="register"?"ສະໝັກສະມາຊິກ":"ເຂົ້າລະບົບ";
 $("authName").classList.toggle("hidden",authMode!=="register");
 $("authName").required=authMode==="register";
 $("authSubmit").textContent=authMode==="register"?"ສ້າງບັນຊີທົດລອງ →":"ເຂົ້າລະບົບ →";
 $("authForm").elements.password.autocomplete=authMode==="register"?"new-password":"current-password";
 openModal("authModal");
}
function showCreate(){if(!currentUser){toast("ກະລຸນາເຂົ້າລະບົບກ່ອນສ້າງໂຄງການ");openAuth();return;}openModal("createModal");const creator=$("createForm").elements.creator;if(creator&&!creator.value)creator.value=currentUser.name;}
function openSupport(id){if(!currentUser){toast("ກະລຸນາເຂົ້າລະບົບກ່ອນສະໜັບສະໜູນໂຄງການ");openAuth();return;}selectedCampaign=campaigns.find(c=>c.id===Number(id));if(!selectedCampaign)return;$("supportCampaignName").textContent=selectedCampaign.title;$("supportCurrent").textContent=money(selectedCampaign.raised);$("supportGoal").textContent=money(selectedCampaign.goal);openModal("supportModal");}
$("authButton").addEventListener("click",()=>{
 if(currentUser){currentUser=null;try{localStorage.removeItem("seedfund_demo_user");}catch(e){}updateAuthButton();toast("ອອກຈາກລະບົບແລ້ວ");}
 else openAuth("login");
});
document.querySelectorAll("[data-auth-mode]").forEach(b=>b.addEventListener("click",()=>openAuth(b.dataset.authMode)));
$("authForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.target);const email=String(f.get("email")).trim();const password=String(f.get("password"));
 if(!email||password.length<6){toast("ກະລຸນາປ້ອນອີເມວ ແລະລະຫັດຜ່ານຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ");return;}
 const name=authMode==="register"?String(f.get("name")).trim():(email.split("@")[0]||"ສະມາຊິກ");
 if(authMode==="register"&&!name){toast("ກະລຸນາປ້ອນຊື່ສຳລັບສະແດງ");return;}
 currentUser={name:name.slice(0,40),email};
 // ບັນທຶກສະເພາະຊື່ ແລະອີເມວຂອງການເຂົ້າໃຊ້ຕົວຢ່າງ ບໍ່ໄດ້ບັນທຶກລະຫັດຜ່ານ
 try{localStorage.setItem("seedfund_demo_user",JSON.stringify(currentUser));}catch(err){}
 updateAuthButton();closeModal("authModal");e.target.reset();toast(authMode==="register"?"ສະໝັກສະມາຊິກທົດລອງສຳເລັດ":"ເຂົ້າລະບົບທົດລອງສຳເລັດ");
});
try{const saved=localStorage.getItem("seedfund_demo_user");if(saved){const parsed=JSON.parse(saved);if(parsed&&typeof parsed.name==="string"&&typeof parsed.email==="string")currentUser=parsed;}}catch(e){}
updateAuthButton();
