// ─── Eureka Admin Data Layer ──────────────────────────────────
// Data is stored in localStorage. Falls back to hardcoded defaults.
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'eureka_admin_data';

// ── Default Students ──────────────────────────────────────────
export const DEFAULT_STUDENTS = {
  '10th': {
    '2E01': 'Akanksha Chauhan',
    '2E02': 'Akshat Rajput',
    '2E03': 'Ananya Patel',
    '2E04': 'Anshika Diwakar',
    '2E05': 'Gunjan Verma',
    '2E06': 'Harsh',
    '2E07': 'Himanshi Chaurasiya',
    '2E08': 'Kavya Verma',
    '2E09': 'Priya Yadav',
    '2E10': 'Raunak Parihar',
    '2E11': 'Rohini Yadav',
    '2E12': 'Rohit Yadav',
    '2E13': 'Saksham Yadav',
    '2E14': 'Yuvraj',
    '2E15': 'Kanha Ji Awasthi',
    '2E16': 'Ansh Chauhan',
    '2E17': 'Aman Kushwaha',
    '2E18': 'Prajjwal Pathak',
  },
  '9th': {
    '3E01': 'Anuj Tripathi',
    '3E02': 'Arun Rajpoot',
    '3E03': 'Atharv',
    '3E04': 'Gaurav',
    '3E05': 'Harsh Sengar',
    '3E06': 'Hitendra',
    '3E07': 'Naman Patel',
    '3E08': 'Om Parihar',
    '3E09': 'Sameer Mansoori',
    '3E10': 'Subh Nigam',
    '3E11': 'Vaibhav Verma',
  },
};

// ── Default Tests ─────────────────────────────────────────────
export const DEFAULT_TESTS = [
  {
    id: '9th-test-1',
    title: 'Class 9th — Test 1',
    subtitle: 'Sunday Special Assessment',
    date: '27 Sep 2026',
    subject: 'Science (PCB)',
    badge: 'Test 1',
    badgeColor: '#7C3AED',
    badgeBg: '#F5F3FF',
    status: 'live',
    classes: ['9th'],
    results: {
      '9th': {
        '3E01': { marks: 23, maxMarks: 40 },
        '3E02': { marks: 7,  maxMarks: 20 },
        '3E03': { marks: 47, maxMarks: 60 },
        '3E04': { marks: 65, maxMarks: 70 },
        '3E05': { marks: 45, maxMarks: 60 },
        '3E06': { marks: 10, maxMarks: 20 },
        '3E07': { marks: 35, maxMarks: 50 },
        '3E08': { marks: 20, maxMarks: 40 },
        '3E09': { marks: 6,  maxMarks: 20 },
        '3E10': { marks: 50, maxMarks: 60 },
        '3E11': { marks: 16, maxMarks: 30 },
      },
    },
  },
  {
    id: '10th-test-1',
    title: 'Class 10th — Test 1',
    subtitle: 'Sunday Special Assessment',
    date: '27 Sep 2026',
    subject: 'Science (PCB)',
    badge: 'Test 1',
    badgeColor: '#0284C7',
    badgeBg: '#EFF6FF',
    status: 'live',
    classes: ['10th'],
    results: {
      '10th': {
        '2E01': { marks: 15, maxMarks: 39 },
        '2E02': { marks: 11, maxMarks: 39 },
        '2E03': { marks: 30, maxMarks: 39 },
        '2E04': { marks: 25, maxMarks: 39 },
        '2E05': { marks: 20, maxMarks: 39 },
        '2E06': { absent: true },
        '2E07': { marks: 5,  maxMarks: 39 },
        '2E08': { marks: 14, maxMarks: 39 },
        '2E09': { marks: 23, maxMarks: 39 },
        '2E10': { absent: true },
        '2E11': { marks: 10, maxMarks: 39 },
        '2E12': { marks: 30, maxMarks: 39 },
        '2E13': { marks: 7,  maxMarks: 39 },
        '2E14': { absent: true },
        '2E15': { marks: 35, maxMarks: 39 },
      },
    },
  },
  {
    id: '10th-test-2',
    title: 'Class 10th — Test 2',
    subtitle: 'Unit Test',
    date: '5 Oct 2026',
    subject: 'Science (PCB)',
    badge: 'Test 2',
    badgeColor: '#059669',
    badgeBg: '#ECFDF5',
    status: 'live',
    classes: ['10th'],
    results: {
      '10th': {
        '2E01': { marks: 23, maxMarks: 48 },
        '2E02': { marks: 15, maxMarks: 48 },
        '2E03': { marks: 32, maxMarks: 48 },
        '2E04': { marks: 22, maxMarks: 48 },
        '2E05': { marks: 24, maxMarks: 48 },
        '2E06': { absent: true },
        '2E07': { marks: 3,  maxMarks: 48 },
        '2E08': { marks: 20, maxMarks: 48 },
        '2E09': { marks: 28, maxMarks: 48 },
        '2E10': { absent: true },
        '2E11': { marks: 24, maxMarks: 48 },
        '2E12': { marks: 24, maxMarks: 48 },
        '2E13': { marks: 20, maxMarks: 48 },
        '2E14': { absent: true },
        '2E15': { absent: true },
        '2E16': { marks: 13, maxMarks: 48 },
        '2E17': { marks: 10, maxMarks: 48 },
        '2E18': { marks: 2,  maxMarks: 48 },
      },
    },
  },
];

