export const Avatar = ({ children }) => <div className="w-10 h-10 rounded-full bg-gray-300">{children}</div>;
export const AvatarImage = ({ src }) => <img src={src} className="w-10 h-10 rounded-full" />;
export const AvatarFallback = ({ children }) => <span>{children}</span>;