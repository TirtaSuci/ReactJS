import { useRouter } from "next/router";
import Navbar from "../navbar";

type AppShellProps = {
    children: React.ReactNode
};

const disableNavbar = ["/auth/login", "/auth/register"]

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const {pathname} = useRouter();
    return (
        <div>
            {!disableNavbar.includes(pathname) && <Navbar />}
            <div>{children}</div>
        </div>
    );
};
export default AppShell;