// ── Default Fees ──────────────────────────────────────────────
export const DEFAULT_FEE_MONTHS = [
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December', 'January', 'February', 'March'
];

export const SESSION_MONTH_YEARS = [
  { month: 'April', year: 2026, monthIndex: 3 },
  { month: 'May', year: 2026, monthIndex: 4 },
  { month: 'June', year: 2026, monthIndex: 5 },
  { month: 'July', year: 2026, monthIndex: 6 },
  { month: 'August', year: 2026, monthIndex: 7 },
  { month: 'September', year: 2026, monthIndex: 8 },
  { month: 'October', year: 2026, monthIndex: 9 },
  { month: 'November', year: 2026, monthIndex: 10 },
  { month: 'December', year: 2026, monthIndex: 11 },
  { month: 'January', year: 2027, monthIndex: 0 },
  { month: 'February', year: 2027, monthIndex: 1 },
  { month: 'March', year: 2027, monthIndex: 2 },
  { month: 'April', year: 2027, monthIndex: 3 }, // Session completion boundary
];

export function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export const DEFAULT_FEES = {
  monthlyAmount: 600,
  session: '2026-27',
  records: {
    '2E01': {
      monthlyAmount: 600,
      joiningMonth: 'April',
      dueDay: 5,
      paidMonths: {
        'April':     { date: '05 Apr 2026', mode: 'Cash', amount: 600 },
        'May':       { date: '04 May 2026', mode: 'UPI',  amount: 600 },
        'June':      { date: '06 Jun 2026', mode: 'Cash', amount: 600 },
        'July':      { date: '05 Jul 2026', mode: 'UPI',  amount: 600 },
        'August':    { date: '05 Aug 2026', mode: 'Cash', amount: 600 },
        'September': { date: '07 Sep 2026', mode: 'UPI',  amount: 600 },
        'October':   { date: '05 Oct 2026', mode: 'Cash', amount: 600 },
      }
    },
    '2E02': {
      monthlyAmount: 600,
      joiningMonth: 'April',
      dueDay: 10,
      paidMonths: {
        'April':  { date: '10 Apr 2026', mode: 'Cash', amount: 600 },
        'May':    { date: '11 May 2026', mode: 'Cash', amount: 600 },
        'June':   { date: '09 Jun 2026', mode: 'UPI',  amount: 600 },
        'July':   { date: '10 Jul 2026', mode: 'Cash', amount: 600 },
      }
    },
    '2E03': {
      monthlyAmount: 600,
      joiningMonth: 'April',
      dueDay: 1,
      paidMonths: {
        'April': { date: '01 Apr 2026', mode: 'Cash', amount: 600 },
        'May':   { date: '01 May 2026', mode: 'Cash', amount: 600 },
      }
    },
    '3E01': {
      monthlyAmount: 600,
      joiningMonth: 'April',
      dueDay: 12,
      paidMonths: {
        'April': { date: '12 Apr 2026', mode: 'Cash', amount: 600 },
        'May':   { date: '12 May 2026', mode: 'Cash', amount: 600 },
        'June':  { date: '12 Jun 2026', mode: 'UPI',  amount: 600 },
      }
    },
    '3E03': {
      monthlyAmount: 600,
      joiningMonth: 'April',
      dueDay: 5,
      paidMonths: {
        'April': { date: '05 Apr 2026', mode: 'Cash', amount: 600 },
        'May':   { date: '05 May 2026', mode: 'UPI',  amount: 600 },
      }
    }
  }
};

