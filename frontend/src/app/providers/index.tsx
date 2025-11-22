import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routes";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/shared/lib/theme/theme";

export function Providers() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
