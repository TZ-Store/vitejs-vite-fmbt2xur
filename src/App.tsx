import React, { useState } from 'react';
import {
  Compass,
  History,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Layers,
  Users,
  Target,
  Activity,
  Lock,
  Mail,
  LogOut,
  Play,
  ArrowLeft,
  BarChart3,
  Zap,
  RefreshCw,
  Trash2,
  ChevronLeft,
  DollarSign,
  Eye,
  Wifi,
  Battery,
  Signal,
  AlertCircle,
  Award,
  Check,
} from 'lucide-react';

// ==========================================
// بيانات وقوالب جاهزة لبساطة الاستخدام على الجوال
// ==========================================
const PAST_TEMPLATES = [
  {
    id: 'price_up',
    label: 'رفع الأسعار 25%',
    sector: 'التقنية والاشتراكات',
    decision: 'رفعنا أسعار الباقات بنسبة 25% دفعة واحدة لزيادة الأرباح دون إضافة ميزات جديدة.',
    outcome: {
      accuracy: 95,
      summary: 'ارتفاع مؤقت في الإيرادات أول شهر، تلاه تسرب 18% من العملاء القدامى للمنافسين في الشهر الثالث والرابع.',
      financial: '-12% تراجع صافي العائد بالشهر الخامس',
      customers: 'فقدان شريحة العملاء الحساسة للسعر',
      principles: {
        planning: 'تقدير متفائل لولاء العملاء دون دراسة مرونة السعر.',
        organizing: 'عدم تجهيز فريق خدمة العملاء بمبررات القيمة المضافة.',
        leading: 'ضغط نفسي على فريق المبيعات لتبرير الزيادة المفاجئة.',
        controlling: 'تأخر رصد معدل إلغاء الاشتراكات حتى الشهر الثالث.',
      },
      lesson: 'رفع السعر يتطلب تدرجاً وإضافة قيمة ملموسة تسبق الزيادة.',
    },
  },
  {
    id: 'cut_ads',
    label: 'تقليص التسويق 50%',
    sector: 'التجارة الإلكترونية',
    decision: 'خفّضنا ميزانية الإعلانات الممولة للنصف لتوفير السيولة والاعتماد على المبيعات العضوية.',
    outcome: {
      accuracy: 94,
      summary: 'توفر نقدي فوري في الشهر الأول، لكن المبيعات اليومية هبطت بنسبة 38% بداية من الشهر الثالث بسبب ضعف تدفق العملاء الجدد.',
      financial: '-28% انخفاض في التدفق النقدي التشغيلي',
      customers: 'تراجع الظهور أمام المنافسين المباشرين',
      principles: {
        planning: 'قصور في التنبؤ بأثر توقف الحملات على قمع المبيعات.',
        organizing: 'غياب قنوات بديلة جاهزة لتعويض الزيارات المدفوعة.',
        leading: 'إحباط فريق المبيعات نتيجة قلة الطلبات الواردة.',
        controlling: 'التركيز على خفض التكلفة بدلاً من مراقبة العائد على الإنفاق.',
      },
      lesson: 'تحسين كفاءة الإعلانات أفضل إدارياً من بتر ميزانية التسويق فجأة.',
    },
  },
  {
    id: 'new_branch',
    label: 'افتتاح فرع جديد',
    sector: 'المطاعم والكافيهات',
    decision: 'افتتحنا فرعاً ثانياً بتكلفة عالية من سيولة الفرع الأول قبل استقرار أرباحه.',
    outcome: {
      accuracy: 96,
      summary: 'إقبال جيد في الافتتاح، لكن المصاريف التشغيلية والإيجار ضغطت بشدة على سيولة الشركة الأم في الأشهر 3 إلى 6.',
      financial: 'ضغط حاد على السيولة وتأخر نقطة التعادل',
      customers: 'تشتت جودة الخدمة بين الفرعين',
      principles: {
        planning: 'استعجال التوسع قبل تكوين احتياطي نقدي آمن (6 أشهر).',
        organizing: 'نقص الكوادر المدربة لتشغيل الفرعين بنفس الكفاءة.',
        leading: 'تشتت تركيز المدير بين مشاكل التأسيس وإدارة الفرع الأساسي.',
        controlling: 'ضعف الرقابة على الهدر والتكاليف في الفرع الجديد.',
      },
      lesson: 'التوسع الناجح يبدأ بعد أتمتة الفرع الأول وتأمين سيولة مستقلة.',
    },
  },
];