// Calculate active months, paid months, and exact "Fees Submitted Up To" date
export function getStudentFeeDetails(roll, feesData) {
  const baseMonthly = feesData?.monthlyAmount || 600;
  const record = feesData?.records?.[roll] || {};
  const monthlyAmount = record.monthlyAmount || baseMonthly;
  const joiningMonth = record.joiningMonth || 'April';
  const dueDay = record.dueDay || 5;
  const paidMonths = record.paidMonths || {};

  const startIndex = DEFAULT_FEE_MONTHS.indexOf(joiningMonth);
  const validStartIndex = startIndex !== -1 ? startIndex : 0;
  const activeMonths = DEFAULT_FEE_MONTHS.slice(validStartIndex);

  const paidCount = activeMonths.filter(m => !!paidMonths[m]).length;
  const totalActive = activeMonths.length;
  const dueCount = Math.max(0, totalActive - paidCount);

  const joinInfo = SESSION_MONTH_YEARS[validStartIndex] || SESSION_MONTH_YEARS[0];
  const admissionDate = `${getOrdinal(dueDay)} ${joinInfo.month} ${joinInfo.year}`;

  let paidUpToDate = 'None';
  let paidUpToDateShort = 'None';
  let nextDueDate = admissionDate;
  let isOverdue = false;

  const targetIdx = validStartIndex + paidCount;
  const targetInfo = SESSION_MONTH_YEARS[Math.min(targetIdx, SESSION_MONTH_YEARS.length - 1)];

  if (paidCount === 0) {
    paidUpToDate = 'Not Submitted Yet';
    paidUpToDateShort = 'Not Paid';
    nextDueDate = admissionDate;
    isOverdue = true;
  } else if (paidCount >= totalActive) {
    paidUpToDate = `${getOrdinal(dueDay)} April 2027 (Full Session Completed)`;
    paidUpToDateShort = `${getOrdinal(dueDay)} Apr 2027`;
    nextDueDate = 'Session Completed ✓';
    isOverdue = false;
  } else {
    paidUpToDate = `${getOrdinal(dueDay)} ${targetInfo.month} ${targetInfo.year}`;
    paidUpToDateShort = `${getOrdinal(dueDay)} ${targetInfo.month.slice(0, 3)} ${targetInfo.year}`;
    nextDueDate = `${getOrdinal(dueDay)} ${targetInfo.month} ${targetInfo.year}`;
    const targetDateObj = new Date(targetInfo.year, targetInfo.monthIndex, dueDay);
    const today = new Date();
    isOverdue = today > targetDateObj;
  }

  // Calculate billing cycle validity for each individual month
  const getMonthValidity = (month) => {
    const idx = DEFAULT_FEE_MONTHS.indexOf(month);
    if (idx === -1) return '';
    const start = SESSION_MONTH_YEARS[idx];
    const end = SESSION_MONTH_YEARS[idx + 1];
    return `${getOrdinal(dueDay)} ${start.month.slice(0, 3)} to ${getOrdinal(dueDay)} ${end.month.slice(0, 3)} ${end.year}`;
  };

  return {
    monthlyAmount,
    joiningMonth,
    dueDay,
    admissionDate,
    paidUpToDate,
    paidUpToDateShort,
    nextDueDate,
    isOverdue,
    paidMonths,
    activeMonths,
    totalActive,
    paidCount,
    dueCount,
    paidAmount: paidCount * monthlyAmount,
    dueAmount: dueCount * monthlyAmount,
    totalFee: totalActive * monthlyAmount,
    getMonthValidity,
    isMonthActive: (month) => DEFAULT_FEE_MONTHS.indexOf(month) >= validStartIndex
  };
}

// ── CRUD Utilities ────────────────────────────────────────────

export function getData() {
  let data = null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      data = JSON.parse(stored);
    }
  } catch (e) {}

  if (!data || !data.students || !data.tests) {
    data = {
      students: JSON.parse(JSON.stringify(DEFAULT_STUDENTS)),
      tests:    JSON.parse(JSON.stringify(DEFAULT_TESTS)),
      fees:     JSON.parse(JSON.stringify(DEFAULT_FEES)),
    };
  } else if (!data.fees || !data.fees.records || Object.keys(data.fees.records).length === 0) {
    data.fees = JSON.parse(JSON.stringify(DEFAULT_FEES));
  } else {
    if (data.fees.monthlyAmount === 1500) data.fees.monthlyAmount = 600;
    if (!data.fees.records['3E03']) {
      data.fees.records['3E03'] = JSON.parse(JSON.stringify(DEFAULT_FEES.records['3E03']));
    }
    Object.keys(data.fees.records).forEach(r => {
      if (data.fees.records[r].monthlyAmount === 1500) data.fees.records[r].monthlyAmount = 600;
      if (data.fees.records[r].paidMonths) {
        Object.keys(data.fees.records[r].paidMonths).forEach(m => {
          if (data.fees.records[r].paidMonths[m].amount === 1500) {
            data.fees.records[r].paidMonths[m].amount = 600;
          }
        });
      }
    });
  }
  return data;
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
}

// Auto-generate next roll number for a class
export function getNextRollNumber(cls, students) {
  const prefix = cls === '10th' ? '2E' : '3E';
  const rolls = Object.keys(students[cls] || {});
  const nums = rolls
    .map(r => parseInt(r.replace(prefix, ''), 10))
    .filter(n => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `${prefix}${String(max + 1).padStart(2, '0')}`;
}
