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

// ── CRUD Utilities ────────────────────────────────────────────

export function getData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.students && parsed.tests) return parsed;
    }
  } catch (e) {}
  return {
    students: JSON.parse(JSON.stringify(DEFAULT_STUDENTS)),
    tests:    JSON.parse(JSON.stringify(DEFAULT_TESTS)),
  };
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
