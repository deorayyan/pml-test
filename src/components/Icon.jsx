import * as Icons from "lucide-react";

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  ...props
}) => {
  // Ambil ikon dari objek Icons
  const LucideIcon = Icons[name];

  // Jika ikon tidak ditemukan, log error dan kembalikan null
  if (!LucideIcon) {
    console.error(`Icon "${name}" tidak ditemukan di lucide-react.`);
    return null;
  }

  // Render ikon dengan properti yang diberikan
  return <LucideIcon size={size} color={color} {...props} />;
};

export default Icon;
