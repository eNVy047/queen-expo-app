/**
 * @type {{ SUPERADMIN: "SUPERADMIN"; ADMIN: "ADMIN"; TEACHER: "TEACHER"; STUDENT: "STUDENT"} as const}
 */
export const UserRolesEnum = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
};
export const AvailableUserRoles = Object.values(UserRolesEnum);


/**
 * @type {{ School: "School"; College: "College"; University: "University"} as const}
 */
export const LmsEnum = {
  School: "School",
  College: "College",
  University: "University",
};

/**
 * @type {{ UNKNOWN:"UNKNOWN"; RAZORPAY: "RAZORPAY"; PAYPAL: "PAYPAL"; } as const}
 */
export const PaymentProviderEnum = {
  UNKNOWN: "UNKNOWN",
  RAZORPAY: "RAZORPAY",
  PAYPAL: "PAYPAL",
};

export const AvailablePaymentProviders = Object.values(PaymentProviderEnum);

/**
 * @type {{ GOOGLE: "GOOGLE"; GITHUB: "GITHUB"; EMAIL_PASSWORD: "EMAIL_PASSWORD"} as const}
 */
export const UserLoginType = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
};

export const AvailableSocialLogins = Object.values(UserLoginType);

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes


export const DB_NAME = "SAAS"

export const paypalBaseUrl = {
  sandbox: "https://api-m.sandbox.paypal.com",
};


// src/constants/apps.js

export const AvailableAppsEnum = {
  DOCS: "DOCS",
  LMS: "LMS",
  ERP: "ERP",
  MEET: "MEET",
};

// 📦 Available applications in your SaaS

export const AvailableApps = [
  {
    key: "DOCS",
    name: "Docs",
    url: "https://docs.xoraxi.com",
    description: "Collaborative document editor",
  },
  {
    key: "LMS",
    name: "LMS",
    url: "https://lms.xoraxi.com",
    description: "Learning management system",
  },
  {
    key: "ERP",
    name: "ERP",
    url: "https://erp.xoraxi.com",
    description: "Enterprise resource management",
  },
  {
    key: "MEET",
    name: "Meet",
    url: "https://meet.xoraxi.com",
    description: "Video conferencing platform",
  },
];



