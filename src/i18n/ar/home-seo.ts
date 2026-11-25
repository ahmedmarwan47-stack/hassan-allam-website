// Homepage Arabic copy, word for word from the client's SEO document
// ("SEO Copy - Hassan Allam - Home", the Home "/" page). Only text that has a
// matching spot on the homepage is used; everything else in the document is
// left out. Merged last, so it overrides earlier drafts.
// Keys ending in "@<ctx>" apply only where a homepage component asks for that
// context, so shared words elsewhere on the site keep their own Arabic.
const ar: Record<string, string> = {
  // 1. Hero — the H1, split over the hero's two designed lines
  "The Luxury": "حسن علام للعقارات:",
  "of Certainty.": "رفاهية مبنية على الثقة والاستقرار",
  "The Luxury of Certainty.": "حسن علام للعقارات: رفاهية مبنية على الثقة والاستقرار",
  "See the Showreel": "شاهد الفيديو التعريفي للشركة",

  // 2. Asset classes — heading (phones: one block; desktop: three lines) and cards
  "Asset Classes, Tailored for the Way You Live.": "قطاعات استثمارية تلائم تطلعات أسلوب حياتك",
  "Asset Classes,": "قطاعات استثمارية",
  "Tailored for": "تلائم تطلعات",
  "the Way You Live.": "أسلوب حياتك",
  "Residential@asset": "القطاع السكني",
  "Hospitality & Leisure@asset": "الضيافة والترفيه",
  "Curated Retail & Dining@asset": "مساحات التسوق والمطاعم",
  "Sports & Wellness@asset": "المرافق الرياضية والصحية",
  "Office Space@asset": "المكاتب والمساحات الإدارية",

  // 4. Nationwide portfolio
  "25 Strategic Mixed Use Developments with a Nationwide Footprint.":
    "25 مشروعاً استراتيجياً متعدداً ومتكاملاً في جميع أنحاء مصر",
  "With 25 developments and sub-developments across Egypt, Hassan Allam Properties leaves a thoughtful mark, spanning vibrant cities and coastal escapes, each shaped by vision, design integrity, and long-term value.":
    "تضم محفظة حسن علام للعقارات 25 مشروعاً وتطويراً فرعياً ممتداً عبر المدن الحيوية والوجهات الساحلية، تجسد رؤية واضحة والتزاماً بالدقة الهندسية وتحقيق قيمة طويلة الأمد.",

  // 5. Projects gallery — heading (city tab), tabs and card names
  "Explore our {group} projects@In The City": "استكشف مشروعاتنا في قلب المدن المصرية",
  "In The City@gallery": "استعرض مشروعات المدن",
  "By The Sea@gallery": "استعرض المشروعات الساحلية",
  "Haptown Mostakbal City@gallery": "كمبوند هاب تاون المستقبل سيتي",
  "KEYS 52@gallery": "مشروع كيز 52",
  "Park Central Mostakbal City@gallery": "كمبوند بارك سنترال المستقبل سيتي",
  "Parkview Katameya@gallery": "كمبوند بارك فيو القطامية",
  "Seasons Residence@gallery": "كمبوند سيزونز ريزيدنس",
  "SwanLake Katameya@gallery": "سوان ليك القطامية",
  "SwanLake October@gallery": "سوان ليك أكتوبر",
  "SwanLake Residences New Cairo@gallery": "سوان ليك ريزيدنس القاهرة الجديدة",
  "SwanLake West@gallery": "سوان ليك ويست",
  "The Valleys Mostakbal City@gallery": "كمبوند ذا فاليز المستقبل سيتي",
  "XCHANGE@gallery": "مشروع إكس تشينج",
  "XCHANGE @gallery": "مشروع إكس تشينج",

  // 6. Interactive map
  "Discover a portfolio that moves with the nation.": "محفظة عقارية استثنائية تواكب نمو مصر وتطورها",
  "Navigate our portfolio with ease. Filter by “In the City” or “By the Sea” to find developments that reflect your way of living.":
    "تصفح مشروعاتنا بسهولة وصنف الوجهات بحسب رغبتك؛ سواء كنت تبحث عن سكن عصري في المدينة أو ملاذ هادئ على شاطئ البحر.",
  "All projects ({count})@home-map": "تصفح جميع مشروعات حسن علام",

  // 8. Leadership quote and history
  "“There is no greater pleasure than crafting {a} communities where harmony and {b} translate into everyday life.”":
    "«لا سعادة تضاهي بناء مجتمعات تحتفي بالعائلة، حيث تلتقي الألفة والخصوصية في تفاصيل الحياة اليومية.»",
  "Mohamed Allam — CEO & Vice Chairman": "محمد علام — الرئيس التنفيذي ونائب رئيس مجلس الإدارة",
  "Mohamed Allam — CEO & Vice Chairman ": "محمد علام — الرئيس التنفيذي ونائب رئيس مجلس الإدارة",
  "The Story@home": "قصة نجاح حسن علام",
  "Since the 1990s, Hassan Allam Properties has shaped a distinguished presence in Egypt’s real estate landscape, known for crafting intimate, high-quality communities where families come first.":
    "منذ تسعينيات القرن الماضي، أرست شركة حسن علام للعقارات مكانة رائدة في المشهد العقاري المصري عبر تشييد مجتمعات راقية تضع احتياجات الأسرة في صميم أولوياتها.",
  "Discover the story": "اقرأ قصة شركة حسن علام",

  // 9. Facts and figures — the figure stays the number; the rest of each
  // line is the label (and the unit where there is one)
  "Facts and Figures@home": "أرقام وإنجازات تعكس حجم الثقة ومسيرة النجاح",
  "Nationwide mixed-use flagship developments@home": "مشروعاً رائداً متعدد الاستخدامات على مستوى جمهورية مصر العربية",
  "Commercial and Hospitality asset classes@home": "مساحات مخصصة لقطاعات الضيافة والمراكز التجارية",
  "Citizens@home": "مواطن ومقيم يعيشون في مجتمعاتنا",
  "Crystal Lagoons@home": "من بحيرات الكريستال لاجونز المائية",
  "Sqm@home": "متر مربع",

  // 10. Media center — heading, the three card titles, button
  "Stay Updated": "المركز الإعلامي: تابع أحدث الأخبار والفعاليات",
  "HAP X Partners Park Central Exclusive Orientation Session@home": "جلسة تعريفية حصرية لشركاء مشروع بارك سنترال",
  "Investgate ACE Awards - The second edition@home": "حفل جوائز إنفستجيت للتميز العقاري - النسخة الثانية",
  "Eden Facility Management has been awarded the facility management works for the Embassy of Denmark in Egypt.@home":
    "إيدن لإدارة المرافق تفوز بعقد إدارة سفارة الدنمارك في مصر",
  "Read more@home-news": "تصفح أحدث أخبار حسن علام",

  // 11. Mobile app — the phone layout (HAP Family kept in English)
  "Stay connected with HAP Family App.@app-mobile": "تطبيق HAP Family: بوابتك الرقمية لإدارة وحدتك السكنية",
  "Manage your property seamlessly, anytime, from your phone.@app-mobile":
    "تحكم في كافة خدمات وحدتك العقارية بكل سهولة وفي أي وقت من هاتفك الذكي عبر تطبيق HAP Family.",
  "Explore Your Community": "استكشف خدمات ومرافق مجتمعك السكني وتواصل مع الجيران",
  "Request Home Services Instantly": "اطلب خدمات الصيانة والرعاية المنزلية الفورية بضغطة زر",
  "Pay Bills with Ease": "سدد الفواتير ومستحقات الصيانة بأمان وسرعة",
  "Download app": "حمّل تطبيق حسن علام HAP Family",

  // 12. App download — the desktop layout (HAP Family kept in English)
  "Stay connected with HAP Family App.@app-desktop": "تجربة معيشية متصلة بين يديك مع تطبيق HAP Family",
  "Manage your property seamlessly, anytime, from your phone.@app-desktop":
    "امسح رمز الاستجابة السريعة (QR Code) أو حمّل التطبيق مباشرة عبر App Store وGoogle Play للوصول إلى كافة الخدمات السكنية.",
  "Scan to download": "امسح الرمز لتحميل تطبيق HAP Family",
};
export default ar;
