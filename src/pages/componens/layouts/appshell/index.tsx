import Navbar from "../navbar";

type AppShellProps = {
    children: React.ReactNode
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    return (
        <div>
            <Navbar />
            <div>{children}</div>
        </div>
    );
};
export default AppShell;