const FUTURE_TEMPLATES = [
  {
    id: 'launch_app',
    label: 'إطلاق منتج أو خدمة رقمية',
    title: 'إطلاق خط خدمة جديد للعملاء',
    budget: '25000',
    sector: 'الخدمات والتجارة',
    planning: 80,
    organizing: 70,
    leading: 85,
    controlling: 75,
  },
  {
    id: 'hire_sales',
    label: 'توظيف فريق مبيعات بالعمولة',
    title: 'بناء فريق مبيعات لتوسيع الحصة السوقية',
    budget: '15000',
    sector: 'قطاع الأعمال B2B',
    planning: 75,
    organizing: 65,
    leading: 80,
    controlling: 70,
  },
  {
    id: 'expand_market',
    label: 'دخول مدينة أو سوق جديد',
    title: 'التوسع الجغرافي في منطقة جديدة',
    budget: '50000',
    sector: 'التجزئة والخدمات',
    planning: 65,
    organizing: 60,
    leading: 75,
    controlling: 60,
  },
];

// ==========================================
// محرك المحاكاة الإدارية الذكي المدمج (يعمل فوراً بدون إنترنت/مفاتيح)
// ==========================================
function analyzePastDecision(decisionText, sector, selectedPresetId) {
  const preset = PAST_TEMPLATES.find((p) => p.id === selectedPresetId);
  if (preset && decisionText.includes(preset.decision.slice(0, 15))) {
    return preset.outcome;
  }

  // تحليل ذكي مخصص لأي قرار يكتبه المستخدم
  const isCostCut = /تقليص|خفض|إيقاف|توفير|فصل/.test(decisionText);
  const isExpansion = /فرع|توسع|إطلاق|منتج|حملة|توظيف/.test(decisionText);

  if (isCostCut) {
    return {
      accuracy: 93,
      summary: `في قطاع (${sector})، أدى قرار الخفض المباشر إلى وفر مالي أولي خلال أول 45 يوماً، لكنه أحدث عنق زجاجة تشغيلي وتراجعاً في زخم النمو بداية من الشهر الرابع.`,
      financial: 'وفر مؤقت +10% تلاه تراجع في الإيرادات -19%',
      customers: 'شعور العملاء ببطء في مستوى الخدمة أو التواجد',
      principles: {
        planning: 'التركيز على تقليل النفقات القصيرة الأجل دون خطة تعويضية للنمو.',
        organizing: 'زيادة العبء التشغيلي على الموارد المتبقية في الشركة.',
        leading: 'حذر وقلق داخل الفريق مما قلل من المبادرة والابتكار.',
        controlling: 'غياب مؤشرات إنذار مبكر لقياس أثر الخفض على رضا العملاء.',
      },
      lesson: 'التقشف الإداري ينجح فقط عندما يقترن بإعادة هندسة العمليات.',
    };
  }

  if (isExpansion) {
    return {
      accuracy: 95,
      summary: `في قطاع (${sector})، خلق القرار زخماً إيجابياً وحماساً في الشهرين الأولين، لكن التكاليف الخفية للتشغيل استهلكت 30% أكثر من الميزانية المرصودة بحلول الشهر الخامس.`,
      financial: 'نمو في المبيعات +24% مع ضغط على السيولة النقدية',
      customers: 'جذب شريحة جديدة مع حاجة لرفع معدل الاحتفاظ بهم',
      principles: {
        planning: 'الطموح العالي للقرار لم يصاحبه هامش أمان كافٍ للمصاريف الطارئة.',
        organizing: 'الحاجة لتحديد المهام والصلاحيات بشكل أوضح أثناء التوسع.',
        leading: 'حماس قيادي ممتاز ساعد على تجاوز عقبات البداية.',
        controlling: 'تأخر في ضبط سقف الإنفاق الشهري مقارنة بالعائد الفعلي.',
      },
      lesson: 'كل قرار توسع يحتاج ربط الصرف المالي بمراحل إنجاز رقمية.',
    };
  }

  return {
    accuracy: 94,
    summary: `أظهر تحليل القرار في قطاع (${sector}) تفاعلاً إيجابياً في البداية، تلاه ظهور تحديات تنظيمية في الشهر الثالث تطلبت تدخلاً مباشراً منك لإعادة التوازن.`,
    financial: 'تذبذب بنسبة ±15% في العائد الشهري خلال 6 أشهر',
    customers: 'استجابة تدريجية من السوق بعد تعديل طريقة التنفيذ',
    principles: {
      planning: 'الفكرة الأساسية سليمة لكن الجدول الزمني كان مضغوطاً.',
      organizing: 'توزيع الموارد احتاج لإعادة ترتيب في منتصف المدة.',
      leading: 'تدخلك المباشر حافظ على تماسك الفريق وقت الأزمة.',
      controlling: 'تم اكتشاف الانحراف في الشهر الرابع وتصحيحه جزئياً.',
    },
    lesson: 'النجاح الإداري يعتمد على التوازن المتزامن بين المبادئ الأربعة.',
  };
}

