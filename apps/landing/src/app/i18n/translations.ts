// Reddoc landing — i18n dictionaries (es / en)
// Operations Console voice: technical, precise, ERP-flavored.

export type Lang = 'es' | 'en';

export interface Module {
  key: string;
  eyebrow: string;
  title: string;
  italic?: string;
  body: string;
  bullets: string[];
  image: string;
}

export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
}

export interface Step {
  index: string;
  title: string;
  body: string;
}

export interface Quote {
  body: string;
  author: string;
  role: string;
}

export interface Dict {
  meta: {
    edition: string;
    location: string;
    issue: string;
  };
  nav: {
    how: string;
    product: string;
    pricing: string;
    contact: string;
    cta: string;
    langLabel: string;
  };
  hero: {
    eyebrow: string;
    headline_1: string;
    headline_italic: string;
    headline_2: string;
    lede: string;
    primary: string;
    secondary: string;
    stat_1_value: string;
    stat_1_label: string;
    stat_2_value: string;
    stat_2_label: string;
    stat_3_value: string;
    stat_3_label: string;
    invoice: {
      title: string;
      number: string;
      fromLabel: string;
      from: string;
      toLabel: string;
      to: string;
      items: { label: string; amount: string }[];
      subtotalLabel: string;
      subtotalAmount: string;
      taxLabel: string;
      taxAmount: string;
      totalLabel: string;
      totalAmount: string;
      stamp: string;
      statusNote: string;
      cufeLabel: string;
      cufeValue: string;
    };
  };
  marquee: string[];
  how: {
    section: string;
    title: string;
    italic: string;
    lede: string;
    steps: Step[];
  };
  modules: {
    section: string;
    title: string;
    italic: string;
    lede: string;
    items: Module[];
    detailsCta: string;
  };
  pricing: {
    section: string;
    title: string;
    italic: string;
    lede: string;
    track_billing: string;
    track_erp: string;
    note: string;
    timestamp: string;
    perMonth: string;
    cta: string;
    plans_billing: Plan[];
    plans_erp: Plan[];
    footnote: string;
  };
  testimonials: {
    section: string;
    title: string;
    italic: string;
    quotes: Quote[];
  };
  contact: {
    section: string;
    title: string;
    italic: string;
    lede: string;
    address_label: string;
    address: string;
    phone_label: string;
    phone: string;
    email_label: string;
    email: string;
    form_name: string;
    form_email: string;
    form_phone: string;
    form_company: string;
    form_message: string;
    form_submit: string;
    form_required: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    italic: string;
    lede: string;
    primary: string;
    secondary: string;
  };
  footer: {
    tagline: string;
    docs: string;
    docs_links: string[];
    company: string;
    company_links: string[];
    legal: string;
    legal_links: string[];
    rights: string;
    masthead: string;
  };
}

