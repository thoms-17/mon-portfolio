import { colors } from "../constants/theme";

const Button = ({
  children,
  href,
  download,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform duration-400 hover:scale-110 shadow-lg cursor-pointer";
  
  const variants = {
    primary: `bg-[${colors.primary}] text-white hover:bg-[${colors.primaryHover}]`,
    secondary: "bg-white text-[#296297] hover:text-white hover:bg-[#1F4D73]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4",
    lg: "px-10 py-5 text-lg",
    icon: "p-3",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
