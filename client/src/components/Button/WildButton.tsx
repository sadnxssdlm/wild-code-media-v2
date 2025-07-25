import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { forwardRef } from "react";

const WildButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, sx, ...props }, ref) => (
    <Button
      ref={ref}
      variant="contained"
      sx={{
        background: "linear-gradient(90deg, #B72193 0%, #5925E9 100%)",
        color: "#fff",
        fontWeight: 700,
        borderRadius: 2,
        px: 3,
        py: 1.2,
        boxShadow: "0 2px 8px 0 rgba(89,37,233,0.10)",
        textTransform: "none",
        fontSize: 16,
        "&:hover": { background: "#5925e9" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  ),
);

export default WildButton;