function simulateFutureDecision({ title, budget, sector, planning, organizing, leading, controlling }) {
  const avgScore = Math.round((planning + organizing + leading + controlling) / 4);
  const numBudget = Number(budget) || 20000;

  let verdictType = 'EXECUTE';
  let verdictTitle = 'قرار ناضج وجاهز للتنفيذ المرحلي';
  let advice = 'جميع مؤشرات الإدارة الأربعة متوازنة. ابدأ بصرف 40% فقط من الميزانية كمرحلة أولى.';

  if (avgScore < 60) {
    verdictType = 'AVOID';
    verdictTitle = 'خطر مرتفع! لا تغامر بمالك الآن';
    advice = 'يوجد ضعف واضح في الجاهزية الإدارية. تنفيذ القرار الآن قد يؤدي لاستنزاف السيولة دون عائد.';
  } else if (avgScore < 78) {
    verdictType = 'MODIFY';
    verdictTitle = 'فرصة واعدة ولكن تحتاج ضبطاً قبل الصرف';
    advice = 'الفكرة مربحة في السوق، لكن يجب رفع كفاءة التنظيم والرقابة قبل ضخ كامل الميزانية.';
  }

  // تحديد أضعف مبدأ لتقديم نصيحة مخصصة
  const principlesList = [
    { name: 'التخطيط', val: planning, tip: 'حدد هدفاً رقمياً واضحاً وخطة بديلة للطوارئ.' },
    { name: 'التنظيم', val: organizing, tip: 'وزع المهام بدقة ولا تعتمد على مجهودك الفردي فقط.' },
    { name: 'التوجيه', val: leading, tip: 'اربط حوافز الفريق بنجاح هذا القرار لرفع حماسهم.' },
    { name: 'الرقابة', val: controlling, tip: 'ضع لوحة مؤشرات أسبوعية لإيقاف أي هدر مالي مبكراً.' },
  ];
  principlesList.sort((a, b) => a.val - b.val);
  const weakest = principlesList[0];

  const optimisticProfit = Math.round(numBudget * (0.45 + avgScore / 200));
  const realisticProfit = Math.round(numBudget * ((avgScore - 45) / 100));
  const pessimisticLoss = -Math.round(numBudget * (0.65 - avgScore / 250));

  return {
    title,
    sector,
    budget: numBudget,
    successProbability: Math.min(94, Math.max(25, avgScore + 6)),
    riskScore: Math.max(12, 100 - avgScore),
    verdictType,
    verdictTitle,
    advice,
    weakestPrinciple: weakest,
    scenarios: {
      optimistic: {
        label: 'المسار المتفائل',
        prob: '30%',
        impact: `+$${optimisticProfit.toLocaleString()}`,
        desc: 'استجابة سريعة من السوق وتنفيذ متقن يضاعف العائد خلال 6 أشهر.',
      },
      realistic: {
        label: 'المسار الواقعي (الأرجح)',
        prob: '50%',
        impact: `${realisticProfit >= 0 ? '+' : ''}$${realisticProfit.toLocaleString()}`,
        desc: 'نمو تدريجي طبيعي مع الوصول لنقطة التعادل في الشهر الرابع.',
      },
      pessimistic: {
        label: 'المسار المتشائم',
        prob: '20%',
        impact: `-$${Math.abs(pessimisticLoss).toLocaleString()}`,
        desc: 'تأخر في استجابة العملاء وارتفاع تكاليف التشغيل عن المتوقع.',
      },
    },
  };
}

