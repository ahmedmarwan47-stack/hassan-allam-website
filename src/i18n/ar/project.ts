// Arabic translations — keyed by the exact English text.
// Project detail, neighborhood and unit pages (src/components/sections/{project-detail,neighborhood,unit}).
const ar: Record<string, string> = {
  // Section nav
  Overview: "نظرة عامة",
  "Master Plan": "المخطط العام",
  Gallery: "معرض الصور",
  Amenities: "المرافق",
  "The Story": "الحكاية",
  Homes: "المنازل",
  "Construction Updates": "مستجدات الإنشاء",
  "Request Interest": "سجّل اهتمامك",
  "Unit Types": "أنواع الوحدات",

  // Project page copy
  "From garden apartments to standalone villas — every home is designed around light, privacy and outdoor living.":
    "من شقق الحدائق إلى الفيلات المستقلة — صُمّم كل منزل حول الضوء والخصوصية والحياة في الهواء الطلق.",
  "Please send me the project brochure.": "أرجو إرسال كتيّب المشروع إليّ.",

  // Master plan + drawer
  "{name} master plan": "المخطط العام لمشروع {name}",
  "{name} — view details": "{name} — عرض التفاصيل",
  "Neighborhood {n}": "الحي {n}",
  "I’m interested in {name}.": "أنا مهتم بـ {name}.",
  Close: "إغلاق",
  Previous: "السابق",
  Next: "التالي",
  "Discover more": "اكتشف المزيد",
  "Request interest": "سجّل اهتمامك",

  // Neighborhood page
  "Homes at {name}": "منازل في {name}",
  "at {name}": "في {name}",

  // Unit types section + cards
  Type: "النوع",
  Bedrooms: "غرف النوم",
  Bathrooms: "الحمّامات",
  All: "الكل",
  "{n} Bedrooms": "{n} غرف نوم",
  "{n} Bathrooms": "{n} حمّامات",
  "{beds} Bedrooms · {baths} Bathrooms · {area} m²": "{beds} غرف نوم · {baths} حمّامات · {area} م²",
  "No unit types match these filters — try another type or number of bedrooms.":
    "لا توجد وحدات تطابق هذه الاختيارات — جرّب نوعًا آخر أو عددًا مختلفًا من غرف النوم.",
  "{name} — discover more": "{name} — اكتشف المزيد",
  "unit types": "أنواع الوحدات",
  photos: "الصور",
  phases: "المراحل",

  // Unit categories (data values, also used as form options and filters)
  Apartment: "شقة",
  Duplex: "دوبلكس",
  Penthouse: "بنتهاوس",
  Townhouse: "تاون هاوس",
  "Twin House": "توين هاوس",
  Villa: "فيلا",

  // Unit page
  "Back to {name}": "العودة إلى {name}",
  "Total built-up area": "إجمالي المساحة المبنية",
  "Land area": "مساحة الأرض",
  "& Features": "والمميزات",
  "the {name}": "{name}",

  // Construction timeline
  "Watch it take shape, phase by phase": "تابِع المشروع وهو يكتمل، مرحلةً بعد مرحلة",
  "Last updated {date}": "آخر تحديث {date}",
  "Phase {n}": "المرحلة {n}",
  "Phase {n} / {total}": "المرحلة {n} / {total}",
  "Phase {n}: {title} ({status})": "المرحلة {n}: {title} ({status})",
  Completed: "مكتملة",
  "In progress": "قيد التنفيذ",
  Upcoming: "قادمة",
  Progress: "التقدّم",
  "{done} of {n} phases complete": "اكتملت {done} من {n} مراحل",

  // Request interest form
  "Find your home at {name}": "اعثر على منزلك في {name}",
  "Tell us what you’re looking for and a HAP sales advisor will get back to you with availability, payment plans and a private viewing.":
    "أخبرنا بما تبحث عنه، وسيتواصل معك أحد مستشاري المبيعات في حسن علام العقارية لإطلاعك على الوحدات المتاحة وخطط السداد وترتيب معاينة خاصة.",
  "Thank you, {name}": "شكرًا لك، {name}",
  "Your request for {name} is in. An advisor will reach you by {method} within one working day.":
    "تم استلام طلبك بخصوص {name}. سيتواصل معك أحد المستشارين عبر {method} خلال يوم عمل واحد.",
  phone: "الهاتف",
  whatsapp: "واتساب",
  email: "البريد الإلكتروني",
  "First name": "الاسم الأول",
  "Last name": "اسم العائلة",
  Phone: "الهاتف",
  Email: "البريد الإلكتروني",
  WhatsApp: "واتساب",
  "Interested in": "مهتم بـ",
  "Preferred contact": "وسيلة التواصل المفضّلة",
  "Message (optional)": "رسالة (اختياري)",
  "Send request": "أرسل الطلب",
  "By sending, you agree to be contacted by Hassan Allam Properties about this project.":
    "بإرسال الطلب، توافق على أن تتواصل معك حسن علام العقارية بخصوص هذا المشروع.",
  "Please enter your first name": "يرجى إدخال اسمك الأول",
  "Please enter your last name": "يرجى إدخال اسم العائلة",
  "Please enter a valid phone number": "يرجى إدخال رقم هاتف صحيح",
  "Please enter a valid email": "يرجى إدخال بريد إلكتروني صحيح",
};
export default ar;