const es: Dict = {
  meta: {
    edition: 'v.2026 · ERP',
    location: 'MEDELLÍN · CO',
    issue: 'MOD-06 · CLOUD',
  },
  nav: {
    how: 'Cómo funciona',
    product: 'Módulos',
    pricing: 'Precios',
    contact: 'Contacto',
    cta: 'Hablar con asesor',
    langLabel: 'Idioma',
  },
  hero: {
    eyebrow: 'MOD-06 · ERP COLOMBIA · 2026',
    headline_1: 'El sistema que opera',
    headline_italic: 'tu empresa',
    headline_2: 'todos los días.',
    lede: 'Reddoc unifica compras, ventas, tesorería, inventario, POS, nómina y contabilidad — más facturación electrónica DIAN — en una sola plataforma operativa. Datos en vivo, una sola fuente de verdad, cero hojas de cálculo perdidas.',
    primary: 'Empezar ahora',
    secondary: 'Ver módulos',
    stat_1_value: '6',
    stat_1_label: 'módulos integrados',
    stat_2_value: '24/7',
    stat_2_label: 'cloud · sin instalación',
    stat_3_value: '+1.200',
    stat_3_label: 'empresas operando',
    invoice: {
      title: 'Factura electrónica',
      number: 'FE-2841',
      fromLabel: 'De',
      from: 'Mi Empresa S.A.S',
      toLabel: 'Para',
      to: 'Distribuidora Andina',
      items: [
        { label: 'Asesoría mensual', amount: '890.000' },
        { label: 'Plan de inventario', amount: '620.000' },
        { label: 'Soporte técnico', amount: '410.000' },
      ],
      subtotalLabel: 'Subtotal',
      subtotalAmount: '1.920.000',
      taxLabel: 'IVA 19%',
      taxAmount: '364.800',
      totalLabel: 'Total',
      totalAmount: '2.284.800',
      stamp: 'DIAN',
      statusNote: 'firmada y enviada · hace 14s',
      cufeLabel: 'CUFE',
      cufeValue: '8a2f9c41…e9f2',
    },
  },
  marquee: [
    'DIAN · FACTURACIÓN ELECTRÓNICA',
    'NÓMINA ELECTRÓNICA · PILA',
    'BANCOLOMBIA · DAVIVIENDA · BBVA',
    'NEQUI · DAVIPLATA',
    'NIIF · CONTABILIDAD',
    'POS · MULTIBODEGA',
    'API ABIERTA',
    'CLOUD-NATIVE',
  ],
  how: {
    section: '01 / SETUP',
    title: 'Tres pasos.',
    italic: 'Cero fricción.',
    lede: 'De la apertura de cuenta al primer documento electrónico, todo en una mañana.',
    steps: [
      {
        index: '01',
        title: 'Regístrate',
        body: 'Crea tu cuenta con correo y contraseña. Sin tarjeta de crédito, sin compromisos al inicio.',
      },
      {
        index: '02',
        title: 'Selecciona tu plan',
        body: 'Pagas solo por lo que usas. Empezamos chico y escalamos contigo a medida que crece la operación.',
      },
      {
        index: '03',
        title: 'Empieza a operar',
        body: 'Tu equipo entra a una plataforma operativa: módulos conectados, datos en vivo, decisiones más rápidas.',
      },
    ],
  },
  modules: {
    section: '02 / MÓDULOS',
    title: 'Seis módulos,',
    italic: 'una sola plataforma.',
    lede: 'Cada módulo conecta con los demás: comparten datos en tiempo real, sin sincronizaciones manuales ni hojas de cálculo.',
    items: [
      {
        key: 'compraventa',
        eyebrow: 'MOD/01',
        title: 'Compras y ventas',
        italic: '',
        body: 'Registra compras y ventas en segundos. Automatiza facturas recurrentes, emite documentos electrónicos y obtén reportes financieros en tiempo real.',
        bullets: [
          'Facturación electrónica DIAN',
          'Documentos recurrentes automáticos',
          'Reportes financieros en vivo',
          'Hub de clientes y proveedores',
        ],
        image: '/landing/compraventa.png',
      },
      {
        key: 'tesoreria',
        eyebrow: 'MOD/02',
        title: 'Tesorería y cartera',
        italic: '',
        body: 'Gestiona pagos, cobranzas y vencimientos sin sobresaltos. Estado de cuenta detallado y flujo de caja optimizado para una salud financiera al día.',
        bullets: [
          'Control de vencimientos',
          'Estados de cuenta detallados',
          'Conciliación bancaria asistida',
          'Flujo de caja en tiempo real',
        ],
        image: '/landing/tesoreria.png',
      },
      {
        key: 'inventario',
        eyebrow: 'MOD/03',
        title: 'Inventario',
        italic: '',
        body: 'Rastrea entradas, salidas y costos con precisión. Validación de stock automática y reportes estratégicos para que nunca te falte ni te sobre.',
        bullets: [
          'FIFO / LIFO · multibodega',
          'Control de costos por bodega',
          'Validaciones automáticas',
          'Análisis estratégico de stock',
        ],
        image: '/landing/inventario.png',
      },
      {
        key: 'pos',
        eyebrow: 'MOD/04',
        title: 'POS+',
        italic: '',
        body: 'Procesa ventas en segundos con múltiples métodos de pago, factura electrónica al instante y sincronía total con tu inventario, físico u online.',
        bullets: [
          'Cobro multipago en segundos',
          'Factura electrónica instantánea',
          'Tienda física + online sincronizadas',
          'Reportes de venta en vivo',
        ],
        image: '/landing/pos.png',
      },
      {
        key: 'nomina',
        eyebrow: 'MOD/05',
        title: 'Nómina',
        italic: '',
        body: 'Genera nómina, liquida seguridad social y cumple con la regulación sin dolores de cabeza. Reportes detallados y tiempo recuperado.',
        bullets: [
          'Nómina electrónica DIAN',
          'Liquidación de seguridad social',
          'Reportes en tiempo real',
          'Cumplimiento normativo',
        ],
        image: '/landing/nomina.png',
      },
      {
        key: 'contabilidad',
        eyebrow: 'MOD/06',
        title: 'Contabilidad',
        italic: '',
        body: 'Acceso remoto, interfaz intuitiva y automatización de documentos. Variedad de reportes financieros y cumplimiento tributario simplificado.',
        bullets: [
          'NIIF + cumplimiento tributario',
          'Reportes financieros amplios',
          'Automatización de documentos',
          'Acceso seguro desde cualquier dispositivo',
        ],
        image: '/landing/contabilidad.png',
      },
    ],
    detailsCta: 'Ver detalle del módulo',
  },
  pricing: {
    section: '03 / PRECIOS',
    title: 'Pagas solo',
    italic: 'por lo que usas.',
    lede: 'Sin costos anticipados, sin sorpresas. Tarifa transparente, en pesos, sin contratos a largo plazo.',
    track_billing: 'Facturación',
    track_erp: 'ERP completo',
    note: 'Precios mensuales en COP · IVA no incluido',
    timestamp: 'Tarifa Q2 2026 · COP',
    perMonth: '/ mes',
    cta: 'Seleccionar plan',
    plans_billing: [
      {
        id: 'impulso',
        name: 'Impulso',
        price: '$16.900',
        description: 'Da el primer paso hacia tu éxito.',
        features: [
          { label: 'Documentos ilimitados', included: true },
          { label: '1 Usuario con acceso', included: true },
          { label: 'Ingresos hasta $10.000.000 COP / mes', included: true },
          { label: 'Soporte técnico', included: true },
        ],
      },
      {
        id: 'crecimiento',
        name: 'Crecimiento',
        price: '$49.900',
        description: 'Tu negocio comienza a crecer.',
        highlight: true,
        features: [
          { label: 'Documentos ilimitados', included: true },
          { label: '2 Usuarios con acceso', included: true },
          { label: 'Ingresos hasta $50.000.000 COP / mes', included: true },
          { label: 'Soporte técnico', included: true },
        ],
      },
      {
        id: 'expansion',
        name: 'Expansión',
        price: '$95.900',
        description: 'Desarrolla tu potencial al máximo.',
        features: [
          { label: 'Documentos ilimitados', included: true },
          { label: '3 Usuarios con acceso', included: true },
          { label: 'Ingresos hasta $200.000.000 COP / mes', included: true },
          { label: 'Soporte técnico', included: true },
        ],
      },
      {
        id: 'exito',
        name: 'Éxito',
        price: '$172.900',
        description: 'Lleva tu empresa a nuevas alturas.',
        features: [
          { label: 'Documentos ilimitados', included: true },
          { label: '8 Usuarios con acceso', included: true },
          { label: 'Ingresos hasta $500.000.000 COP / mes', included: true },
          { label: 'Soporte técnico', included: true },
        ],
      },
    ],
    plans_erp: [
      {
        id: 'impulso-erp',
        name: 'Impulso ERP',
        price: '$22.900',
        description: 'Da el primer paso hacia tu éxito.',
        features: [
          { label: 'Documentos ilimitados', included: true },
          { label: '1 Usuario con acceso', included: true },
          { label: 'Ingresos hasta $10.000.000 COP / mes', included: true },
          { label: 'Soporte técnico', included: true },
          { label: 'Facturación y compras', included: true },
          { label: 'Tesorería y cartera', included: true },
          { label: 'Inventario y POS+', included: false },
          { label: 'Contabilidad', included: false },
          { label: 'Nómina', included: false },
          { label: 'API integración', included: false },
          { label: 'Tablero analítica', included: false },
        ],
      },
      {
        id: 'crecimiento-erp',
        name: 'Crecimiento ERP',
        price: '$74.900',
        description: 'Tu negocio comienza a crecer.',
        features: [
          { label: 'Documentos ilimitados', included: true },
          { label: '2 Usuarios con acceso', included: true },
          { label: 'Ingresos hasta $50.000.000 COP / mes', included: true },
          { label: 'Soporte técnico', included: true },
          { label: 'Facturación y compras', included: true },
          { label: 'Tesorería y cartera', included: true },
          { label: 'Inventario y POS+', included: true },
          { label: 'Contabilidad', included: true },
          { label: 'Nómina', included: false },
          { label: 'API integración', included: false },
          { label: 'Tablero analítica', included: false },
        ],
      },
      {
        id: 'expansion-erp',
        name: 'Expansión ERP',
        price: '$149.900',
        description: 'Desarrolla tu potencial al máximo.',
        highlight: true,
        features: [
          { label: 'Documentos ilimitados', included: true },
          { label: '3 Usuarios con acceso', included: true },
          { label: 'Ingresos hasta $200.000.000 COP / mes', included: true },
          { label: 'Soporte técnico', included: true },
          { label: 'Facturación y compras', included: true },
          { label: 'Tesorería y cartera', included: true },
          { label: 'Inventario y POS+', included: true },
          { label: 'Contabilidad', included: true },
          { label: 'Nómina', included: true },
          { label: 'API integración', included: false },
          { label: 'Tablero analítica', included: false },
        ],
      },
      {
        id: 'exito-erp',
        name: 'Éxito ERP',
        price: '$229.900',
        description: 'Lleva tu empresa a nuevas alturas.',
        features: [
          { label: 'Documentos ilimitados', included: true },
          { label: '8 Usuarios con acceso', included: true },
          { label: 'Ingresos hasta $500.000.000 COP / mes', included: true },
          { label: 'Soporte especializado', included: true },
          { label: 'Facturación y compras', included: true },
          { label: 'Tesorería y cartera', included: true },
          { label: 'Inventario y POS+', included: true },
          { label: 'Contabilidad', included: true },
          { label: 'Nómina', included: true },
          { label: 'API integración', included: true },
          { label: 'Tablero analítica', included: true },
        ],
      },
    ],
    footnote: 'Migración asistida sin cargo extra · cancela cuando quieras · datos siempre tuyos.',
  },
  testimonials: {
    section: '04 / CLIENTES',
    title: 'Lo que dicen las',
    italic: 'empresas que ya operan con Reddoc.',
    quotes: [
      {
        body: 'Reddoc nos devolvió las tardes. Antes cerrábamos mes a las nueve de la noche; ahora a las cinco ya está liquidada la nómina y conciliada la cartera.',
        author: 'María Camila Restrepo',
        role: 'CEO · Distribuidora Andina',
      },
      {
        body: 'La interfaz es honesta — no esconde números detrás de menús. Eso nos ayudó a tomar decisiones mejores y más rápidas con los socios.',
        author: 'Andrés Felipe Gómez',
        role: 'Consultor financiero',
      },
      {
        body: 'Implementamos POS, inventario y contabilidad en una semana. El soporte respondió cada duda y el equipo dejó de pelear con tres softwares distintos.',
        author: 'Laura Quintero',
        role: 'Gerente · Tienda Mariposa',
      },
    ],
  },
  contact: {
    section: '05 / CONTACTO',
    title: 'Hablemos de',
    italic: 'tu operación.',
    lede: 'Cuéntanos qué procesos te quitan el sueño. Te respondemos en menos de 24 horas hábiles.',
    address_label: 'Oficina',
    address: 'Cll 34 N.º 66 A 33 · Of. 201 · Conquistadores · Medellín, Colombia',
    phone_label: 'Teléfono',
    phone: '+57 333 259 0639',
    email_label: 'Correo',
    email: 'asesor@reddoc.co',
    form_name: 'Nombre completo',
    form_email: 'Correo electrónico',
    form_phone: 'Teléfono',
    form_company: 'Empresa',
    form_message: 'Cuéntanos sobre tu operación',
    form_submit: 'Enviar mensaje',
    form_required: 'Campo obligatorio',
  },
  cta: {
    eyebrow: 'EMPIEZA HOY · DEMO 30 MIN',
    title: 'Operación más ordenada,',
    italic: 'desde el primer día.',
    lede: 'Treinta minutos para configurarlo. Una vida operativa más tranquila después.',
    primary: 'Empezar ahora',
    secondary: 'Hablar con un asesor',
  },
  footer: {
    tagline:
      'El ERP modular para PYMEs colombianas. Operaciones, facturación electrónica y contabilidad en una sola plataforma.',
    docs: 'Documentación',
    docs_links: ['Centro de ayuda', 'Videos', 'Changelog', 'API', 'Status'],
    company: 'Compañía',
    company_links: ['Nosotros', 'Clientes', 'Blog', 'Trabaja con nosotros'],
    legal: 'Legal',
    legal_links: ['Términos', 'Privacidad', 'Cookies', 'Cumplimiento'],
    rights: '© 2026 Reddoc S.A.S · Todos los derechos reservados.',
    masthead: 'Hecho en Medellín · Colombia · operando en LATAM.',
  },
};

