import admin from "firebase-admin";
const raw=process.env.FIREBASE_SERVICE_ACCOUNT;
if(!raw) throw new Error("Defina FIREBASE_SERVICE_ACCOUNT (JSON da conta de serviço) nos GitHub Secrets.");
admin.initializeApp({credential:admin.credential.cert(JSON.parse(raw))});
const db=admin.firestore(),now=Date.now(),limit=120*864e5;
const users=await db.collection("users").get();let updated=0,skipped=0;
for(const u of users.docs){
 const base=db.collection("users").doc(u.id),pSnap=await base.collection("private").doc("profile").get(),planRef=base.collection("private").doc("activePlan"),planSnap=await planRef.get();
 if(!pSnap.exists||!planSnap.exists){skipped++;continue}
 const plan=planSnap.data(),start=new Date(plan.generatedAt||plan.cycleStart||0).getTime();
 if(!start||now-start<limit)continue;
 // Não sobrescreve silenciosamente: gera uma proposta pendente para o usuário revisar.
 const pending=base.collection("private").doc("pendingPlan");
 const existing=await pending.get();if(existing.exists){skipped++;continue}
 const profile=pSnap.data(),next=makePlan(profile,plan,now);
 await pending.set({...next,awaitingUserReview:true,createdAt:admin.firestore.FieldValue.serverTimestamp()});
 updated++;
}
console.log(JSON.stringify({users:users.size,proposalsCreated:updated,skipped}));
function makePlan(p,old,now){
 const n=Math.max(2,Math.min(6,Number(p.days)||3)),split=n===2?["full","full"]:n===3?["full","upper","lower"]:n===4?["upper","lower","upper","lower"]:n===5?["upper","lower","full","upper","lower"]:["upper","lower","upper","lower","upper","lower"];
 const lib={
 academia:{upper:[["Supino máquina",3,"8–12"],["Remada baixa",3,"8–12"],["Puxada frontal",3,"10–12"],["Elevação lateral",2,"12–15"],["Tríceps na polia",2,"10–15"],["Rosca direta",2,"10–12"]],lower:[["Leg press",3,"10–12"],["Mesa flexora",3,"10–12"],["Cadeira extensora",2,"12–15"],["Elevação pélvica",3,"10–12"],["Panturrilha",3,"12–15"]],full:[["Leg press",3,"10–12"],["Supino máquina",3,"8–12"],["Puxada frontal",3,"10–12"],["Mesa flexora",2,"10–12"],["Prancha",3,"20–40 s"]]},
 casa:{upper:[["Flexão inclinada",3,"6–12"],["Remada unilateral",3,"8–12"],["Desenvolvimento",2,"10–12"],["Rosca com halteres",2,"10–15"]],lower:[["Agachamento com halter",3,"10–15"],["Levantamento romeno",3,"8–12"],["Ponte de glúteos",3,"12–15"]],full:[["Agachamento",3,"10–15"],["Flexão inclinada",3,"6–12"],["Remada unilateral",3,"8–12"]]},
 peso_corporal:{upper:[["Flexão inclinada",3,"6–12"],["Remada com elástico",3,"10–15"],["Prancha",3,"15–30 s"]],lower:[["Sentar e levantar",3,"10–15"],["Ponte de glúteos",3,"10–15"],["Panturrilha",3,"12–20"]],full:[["Agachamento",3,"10–15"],["Flexão na parede",3,"6–12"],["Ponte de glúteos",3,"10–15"]]}};
 const cat=lib[p.equipment]||lib.academia,today=new Date(now).toISOString().slice(0,10);
 return{version:1,generatedAt:today,cycleStart:today,cycleEnd:new Date(now+120*864e5).toISOString().slice(0,10),cycleDays:120,goal:p.goal,level:p.level,days:n,workouts:split.map((k,i)=>({day:i+1,name:`Treino ${String.fromCharCode(65+i)}`,exercises:(cat[k]||cat.full).map(([name,sets,reps])=>({name,sets:p.level==="iniciante"?Math.max(2,sets-1):sets,reps,restSeconds:90}))})),progression:"Progredir apenas mantendo técnica e recuperação.",nutrition:{budget:p.foodBudget??null},previousCycle:old.generatedAt,reviewRequired:!!p.limitations};
}
await admin.app().delete();
