import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsername } from "../../features/doctors/slices/profileSlice";
import { selectPatientById } from "../../features/patients/slices/patientsApiSlices";
import { CLIENT_ROUTES, RootState } from "../../shared";

//TODO: * HOC (High Order Component Example)
export const withRedirect = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithRedirect = (props: P) => {
    const { pathname, push, query } = useRouter();
    const username = useSelector(selectUsername);
    const { patientId } = query as { patientId: string };

    const patient = useSelector((state: RootState) => selectPatientById(state, patientId));

    useEffect(() => {
      if (
        !username ||
        (patientId &&
          !patient &&
          [CLIENT_ROUTES.PATIENTS, CLIENT_ROUTES.MEDICAL_RECORDS].includes(
            pathname as CLIENT_ROUTES
          ))
      ) {
        push(CLIENT_ROUTES.PROFILE);
      }
    }, [pathname, patient, patientId, push, username]);

    if (!username) return null;

    return <WrappedComponent {...props} />;
  };

  ComponentWithRedirect.displayName = `withRedirect(${displayName})`;

  return ComponentWithRedirect;
};
