/**
 * API エンドポイントの定義をまとめている。
 * Express側のroutesと命名を統一すること。
 *
 */

export const API = {
  users: {
    // GET
    lists: '/users',
    getById: (id: number) => `/users/${id}`,

    // POST
    create: '/users',

    /// PUT/PATCH
    update: (id: number) => `/users/${id}`,

    // DELETE
    delete: (id: number) => `/users/${id}`,
  },
  auth: {
    // POST
    login: '/auth/login',
    logout: '/auth/logout',
    refresh_token: '/auth/refresh',
  },
} as const;
