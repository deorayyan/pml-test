export const filterAccessibleMenu = (modules, userPermissions) => {
  return modules
    .map((module) => {
      const children = module.children
        ? filterAccessibleMenu(module.children, userPermissions)
        : [];

      const hasPermission =
        !module.permissionCode ||
        userPermissions.includes(module.permissionCode);

      if (!hasPermission && children.length === 0) return null;

      return {
        ...module,
        children,
      };
    })
    .filter(Boolean);
};
