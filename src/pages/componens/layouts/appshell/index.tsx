import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";

const Navbar = dynamic(() => import("../navbar"), { ssr: false });

type AppShellProps = {
    children: React.ReactNode;
};

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400",],
})

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

const AppShell = ({ children }: AppShellProps) => {
    const { pathname } = useRouter();

    // const getNavbarInfo = (path: string) => {
    //     switch (path) {
    //         case "/":
    //             return { title: "Home", link: "/" };
    //         case "/product":
    //             return { title: "Products", link: "/" };
    //         case "/product/[product]":
    //             return { title: "Product Detail", link: "/product" };
    //         case "/profile":
    //             return { title: "My Profile", link: "/" };
    //         default:
    //             return { title: "Page", link: "/" };
    //     }
    // };

    // const navbarInfo = getNavbarInfo(pathname);

    return (
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname) && (
                // <Navbar title={navbarInfo.title} link={navbarInfo.link} />
                <Navbar/>
            )}
            <div>{children}</div>
        </main>
    );
};

export default AppShell;