const en: Dict = {
  meta: {
    edition: 'v.2026 · ERP',
    location: 'MEDELLÍN · CO',
    issue: 'MOD-06 · CLOUD',
  },
  nav: {
    how: 'How it works',
    product: 'Modules',
    pricing: 'Pricing',
    contact: 'Contact',
    cta: 'Talk to an advisor',
    langLabel: 'Language',
  },
  hero: {
    eyebrow: 'MOD-06 · ERP COLOMBIA · 2026',
    headline_1: 'The system that runs',
    headline_italic: 'your company',
    headline_2: 'every day.',
    lede: 'Reddoc unifies purchases, sales, treasury, inventory, POS, payroll, and accounting — plus DIAN e-invoicing — in a single operating platform. Live data, one source of truth, zero lost spreadsheets.',
    primary: 'Get started',
    secondary: 'See modules',
    stat_1_value: '6',
    stat_1_label: 'integrated modules',
    stat_2_value: '24/7',
    stat_2_label: 'cloud · no install',
    stat_3_value: '+1,200',
    stat_3_label: 'companies running',
    invoice: {
      title: 'Electronic invoice',
      number: 'FE-2841',
      fromLabel: 'From',
      from: 'My Company LLC',
      toLabel: 'To',
      to: 'Andina Distributors',
      items: [
        { label: 'Monthly retainer', amount: '890,000' },
        { label: 'Inventory plan', amount: '620,000' },
        { label: 'Technical support', amount: '410,000' },
      ],
      subtotalLabel: 'Subtotal',
      subtotalAmount: '1,920,000',
      taxLabel: 'VAT 19%',
      taxAmount: '364,800',
      totalLabel: 'Total',
      totalAmount: '2,284,800',
      stamp: 'DIAN',
      statusNote: 'signed & sent · 14s ago',
      cufeLabel: 'CUFE',
      cufeValue: '8a2f9c41…e9f2',
    },
  },
  marquee: [
    'DIAN · E-INVOICING',
    'E-PAYROLL · PILA',
    'BANCOLOMBIA · DAVIVIENDA · BBVA',
    'NEQUI · DAVIPLATA',
    'IFRS · ACCOUNTING',
    'POS · MULTI-WAREHOUSE',
    'OPEN API',
    'CLOUD-NATIVE',
  ],
  how: {
    section: '01 / SETUP',
    title: 'Three steps.',
    italic: 'Zero friction.',
    lede: 'From account opening to your first electronic document, all in one morning.',
    steps: [
      {
        index: '01',
        title: 'Sign up',
        body: 'Create your account with email and password. No card needed, no upfront commitments.',
      },
      {
        index: '02',
        title: 'Pick your plan',
        body: 'Pay only for what you use. Start small and scale alongside your operation as it grows.',
      },
      {
        index: '03',
        title: 'Start operating',
        body: 'Your team logs into a working platform: connected modules, live data, faster decisions.',
      },
    ],
  },
  modules: {
    section: '02 / MODULES',
    title: 'Six modules,',
    italic: 'one platform.',
    lede: 'Each module connects to the others — sharing live data without manual sync or spreadsheets.',
    items: [
      {
        key: 'compraventa',
        eyebrow: 'MOD/01',
        title: 'Purchases & sales',
        italic: '',
        body: 'Record purchases and sales in seconds. Automate recurring invoices, issue electronic documents, and get real-time financial reports.',
        bullets: [
          'DIAN electronic invoicing',
          'Automated recurring documents',
          'Live financial reports',
          'Customer & supplier hub',
        ],
        image: '/landing/compraventa.png',
      },
      {
        key: 'tesoreria',
        eyebrow: 'MOD/02',
        title: 'Treasury & receivables',
        italic: '',
        body: 'Manage payments, collections, and due dates without friction. Detailed account statements and an optimized cash flow keep your finances current.',
        bullets: [
          'Due-date control',
          'Detailed statements',
          'Assisted bank reconciliation',
          'Real-time cash flow',
        ],
        image: '/landing/tesoreria.png',
      },
      {
        key: 'inventario',
        eyebrow: 'MOD/03',
        title: 'Inventory',
        italic: '',
        body: 'Track inflows, outflows, and costs with precision. Automatic stock validation and strategic reports so you never run short or overstock.',
        bullets: [
          'FIFO / LIFO · multi-warehouse',
          'Cost control by warehouse',
          'Automatic validations',
          'Strategic stock analysis',
        ],
        image: '/landing/inventario.png',
      },
      {
        key: 'pos',
        eyebrow: 'MOD/04',
        title: 'POS+',
        italic: '',
        body: 'Ring up sales in seconds with multiple payment methods, instant electronic invoicing, and full sync with your inventory — physical or online.',
        bullets: [
          'Multi-payment checkout',
          'Instant e-invoice',
          'Physical + online sync',
          'Live sales reports',
        ],
        image: '/landing/pos.png',
      },
      {
        key: 'nomina',
        eyebrow: 'MOD/05',
        title: 'Payroll',
        italic: '',
        body: 'Run payroll, settle social security, and stay compliant without headaches. Detailed reports and time you actually get back.',
        bullets: [
          'DIAN e-payroll',
          'Social-security settlement',
          'Real-time reports',
          'Regulatory compliance',
        ],
        image: '/landing/nomina.png',
      },
      {
        key: 'contabilidad',
        eyebrow: 'MOD/06',
        title: 'Accounting',
        italic: '',
        body: 'Remote access, intuitive interface, and document automation. A wide range of financial reports and simplified tax compliance.',
        bullets: [
          'IFRS + tax compliance',
          'Wide-range financial reports',
          'Document automation',
          'Secure access from any device',
        ],
        image: '/landing/contabilidad.png',
      },
    ],
    detailsCta: 'See module detail',
  },
  pricing: {
    section: '03 / PRICING',
    title: 'Pay only',
    italic: 'for what you use.',
    lede: 'No upfront costs, no surprises. Transparent pricing, in pesos, with no long-term contracts.',
    track_billing: 'Billing',
    track_erp: 'Full ERP',
    note: 'Monthly prices in COP · VAT excluded',
    timestamp: 'Pricing Q2 2026 · COP',
    perMonth: '/ mo',
    cta: 'Select plan',
    plans_billing: [
      {
        id: 'impulso',
        name: 'Impulse',
        price: '$16,900',
        description: 'Take your first step to success.',
        features: [
          { label: 'Unlimited documents', included: true },
          { label: '1 User', included: true },
          { label: 'Revenue up to $10,000,000 COP / mo', included: true },
          { label: 'Standard support', included: true },
        ],
      },
      {
        id: 'crecimiento',
        name: 'Growth',
        price: '$49,900',
        description: 'Your business starts to grow.',
        highlight: true,
        features: [
          { label: 'Unlimited documents', included: true },
          { label: '2 Users', included: true },
          { label: 'Revenue up to $50,000,000 COP / mo', included: true },
          { label: 'Standard support', included: true },
        ],
      },
      {
        id: 'expansion',
        name: 'Expansion',
        price: '$95,900',
        description: 'Develop your potential to the max.',
        features: [
          { label: 'Unlimited documents', included: true },
          { label: '3 Users', included: true },
          { label: 'Revenue up to $200,000,000 COP / mo', included: true },
          { label: 'Standard support', included: true },
        ],
      },
      {
        id: 'exito',
        name: 'Success',
        price: '$172,900',
        description: 'Take your company to new heights.',
        features: [
          { label: 'Unlimited documents', included: true },
          { label: '8 Users', included: true },
          { label: 'Revenue up to $500,000,000 COP / mo', included: true },
          { label: 'Standard support', included: true },
        ],
      },
    ],
    plans_erp: [
      {
        id: 'impulso-erp',
        name: 'Impulse ERP',
        price: '$22,900',
        description: 'Take your first step to success.',
        features: [
          { label: 'Unlimited documents', included: true },
          { label: '1 User', included: true },
          { label: 'Revenue up to $10,000,000 COP / mo', included: true },
          { label: 'Standard support', included: true },
          { label: 'Billing & purchases', included: true },
          { label: 'Treasury & receivables', included: true },
          { label: 'Inventory & POS+', included: false },
          { label: 'Accounting', included: false },
          { label: 'Payroll', included: false },
          { label: 'API integration', included: false },
          { label: 'Analytics dashboard', included: false },
        ],
      },
      {
        id: 'crecimiento-erp',
        name: 'Growth ERP',
        price: '$74,900',
        description: 'Your business starts to grow.',
        features: [
          { label: 'Unlimited documents', included: true },
          { label: '2 Users', included: true },
          { label: 'Revenue up to $50,000,000 COP / mo', included: true },
          { label: 'Standard support', included: true },
          { label: 'Billing & purchases', included: true },
          { label: 'Treasury & receivables', included: true },
          { label: 'Inventory & POS+', included: true },
          { label: 'Accounting', included: true },
          { label: 'Payroll', included: false },
          { label: 'API integration', included: false },
          { label: 'Analytics dashboard', included: false },
        ],
      },
      {
        id: 'expansion-erp',
        name: 'Expansion ERP',
        price: '$149,900',
        description: 'Develop your potential to the max.',
        highlight: true,
        features: [
          { label: 'Unlimited documents', included: true },
          { label: '3 Users', included: true },
          { label: 'Revenue up to $200,000,000 COP / mo', included: true },
          { label: 'Standard support', included: true },
          { label: 'Billing & purchases', included: true },
          { label: 'Treasury & receivables', included: true },
          { label: 'Inventory & POS+', included: true },
          { label: 'Accounting', included: true },
          { label: 'Payroll', included: true },
          { label: 'API integration', included: false },
          { label: 'Analytics dashboard', included: false },
        ],
      },
      {
        id: 'exito-erp',
        name: 'Success ERP',
        price: '$229,900',
        description: 'Take your company to new heights.',
        features: [
          { label: 'Unlimited documents', included: true },
          { label: '8 Users', included: true },
          { label: 'Revenue up to $500,000,000 COP / mo', included: true },
          { label: 'Specialized support', included: true },
          { label: 'Billing & purchases', included: true },
          { label: 'Treasury & receivables', included: true },
          { label: 'Inventory & POS+', included: true },
          { label: 'Accounting', included: true },
          { label: 'Payroll', included: true },
          { label: 'API integration', included: true },
          { label: 'Analytics dashboard', included: true },
        ],
      },
    ],
    footnote: 'Assisted migration at no extra cost · cancel anytime · your data, always yours.',
  },
  testimonials: {
    section: '04 / CUSTOMERS',
    title: 'What companies',
    italic: 'already running on Reddoc say.',
    quotes: [
      {
        body: 'Reddoc gave us back our afternoons. We used to close month-end at nine in the evening; now by five payroll is settled and A/R is reconciled.',
        author: 'María Camila Restrepo',
        role: 'CEO · Distribuidora Andina',
      },
      {
        body: 'The interface is honest — it doesn’t hide numbers behind menus. That helped us make better, faster decisions with our partners.',
        author: 'Andrés Felipe Gómez',
        role: 'Financial consultant',
      },
      {
        body: 'We deployed POS, inventory, and accounting in one week. Support answered every question and the team stopped fighting three different tools.',
        author: 'Laura Quintero',
        role: 'Manager · Tienda Mariposa',
      },
    ],
  },
  contact: {
    section: '05 / CONTACT',
    title: 'Let’s talk about',
    italic: 'your operation.',
    lede: 'Tell us which processes are keeping you up at night. We reply in under 24 business hours.',
    address_label: 'Office',
    address: 'Cll 34 No. 66 A 33 · Of. 201 · Conquistadores · Medellín, Colombia',
    phone_label: 'Phone',
    phone: '+57 333 259 0639',
    email_label: 'Email',
    email: 'asesor@reddoc.co',
    form_name: 'Full name',
    form_email: 'Email',
    form_phone: 'Phone',
    form_company: 'Company',
    form_message: 'Tell us about your operation',
    form_submit: 'Send message',
    form_required: 'Required field',
  },
  cta: {
    eyebrow: 'GET STARTED · 30 MIN DEMO',
    title: 'A more orderly operation,',
    italic: 'from day one.',
    lede: 'Thirty minutes to set it up. A calmer operating life ever after.',
    primary: 'Get started',
    secondary: 'Talk to an advisor',
  },
  footer: {
    tagline:
      'The modular ERP for Colombian SMEs. Operations, e-invoicing, and accounting on one platform.',
    docs: 'Documentation',
    docs_links: ['Help center', 'Videos', 'Changelog', 'API', 'Status'],
    company: 'Company',
    company_links: ['About', 'Customers', 'Blog', 'Careers'],
    legal: 'Legal',
    legal_links: ['Terms', 'Privacy', 'Cookies', 'Compliance'],
    rights: '© 2026 Reddoc S.A.S · All rights reserved.',
    masthead: 'Made in Medellín · Colombia · operating across LATAM.',
  },
};

export const dictionaries: Record<Lang, Dict> = { es, en };
