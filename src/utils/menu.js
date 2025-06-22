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

export const trimPath = (pathname) => {
  const segments = pathname?.split("/").filter(Boolean); // Split and remove empty parts

  if (
    segments?.length > 0 &&
    (segments[segments.length - 1] === "add" ||
      segments[segments.length - 1] === "detail")
  ) {
    segments?.pop(); // Remove the last segment if it's "add"
  }

  return "/" + segments?.join("/"); // Reconstruct the path
};
