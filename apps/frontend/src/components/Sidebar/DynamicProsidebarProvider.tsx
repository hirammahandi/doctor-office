import dynamic from "next/dynamic";

const ProSidebarProvider = dynamic(
  () =>
    import("react-pro-sidebar").then(
      (component) => component.ProSidebarProvider
    ),
  { loading: () => <p>Loading...</p>, ssr: false }
);

export default ProSidebarProvider;
