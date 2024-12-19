export const validateEmail = (email: string): boolean => {
  const isValid = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  if (isValid !== null) return true;
  return false;
};

export const UserRoles = {
  HOMEOWNER: 1,
  CONTRACTOR: 2,
  PROPERTY_MANAGER: 3,
  TENANT: 4,
};

export const USER_TYPES = {
  HOMEOWNER: 1,
  CONTRACTOR: 2,
  PROPERTY_MANAGER: 3,
  TENANT: 4,
};