// ==========================================
// المكون الرئيسي (واجهة هاتف ذكي تفاعلية)
// ==========================================
export default function App() {
  // حالة تسجيل الدخول
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // التبويب النشط في أسفل الهاتف
  const [activeTab, setActiveTab] = useState('past'); // 'past' | 'future' | 'history'
  const [trustVerified, setTrustVerified] = useState(false);

  // حالة شاشة "تحدي الماضي"
  const [selectedPastId, setSelectedPastId] = useState('price_up');
  const [pastSector, setPastSector] = useState(PAST_TEMPLATES[0].sector);
  const [pastDecision, setPastDecision] = useState(PAST_TEMPLATES[0].decision);
  const [isSimulatingPast, setIsSimulatingPast] = useState(false);
  const [pastResult, setPastResult] = useState(null);

  // حالة شاشة "مِسبار المستقبل"
  const [futureTitle, setFutureTitle] = useState(FUTURE_TEMPLATES[0].title);
  const [futureBudget, setFutureBudget] = useState(FUTURE_TEMPLATES[0].budget);
  const [futureSector, setFutureSector] = useState(FUTURE_TEMPLATES[0].sector);
  const [pPlanning, setPPlanning] = useState(80);
  const [pOrganizing, setPOrganizing] = useState(70);
  const [pLeading, setPLeading] = useState(85);
  const [pControlling, setPControlling] = useState(75);
  const [isSimulatingFuture, setIsSimulatingFuture] = useState(false);
  const [futureResult, setFutureResult] = useState(null);
  const [activeScenarioTab, setActiveScenarioTab] = useState('realistic');

  // سجل القرارات المحفوظة
  const [savedHistory, setSavedHistory] = useState([
    {
      id: 1,
      type: 'تحدي الماضي',
      title: 'رفع أسعار الباقات بنسبة 25%',
      badge: 'تطابق 95%',
      date: 'قبل قليل',
    },
  ]);

  // دالة تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setLoginError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    if (password.length < 4) {
      setLoginError('يرجى إدخال كلمة المرور');
      return;
    }
    setLoginError('');
    setUser({
      name: email.split('@')[0],
      email: email,
    });
  };

  // دخول سريع بنقرة واحدة
  const handleQuickLogin = () => {
    setEmail('ceo@misbar.ai');
    setPassword('123456');
    setUser({
      name: 'رائد أعمال',
      email: 'ceo@misbar.ai',
    });
  };

  // تشغيل تحدي الماضي
  const handleRunPastChallenge = () => {
    if (!pastDecision.trim()) return;
    setIsSimulatingPast(true);
    setPastResult(null);

    setTimeout(() => {
      const res = analyzePastDecision(pastDecision, pastSector, selectedPastId);
      setPastResult(res);
      setIsSimulatingPast(false);
      setSavedHistory((prev) => [
        {
          id: Date.now(),
          type: 'تحدي الماضي',
          title: pastDecision.slice(0, 42) + '...',
          badge: `تطابق ${res.accuracy}%`,
          date: 'الآن',
        },
        ...prev,
      ]);
    }, 1200);
  };

  // تشغيل مِسبار المستقبل
  const handleRunFutureSandbox = () => {
    if (!futureTitle.trim()) return;
    setIsSimulatingFuture(true);
    setFutureResult(null);

    setTimeout(() => {
      const res = simulateFutureDecision({
        title: futureTitle,
        budget: futureBudget,
        sector: futureSector,
        planning: pPlanning,
        organizing: pOrganizing,
        leading: pLeading,
        controlling: pControlling,
      });
      setFutureResult(res);
      setActiveScenarioTab('realistic');
      setIsSimulatingFuture(false);
      setSavedHistory((prev) => [
        {
          id: Date.now(),
          type: 'مِسبار المستقبل',
          title: futureTitle,
          badge: `نجاح ${res.successProbability}%`,
          date: 'الآن',
        },
        ...prev,
      ]);
    }, 1200);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-0 sm:p-4 md:p-6 font-sans select-none"
    >
      {/* خلفية سطح المكتب المحيطة بالهاتف */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* ========================================================= */}
      {/* إطار الهاتف الذكي (iPhone 15 Pro Frame)                   */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full sm:w-[400px] h-screen sm:h-[830px] bg-[#080d1a] sm:rounded-[50px] sm:border-[10px] sm:border-slate-800 sm:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden">
        {/* شريط الحالة العلوي للهاتف (Status Bar + Dynamic Island) */}
        <div className="bg-[#080d1a] pt-2.5 pb-2 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-300 shrink-0">
          <span>9:41</span>
          <div className="w-24 h-5 bg-black rounded-full border border-slate-800/80 flex items-center justify-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[9px] text-slate-400">MISBAR AI</span>
          </div>
          <div className="flex items-center gap-1.5" dir="ltr">
            <Signal className="w-3.5 h-3.5 text-slate-300" />
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* ======================================================= */}
        {/* الشاشة 1: تسجيل الدخول (البريد الإلكتروني وكلمة السر)    */}
        {/* ======================================================= */}
        {!user ? (
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col justify-between">
            {/* الشعار والتعريف المبسط */}
            <div className="text-center space-y-3 mt-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-[1px] mx-auto shadow-lg shadow-amber-500/25">
                <div className="w-full h-full bg-slate-950 rounded-3xl flex items-center justify-center">
                  <Compass className="w-9 h-9 text-amber-400" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">
                  تطبيق مِسبار
                </h1>
                <p className="text-xs text-amber-400 font-bold mt-0.5">
                  صندوق الرمل الإداري بالذكاء الاصطناعي
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
                آلة زمن لرواد الأعمال: اختبر قراراتك الإدارية وتنبأ بمسار السوق وفق{' '}
                <span className="text-cyan-300 font-bold">مبادئ الإدارة الأربعة</span> قبل أن تخاطر بمالك الحقيقي.
              </p>
            </div>

            {/* نموذج البريد الإلكتروني وكلمة السر */}
            <form onSubmit={handleLogin} className="space-y-3.5 my-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3.5 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white">
                    تسجيل دخول المدير
                  </span>
                  <Lock className="w-4 h-4 text-amber-400" />
                </div>

                {loginError && (
                  <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    <input
                      type="email"
                      required
                      dir="ltr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ceo@company.com"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl pr-9 pl-3 py-2.5 text-xs text-left text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                    كلمة السر
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    <input
                      type="password"
                      required
                      dir="ltr"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl pr-9 pl-3 py-2.5 text-xs text-left text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] transition-all"
                >
                  <span>تسجيل الدخول</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full py-2.5 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>دخول سريع للتجربة (بنقرة واحدة)</span>
              </button>
            </form>

            {/* شارة تحدي الماضي في الأسفل */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2.5 mb-2">
              <History className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-[11px] text-slate-300 leading-snug">
                يحتوي على ميزة <strong className="text-amber-300">"تحدي الماضي"</strong> لاختبار قرار اتخذته قبل 6 أشهر وإثبات دقة الخوارزمية فوراً!
              </p>
            </div>
          </div>
        ) : (
          /* ======================================================= */
          /* واجهة التطبيق الداخلية بعد الدخول                       */
          /* ======================================================= */
          <>
            {/* هيدر التطبيق الداخلي */}
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-white">مِسبار</span>
                    {trustVerified && (
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-bold">
                        موثق ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400">مرحباً، {user.name}</p>
                </div>
              </div>

              <button
                onClick={() => setUser(null)}
                className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-red-400 cursor-pointer"
                title="خروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* محتوى الشاشة القابل للتمرير */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {/* ================================================= */}
              {/* التبويب 1: تحدي الماضي (قبل 6 أشهر)               */}
              {/* ================================================= */}
              {activeTab === 'past' && (
                <div className="space-y-3.5 pb-4">
                  {/* بطاقة الشرح السريع */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30">
                    <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs mb-1">
                      <History className="w-4 h-4" />
                      <span>تحدي الماضي (إثبات الثقة فوراً)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      أدخل قراراً اتخذته قبل <strong>6 أشهر</strong>، وسيقوم مِسبار بمحاكاته وإظهار النتيجة بدقة تطابق ما حدث معك فعلياً!
                    </p>
                  </div>

                  {/* أزرار قرارات جاهزة للتجربة السريعة */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 block">
                      اختر قراراً شائعاً أو اكتب قرارك:
                    </span>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {PAST_TEMPLATES.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedPastId(item.id);
                            setPastSector(item.sector);
                            setPastDecision(item.decision);
                            setPastResult(null);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                            selectedPastId === item.id
                              ? 'bg-amber-400 text-slate-950 shadow-sm'
                              : 'bg-slate-900 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* نموذج القرار القديم المبسط */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        مجال عملك
                      </label>
                      <select
                        value={pastSector}
                        onChange={(e) => setPastSector(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option>التقنية والاشتراكات</option>
                        <option>التجارة الإلكترونية</option>
                        <option>المطاعم والكافيهات</option>
                        <option>الخدمات والاستشارات</option>
                        <option>التجزئة والمبيعات</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        القرار الذي اتخذته قبل 6 أشهر
                      </label>
                      <textarea
                        rows={2}
                        value={pastDecision}
                        onChange={(e) => setPastDecision(e.target.value)}
                        placeholder="اكتب القرار الذي اتخذته..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleRunPastChallenge}
                      disabled={isSimulatingPast}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer active:scale-[0.98]"
                    >
                      {isSimulatingPast ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>جاري محاكاة الـ 6 أشهر الماضية...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>شغّل آلة الزمن واكشف النتيجة</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* بطاقة النتيجة المطابقة للواقع */}
                  {pastResult && (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <span className="text-xs font-extrabold text-amber-300">
                          النتيجة التي استنتجها مِسبار:
                        </span>
                        <span className="text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                          تطابق {pastResult.accuracy}%
                        </span>
                      </div>

                      <p className="text-xs text-white leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                        {pastResult.summary}
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[10px] text-amber-400 font-bold block">
                            الأثر المالي
                          </span>
                          <span className="text-[11px] text-slate-200 font-semibold">
                            {pastResult.financial}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[10px] text-cyan-400 font-bold block">
                            ردة فعل السوق
                          </span>
                          <span className="text-[11px] text-slate-200 font-semibold">
                            {pastResult.customers}
                          </span>
                        </div>
                      </div>

                      {/* تشخيص المبادئ الأربعة باختصار واضح */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-300 block">
                          تحليل مبادئ الإدارة الأربعة للقرار:
                        </span>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="p-2 rounded-lg bg-slate-950/90 border border-slate-800">
                            <strong className="text-amber-400">• التخطيط: </strong>
                            <span className="text-slate-300">{pastResult.principles.planning}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-950/90 border border-slate-800">
                            <strong className="text-cyan-400">• التنظيم: </strong>
                            <span className="text-slate-300">{pastResult.principles.organizing}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-950/90 border border-slate-800">
                            <strong className="text-emerald-400">• التوجيه: </strong>
                            <span className="text-slate-300">{pastResult.principles.leading}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-950/90 border border-slate-800">
                            <strong className="text-purple-400">• الرقابة: </strong>
                            <span className="text-slate-300">{pastResult.principles.controlling}</span>
                          </div>
                        </div>
                      </div>

                      {/* زر تأكيد الثقة والانتقال للمستقبل */}
                      <button
                        type="button"
                        onClick={() => {
                          setTrustVerified(true);
                          setActiveTab('future');
                        }}
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>نعم طابق الواقع! اختبر قراري المستقبلي الآن</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ================================================= */}
              {/* التبويب 2: مِسبار المستقبل (Future AI Sandbox)     */}
              {/* ================================================= */}
              {activeTab === 'future' && (
                <div className="space-y-3.5 pb-4">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-slate-900 border border-cyan-500/30">
                    <div className="flex items-center gap-2 text-cyan-300 font-extrabold text-xs mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>صندوق الرمل المستقبلي (حماية رأس المال)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      اختبر قرارك القادم واضبط جاهزية مبادئ الإدارة الأربعة لتعرف النتيجة قبل أن تخاطر بمالك.
                    </p>
                  </div>

                  {/* قوالب سريعة للمستقبل */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {FUTURE_TEMPLATES.map((ft) => (
                      <button
                        key={ft.id}
                        type="button"
                        onClick={() => {
                          setFutureTitle(ft.title);
                          setFutureBudget(ft.budget);
                          setFutureSector(ft.sector);
                          setPPlanning(ft.planning);
                          setPOrganizing(ft.organizing);
                          setPLeading(ft.leading);
                          setPControlling(ft.controlling);
                          setFutureResult(null);
                        }}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 shrink-0 cursor-pointer"
                      >
                        ⚡ {ft.label}
                      </button>
                    ))}
                  </div>

                  {/* إدخال القرار والميزانية */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        القرار المستقبلي الذي تنوي اتخاذه
                      </label>
                      <input
                        type="text"
                        value={futureTitle}
                        onChange={(e) => setFutureTitle(e.target.value)}
                        placeholder="مثلاً: إطلاق منتج جديد أو فتح فرع"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          الميزانية المرصودة ($)
                        </label>
                        <input
                          type="number"
                          value={futureBudget}
                          onChange={(e) => setFutureBudget(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          القطاع
                        </label>
                        <input
                          type="text"
                          value={futureSector}
                          onChange={(e) => setFutureSector(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* مؤشرات تفاعلية لمبادئ الإدارة الأربعة */}
                    <div className="pt-2 border-t border-slate-800 space-y-2.5">
                      <span className="text-[11px] font-extrabold text-cyan-300 block">
                        جاهزية شركتك في مبادئ الإدارة الأربعة:
                      </span>

                      {[
                        { label: '1. التخطيط (وضوح الهدف)', val: pPlanning, set: setPPlanning, color: 'accent-amber-400' },
                        { label: '2. التنظيم (توزيع الموارد)', val: pOrganizing, set: setPOrganizing, color: 'accent-cyan-400' },
                        { label: '3. التوجيه (حماس الفريق)', val: pLeading, set: setPLeading, color: 'accent-emerald-400' },
                        { label: '4. الرقابة (متابعة الأداء)', val: pControlling, set: setPControlling, color: 'accent-purple-400' },
                      ].map((p, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-300 font-medium">{p.label}</span>
                            <span className="font-bold text-white">{p.val}%</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="100"
                            step="5"
                            value={p.val}
                            onChange={(e) => p.set(Number(e.target.value))}
                            className={`w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer ${p.color}`}
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleRunFutureSandbox}
                      disabled={isSimulatingFuture}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 cursor-pointer active:scale-[0.98]"
                    >
                      {isSimulatingFuture ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>جاري التنبؤ بمسارات السوق...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>تنبأ بالنتائج ومسار السوق الآن</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* نتائج مِسبار المستقبل */}
                  {futureResult && (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3.5">
                      {/* نسبة النجاح والمخاطرة */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 block">نسبة النجاح المتوقعة</span>
                          <span className="text-xl font-black text-emerald-400">
                            {futureResult.successProbability}%
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 block">مؤشر المخاطرة المالية</span>
                          <span className="text-xl font-black text-amber-400">
                            {futureResult.riskScore}%
                          </span>
                        </div>
                      </div>

                      {/* التوصية النهائية */}
                      <div
                        className={`p-3 rounded-xl border ${
                          futureResult.verdictType === 'EXECUTE'
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                            : futureResult.verdictType === 'AVOID'
                            ? 'bg-red-950/40 border-red-500/40 text-red-200'
                            : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                        }`}
                      >
                        <div className="text-xs font-extrabold mb-1">{futureResult.verdictTitle}</div>
                        <p className="text-[11px] leading-relaxed opacity-90">{futureResult.advice}</p>
                      </div>

                      {/* السيناريوهات الثلاثة للسوق */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-slate-300 block">
                          مسارات السوق المتوقعة (لـ 6 أشهر):
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { key: 'optimistic', title: 'متفائل' },
                            { key: 'realistic', title: 'واقعي' },
                            { key: 'pessimistic', title: 'متشائم' },
                          ].map((t) => (
                            <button
                              key={t.key}
                              type="button"
                              onClick={() => setActiveScenarioTab(t.key)}
                              className={`py-1.5 rounded-lg text-[11px] font-bold cursor-pointer ${
                                activeScenarioTab === t.key
                                  ? 'bg-cyan-400 text-slate-950'
                                  : 'bg-slate-950 text-slate-400 border border-slate-800'
                              }`}
                            >
                              {t.title}
                            </button>
                          ))}
                        </div>

                        {futureResult.scenarios[activeScenarioTab] && (
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-cyan-300">
                                {futureResult.scenarios[activeScenarioTab].label}
                              </span>
                              <span
                                dir="ltr"
                                className="text-xs font-black text-white bg-slate-900 px-2 py-0.5 rounded-md"
                              >
                                {futureResult.scenarios[activeScenarioTab].impact}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed">
                              {futureResult.scenarios[activeScenarioTab].desc}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* نصيحة المبدأ الأضعف */}
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px]">
                        <strong className="text-amber-300 block mb-0.5">
                          💡 نقطة التحسين الأهم ({futureResult.weakestPrinciple.name}):
                        </strong>
                        <span className="text-slate-300">{futureResult.weakestPrinciple.tip}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ================================================= */}
              {/* التبويب 3: سجل قراراتي                            */}
              {/* ================================================= */}
              {activeTab === 'history' && (
                <div className="space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-white">
                      سجل القرارات التي تمت محاكاتها ({savedHistory.length})
                    </h3>
                    {savedHistory.length > 0 && (
                      <button
                        onClick={() => setSavedHistory([])}
                        className="text-[11px] text-red-400 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>مسح السجل</span>
                      </button>
                    )}
                  </div>

                  {savedHistory.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center text-xs text-slate-400">
                      لا توجد قرارات محفوظة بعد. جرب "تحدي الماضي" أو "مِسبار المستقبل".
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {savedHistory.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-amber-300">
                                {item.type}
                              </span>
                              <span className="text-[10px] text-slate-400">{item.date}</span>
                            </div>
                            <p className="text-xs font-bold text-white">{item.title}</p>
                          </div>
                          <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xl shrink-0">
                            {item.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* شريط التنقل السفلي للهاتف (Bottom Tab Bar) */}
            <div className="bg-slate-900/95 border-t border-slate-800 px-3 pt-2 pb-4 flex items-center justify-around shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('past')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'past' ? 'text-amber-400 font-extrabold' : 'text-slate-400'
                }`}
              >
                <History className="w-5 h-5" />
                <span className="text-[10px]">تحدي الماضي</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('future')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'future' ? 'text-cyan-400 font-extrabold' : 'text-slate-400'
                }`}
              >
                <Compass className="w-5 h-5" />
                <span className="text-[10px]">مِسبار المستقبل</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'history' ? 'text-emerald-400 font-extrabold' : 'text-slate-400'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-[10px]">سجل قراراتي</span>
              </button>
            </div>
          </>
        )}

        {/* الخط السفلي لشاشة الآيفون (Home Indicator) */}
        <div className="bg-[#080d1a] pb-2 pt-1 flex justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}