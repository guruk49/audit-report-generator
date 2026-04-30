import axios from 'axios';

let mockAudits = [
  { id: 1, title: 'Q1 Financial Audit', category: 'Finance', status: 'Completed', score: 92, date: '2026-03-15' },
  { id: 2, title: 'Security Compliance', category: 'Security', status: 'In Progress', score: null, date: '2026-04-10' },
  { id: 3, title: 'HR Policy Review', category: 'HR', status: 'Pending', score: null, date: '2026-04-25' },
  { id: 4, title: 'IT Infrastructure', category: 'IT', status: 'Pending', score: null, date: '2026-05-01' },
  { id: 5, title: 'Q2 Financial Audit', category: 'Finance', status: 'Pending', score: null, date: '2026-06-15' },
];

export const login = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        resolve({ data: { token: 'mock-jwt-token-12345' } });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

export const getAudits = async (page = 0, size = 10, sortBy = 'id', sortDir = 'asc') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a copy to sort
      let sortedAudits = [...mockAudits].sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        
        if (valA === null) valA = '';
        if (valB === null) valB = '';

        if (valA < valB) return sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });

      // Paginate
      const start = page * size;
      const paginatedData = sortedAudits.slice(start, start + size);
      
      resolve({ 
        data: {
          content: paginatedData,
          totalPages: Math.ceil(sortedAudits.length / size),
          totalElements: sortedAudits.length,
          size: size,
          number: page
        } 
      });
    }, 800);
  });
};

export const createAudit = async (auditData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAudit = { ...auditData, id: Date.now() };
      mockAudits.push(newAudit);
      resolve({ data: newAudit });
    }, 800);
  });
};

export const getStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          total: mockAudits.length,
          completed: mockAudits.filter(a => a.status === 'Completed').length,
          avgScore: 92,
          pending: mockAudits.filter(a => a.status === 'Pending').length,
        }
      });
    }, 800);
  });
};
